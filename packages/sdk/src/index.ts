import {GreenpressSDKOptions} from './types';
import BaseSDK from './base-gp-sdk';
import GpCategories from './categories';
import GpPosts from './posts';
import GpMenus from './menus';
import GpConfigurations from './configurations';

export default class GreenpressSDK extends BaseSDK {

  categories: GpCategories;
  posts: GpPosts;
  menus: GpMenus;
  configurations: GpConfigurations;

  constructor(private options: GreenpressSDKOptions) {
    super(options);
    this.categories = new GpCategories(this.options);
    this.posts = new GpPosts(this.options);
    this.menus = new GpMenus(this.options);
    this.configurations = new GpConfigurations(this.options);
  }
}
