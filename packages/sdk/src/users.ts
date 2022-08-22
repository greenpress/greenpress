import {GreenpressSDKOptions} from './types';
import BaseSDK from './base-gp-sdk';
import {IUser} from './authentication';

export interface IManagedUser<T = any> extends IUser {
  internalMetadata?: T;
}

export interface IManagedUserRequest<T = any> extends IManagedUser<T> {
  password?: string;
}

export default class GpUsers<T = any> extends BaseSDK {
  private relativePath = '/api/users';

  constructor(private options: GreenpressSDKOptions) {
    super(options)
  }

  getUser<Z = T>(userId: string) {
    return this.callJsonApi<IManagedUser<Z>>(`${this.relativePath}/${userId}`)
  }

  getList() {
    return this.callJsonApi<IUser[]>(this.relativePath);
  }

  remove(userId: string): Promise<any> {
    return this.callApi(`${this.relativePath}/${userId}`, {method: 'delete'});
  }

  update<Z = T>(userId: string, changes: Partial<IManagedUserRequest<Z>>): Promise<IManagedUser> {
    return this.callJsonApi<IManagedUser>(
      `${this.relativePath}/${userId}`,
      {
        method: 'put',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(changes)
      }
    )
  }

  create<Z = T>(user: Omit<IManagedUserRequest<Z>, '_id' | 'fullName' | 'birthDate'>): Promise<IManagedUser<Z>> {
    return this.callJsonApi<IManagedUser>(this.relativePath, {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(user)
    })
  }
}
