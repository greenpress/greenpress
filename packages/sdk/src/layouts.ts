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
  connectedData: Array<{
    kind: LayoutConnectedDataKind;
    data?: any;
    identifier: string;
    reference: string;
    context?: any;
  }>;
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
}
