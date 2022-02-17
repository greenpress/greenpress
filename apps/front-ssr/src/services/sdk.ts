import GreenpressSDK from "@greenpress/sdk";
import { LayoutConnectedDataKind } from "@greenpress/sdk/dist/layouts";

const appUrl = import.meta.env.SSR
  ? ((globalThis as any).gatewayUrl as string)
  : location.origin;

const fetchFn = globalThis.fetch;

const sdk = new GreenpressSDK({ appUrl, fetch: fetchFn });

const fallbackLayout = import.meta.env.SSR
  ? (kind: string) => [
      {
        component: "BlockBox",
        predefined: true,
        props: {
          block: {
            content: "Missing layout for pages of kind: " + kind,
          },
        },
      },
    ]
  : () => [];

export const loadLayoutPayload = import.meta.env.SSR
  ? (kind: string, { req }: any) => {
      const extraRequest = { headers: { tenant: req.headers.tenant } };
      return sdk.layouts
        .getLayout(kind as any, extraRequest)
        .then(async (layout) => {
          return {
            layout: layout.content || fallbackLayout(kind),
            connectedData: await Promise.all(
              (layout.connectedData || []).map(async (cd) => {
                switch (cd.kind) {
                  case LayoutConnectedDataKind.POSTS:
                    cd.data = await sdk.posts.getList(
                      {
                        ...cd.context,
                        populate: "category",
                      },
                      extraRequest
                    );
                    break;
                  case LayoutConnectedDataKind.CATEGORY_POSTS:
                    cd.data = await sdk.posts.getList(
                      {
                        ...cd.context,
                        category: req.params.category,
                      },
                      extraRequest
                    );
                    break;
                  case LayoutConnectedDataKind.CATEGORY:
                    cd.data = await sdk.categories.getByPath(
                      req.params.category,
                      extraRequest
                    );
                    break;
                  case LayoutConnectedDataKind.POST:
                    cd.data = await sdk.posts.getByPath(
                      req.params.category,
                      req.params.post,
                      extraRequest
                    );
                    break;
                }
                return cd;
              })
            ),
          };
        })
        .catch(() => {
          return {
            layout: fallbackLayout(kind),
            connectedData: [],
          };
        });
    }
  : () => null;

export default sdk;
