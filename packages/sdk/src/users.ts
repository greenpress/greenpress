import {GreenpressSDKOptions} from './types';
import BaseSDK from './base-gp-sdk';
import {IUser} from './authentication';

export interface IManagedUser extends IUser {
  internalMetadata?: any;
}

export interface IManagedUserRequest extends IManagedUser {
  password?: string;
}

export default class GpUsers extends BaseSDK {
  private relativePath = '/api/users';

  constructor(options: GreenpressSDKOptions) {
    super(options)
  }

  getUser(userId: string) {
    return this.callJsonApi<IManagedUser>(`${this.relativePath}/${userId}`)
  }

  getList() {
    return this.callJsonApi<IUser[]>(this.relativePath);
  }

  remove(userId: string): Promise<any> {
    return this.callApi(`${this.relativePath}/${userId}`, {method: 'delete'});
  }

  update(userId: string, changes: Partial<IManagedUserRequest>): Promise<IManagedUser> {
    return this.callJsonApi<IManagedUser>(
      `${this.relativePath}/${userId}`,
      {
        method: 'put',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(changes)
      }
    )
  }

  create(user: IManagedUserRequest): Promise<IManagedUser> {
    return this.callJsonApi<IManagedUser>(this.relativePath, {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(user)
    })
  }
}
