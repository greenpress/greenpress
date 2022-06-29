import GreenpressSDK from '@greenpress/sdk';
import {LayoutConnectedDataKind} from '@greenpress/sdk/dist/layouts';
import {IAppConfiguration} from '@greenpress/sdk/dist/configurations';

const appUrl = ((globalThis as any).gatewayUrl as string)

// @ts-ignore
export const sdk: GreenpressSDK = import.meta.env.SSR ? new GreenpressSDK({appUrl, fetch: globalThis.fetch}) : null;

const fallbackLayout = (kind: string) => [
  {
    component: 'BlockBox',
    predefined: true,
    props: {
      block: {
        content: 'Missing layout for pages of kind: ' + kind,
      },
    },
  },
]

const loadLayoutPayload = (kind: string, {req}: any) => {
  const extraRequest = {headers: {tenant: req.headers.tenant}};
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
                    populate: 'category',
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
                  cd.context?.path || req.params.category || '-',
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

export const loadAppConfiguration = ({req}: any): Promise<IAppConfiguration> => {
  return sdk.configurations.getAppConfiguration({headers: {tenant: req.headers.tenant}}).then(config => {
    delete config.metadata.websiteUrls;
    return config.metadata;
  })
}

function loadAllData(kind: string, {req}: any) {
  return Promise.all([loadLayoutPayload(kind, {req}), loadAppConfiguration({req})])
}

export const loadAll = import.meta.env.SSR ? loadAllData : () => null;
