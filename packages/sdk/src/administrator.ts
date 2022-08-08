import GreenpressSDK from './index';
import {GreenpressSDKOptions} from './types';
import GpUsers from './users';
import GpManageLayouts from './manage-layouts';

export default class GreenpressAdministratorSDK extends GreenpressSDK {
  users: GpUsers;
  manageLayouts: GpManageLayouts;

  constructor(options: GreenpressSDKOptions) {
    super(options);
    this.users = new GpUsers(options);
    this.manageLayouts = new GpManageLayouts(options);
  }
}
