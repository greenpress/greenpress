import { GreenpressSDKOptions } from "./types";
import BaseSDK from "./base-gp-sdk";
import { ICategory } from "./categories";

export enum PostContentState {
  EDITOR = "editor",
  HTML = "html",
}

export interface IPost {
  _id?: string;
  title: string;
  authors: any[];
  thumbnail: string;
  short: string;
  contents: string[];
  editorContentsStates: PostContentState[];
  path: string;
  tags: string[];
  category: string | ICategory;
  isPublic: boolean;
  isPinned: boolean;

  [key: string]: any;
}

export type GetPostsListOptions = {
  target: "front" | "admin";
  populate?: "string";
  q?: string;
  lean?: "true";
  limit?: string;
  offset?: string;
  category: string;
};

export default class GpPosts extends BaseSDK {
  private relativePath = "/api/posts";

  constructor(options: GreenpressSDKOptions) {
    super(options);
  }

  getByPath(
    categoryPath: string,
    postPath: string,
    extra?: Partial<RequestInit>
  ) {
    return this.callJsonApi<IPost>(
      `${this.relativePath}/${encodeURI(categoryPath)}/${encodeURI(postPath)}`,
      extra
    );
  }

  getList(options: GetPostsListOptions, extra?: Partial<RequestInit>) {
    const queryParams = new URLSearchParams(options);
    return this.callJsonApi<IPost[]>(
      `${this.relativePath}?${queryParams}`,
      extra
    );
  }

  remove(path: string, extra?: Partial<RequestInit>): Promise<Response> {
    return this.callApi(`${this.relativePath}/${encodeURI(path)}`, {
      method: "delete",
      ...(extra || {}),
    });
  }

  update(
    path: string,
    changes: Partial<IPost>,
    extra?: Partial<RequestInit>
  ): Promise<IPost> {
    return this.callJsonApi<IPost>(`${this.relativePath}/${encodeURI(path)}`, {
      method: "put",
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(changes),
      ...(extra || {}),
    });
  }

  create(post: IPost, extra?: Partial<RequestInit>): Promise<IPost> {
    return this.callJsonApi<IPost>(this.relativePath, {
      method: "post",
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(post),
      ...(extra || {}),
    });
  }
}
