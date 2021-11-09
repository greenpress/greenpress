import {GreenpressSDKOptions} from './types';
import BaseSDK from './base-gp-sdk';

export interface MenuLink {
  _id?: string;
  kind: 'category' | 'post' | 'http'
  category?: {
    name: string;
    path: string;
  };
  post?: {
    title: string;
    path: string;
    category: {
      path: string;
    }
  }
  value?: {
    text: string;
    url: string;
    newWindow: boolean;
  }
}

export interface IMenu {
  name: string;
  links: MenuLink[];

  [key: string]: any;
}

export default class GpMenus extends BaseSDK {
  private relativePath = '/api/menus';

  constructor(options: GreenpressSDKOptions) {
    super(options)
  }

  getMenu(name: string) {
    return this.callJsonApi<IMenu>(`${this.relativePath}/${encodeURI(name)}`)
  }

  getList() {
    return this.callJsonApi<IMenu[]>(this.relativePath);
  }

  remove(name: string): Promise<any> {
    return this.callApi(`${this.relativePath}/${encodeURI(name)}`, {method: 'delete'});
  }

  update(name: string, changes: Partial<IMenu>): Promise<IMenu> {
    return this.callJsonApi<IMenu>(
      `${this.relativePath}/${encodeURI(name)}`,
      {method: 'put', body: JSON.stringify(changes)}
    )
  }

  create(menu: IMenu): Promise<IMenu> {
    return this.callJsonApi<IMenu>(this.relativePath, {method: 'post', body: JSON.stringify(menu)})
  }
}
