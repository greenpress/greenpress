import GreenpressSDK from './index';
import {GreenpressSDKOptions} from './types';
import GpUsers from './users';
import GpManageLayouts from './manage-layouts';

export default class GreenpressAdministratorSDK<T = any> extends GreenpressSDK {
  users: GpUsers<T>;
  manageLayouts: GpManageLayouts;

  constructor(options: GreenpressSDKOptions) {
    super(options);
    this.users = new GpUsers<T>(options);
    this.manageLayouts = new GpManageLayouts(options);
  }
}
