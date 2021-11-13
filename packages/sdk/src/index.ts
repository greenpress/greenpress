import {GreenpressSDKOptions} from './types';
import BaseSDK from './base-gp-sdk';
import GpCategories from './categories';
import GpPosts from './posts';
import GpMenus from './menus';
import GpConfigurations from './configurations';
import GpAuthentication from './authentication';
import GpBlocks from './blocks';

export default class GreenpressSDK extends BaseSDK {

  categories: GpCategories;
  posts: GpPosts;
  menus: GpMenus;
  blocks: GpBlocks;
  configurations: GpConfigurations;
  authentication: GpAuthentication;

  constructor(private options: GreenpressSDKOptions) {
    super(options);
    this.categories = new GpCategories(this.options);
    this.posts = new GpPosts(this.options);
    this.menus = new GpMenus(this.options);
    this.blocks = new GpBlocks(this.options);
    this.configurations = new GpConfigurations(this.options);
    this.authentication = new GpAuthentication(this.options);
  }
}
