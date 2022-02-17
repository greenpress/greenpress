import { GreenpressSDKOptions } from "./types";
import BaseSDK from "./base-gp-sdk";

export enum LayoutKind {
  INDEX = "index",
  SEARCH = "search",
  TAG = "tag",
  CATEGORY = "category",
  POST = "post",
}

export enum LayoutConnectedDataKind {
  MENU = "menu",
  BLOCK = "block",
  HTTP = "http",
  POSTS = "posts",
  CATEGORY_POSTS = "categoryPosts",
  CATEGORY = "category",
  POST = "post",
}

export interface ILayoutContent {
  component: string;
  predefined: boolean;
  classes: string;
  children?: ILayoutContent[];
  props: {
    [key: string]: any;
  };
}

export interface ILayout {
  kind: LayoutKind;
  connectedData: [
    {
      kind: LayoutConnectedDataKind;
      data?: any;
      identifier: string;
      reference: string;
      context?: any;
    }
  ];
  content: ILayoutContent[];

  [key: string]: any;
}

export default class GpLayouts extends BaseSDK {
  private relativePath = "/api/layouts";

  constructor(options: GreenpressSDKOptions) {
    super(options);
  }

  getLayout(kind: LayoutKind, extra?: Partial<RequestInit>) {
    return this.callJsonApi<ILayout>(`${this.relativePath}/${kind}`, extra);
  }

  getList(extra?: Partial<RequestInit>) {
    return this.callJsonApi<ILayout[]>(this.relativePath, extra);
  }

  remove(kind: LayoutKind, extra?: Partial<RequestInit>): Promise<any> {
    return this.callApi(`${this.relativePath}/${kind}`, {
      method: "delete",
      ...(extra || {}),
    });
  }

  update(
    kind: LayoutKind,
    changes: Partial<ILayout>,
    extra?: Partial<RequestInit>
  ): Promise<ILayout> {
    return this.callJsonApi<ILayout>(`${this.relativePath}/${kind}`, {
      method: "put",
      body: JSON.stringify(changes),
      ...(extra || {}),
    });
  }

  create(layout: ILayout, extra?: Partial<RequestInit>): Promise<ILayout> {
    return this.callJsonApi<ILayout>(this.relativePath, {
      method: "post",
      body: JSON.stringify(layout),
      ...(extra || {}),
    });
  }
}
