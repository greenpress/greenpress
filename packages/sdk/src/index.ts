import {GreenpressSDKOptions} from './types';
import BaseSDK from './base-gp-sdk';
import GpCategories from './categories';
import GpPosts from './posts';

export default class GreenpressSDK extends BaseSDK {

  categories: GpCategories;
  posts: GpPosts;

  constructor(private options: GreenpressSDKOptions) {
    super(options);
    this.categories = new GpCategories(this.options);
    this.posts = new GpPosts(this.options);
  }
}
