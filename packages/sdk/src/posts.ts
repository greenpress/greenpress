import {GreenpressSDKOptions} from './types';
import BaseSDK from './base-gp-sdk';

export interface IPost {
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

  remove(path: string): Promise<IPost> {
    return this.callApi(`${this.relativePath}/${encodeURI(path)}`, {method: 'delete'});
  }

  update(path: string, changes: Partial<IPost>): Promise<IPost> {
    return this.callJsonApi<IPost>(
      `${this.relativePath}/${encodeURI(path)}`,
      {method: 'put', body: JSON.stringify(changes)}
    )
  }

  create(path: string, changes: Partial<IPost>): Promise<IPost> {
    return this.callJsonApi<IPost>(this.relativePath, {method: 'post', body: JSON.stringify(changes)})
  }
}
