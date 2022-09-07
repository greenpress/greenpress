import {GreenpressSDKOptions} from './types';
import BaseSDK from './base-gp-sdk';
import GpCategories from './categories';
import GpPosts from './posts';
import GpMenus from './menus';
import GpConfigurations from './configurations';
import GpAuthentication from './authentication';
import GpBlocks from './blocks';
import GpLayouts from './layouts';
import authentication from './authentication';

export default class GreenpressSDK extends BaseSDK {

  categories: GpCategories;
  posts: GpPosts;
  menus: GpMenus;
  blocks: GpBlocks;
  layouts: GpLayouts;
  configurations: GpConfigurations;
  authentication: GpAuthentication;

  constructor(private options: GreenpressSDKOptions) {
    super(options);
    this.categories = new GpCategories(this.options);
    this.posts = new GpPosts(this.options);
    this.menus = new GpMenus(this.options);
    this.blocks = new GpBlocks(this.options);
    this.layouts = new GpLayouts(this.options);
    this.configurations = new GpConfigurations(this.options);
    this.authentication = new GpAuthentication(this.options);

    if (!options.getAccessToken) {
      options.getAccessToken = () => this.authentication.accessToken;
    }
    if (!options.extraHeaders) {
      options.extraHeaders = () => {
        const token = options.getAccessToken();
        if (token) {
          return {authorization: 'Bearer ' + token}
        }
        return {}
      }
    }
  }

}
