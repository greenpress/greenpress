import {GreenpressSDKOptions} from './types';
import BaseSDK from './base-gp-sdk';
import {ICategory} from './categories';

export enum PostContentState {
  EDITOR = 'editor',
  HTML = 'html'
}

export interface IPost {
  _id?: string;
  title: string,
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
  target: 'front' | 'admin';
  populate?: 'string';
  q?: string;
  lean?: 'true',
  limit?: string,
  offset?: string,
}

export default class GpPosts extends BaseSDK {
  private relativePath = '/api/posts';

  constructor(options: GreenpressSDKOptions) {
    super(options)
  }

  getByPath(categoryPath: string, postPath: string) {
    return this.callJsonApi<IPost>(`${this.relativePath}/${encodeURI(categoryPath)}/${encodeURI(postPath)}`)
  }

  getList(options: GetPostsListOptions) {
    const queryParams = new URLSearchParams(options);
    return this.callJsonApi<IPost[]>(`${this.relativePath}?${queryParams}`);
  }

  remove(path: string): Promise<Response> {
    return this.callApi(`${this.relativePath}/${encodeURI(path)}`, {method: 'delete'});
  }

  update(path: string, changes: Partial<IPost>): Promise<IPost> {
    return this.callJsonApi<IPost>(
      `${this.relativePath}/${encodeURI(path)}`,
      {method: 'put', body: JSON.stringify(changes)}
    )
  }

  create(post: IPost): Promise<IPost> {
    return this.callJsonApi<IPost>(this.relativePath, {method: 'post', body: JSON.stringify(post)})
  }
}
