import {GreenpressSDKOptions} from './types';
import BaseSDK from './base-gp-sdk';

export interface ICategory {
  _id?: string;
  created: Date;
  isPublic: boolean;
  name: string;
  path: string;
  [key: string]: any;
}

export default class GpCategories extends BaseSDK {
  private relativePath = '/api/categories';

  constructor(options: GreenpressSDKOptions) {
    super(options)
  }

  getByPath(path: string) {
    return this.callJsonApi<ICategory>(`${this.relativePath}/${encodeURI(path)}`)
  }

  getList(options: { target: 'front' | 'admin' }) {
    const queryParams = new URLSearchParams(options);
    return this.callJsonApi<ICategory[]>(`${this.relativePath}?${queryParams}`);
  }

  remove(path: string): Promise<Response> {
    return this.callApi(`${this.relativePath}/${encodeURI(path)}`, {method: 'delete'});
  }

  update(path: string, changes: Partial<ICategory>): Promise<ICategory> {
    return this.callJsonApi<ICategory>(
      `${this.relativePath}/${encodeURI(path)}`,
      {method: 'put', body: JSON.stringify(changes)}
    )
  }

  create(category: ICategory): Promise<ICategory> {
    return this.callJsonApi<ICategory>(this.relativePath, {method: 'post', body: JSON.stringify(category)})
  }
}
