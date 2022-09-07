import {GreenpressSDKOptions} from './types';
import BaseSDK from './base-gp-sdk';
import {IUser} from './authentication';

export interface IManagedUser<T = any> extends IUser {
  internalMetadata?: T;
}

export interface IManagedUserRequest<T = any> extends IManagedUser<T> {
  password?: string;
}

export default class GpUsers<T = any, E = any> extends BaseSDK {
  private relativePath = '/api/users';

  constructor(private options: GreenpressSDKOptions) {
    super(options)
  }

  getUser<Z = T>(userId: string) {
    return this.callJsonApi<IManagedUser<Z>>(`${this.relativePath}/${userId}`)
  }

  getList(filters?: { email: string, exact?: boolean }) {
    return this.callJsonApi<IUser[]>(
      this.relativePath +
      (filters ?
        `?${Object.entries(filters).map(([key, value]) => `${key}=${value}`).join('&')}` :
        '')
    );
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

  getEncryptedData<Z = E>(userId: string) {
    return this.callJsonApi<IManagedUser<Z>>(`${this.relativePath}/${userId}/encrypted`)
  }

  async setEncryptedData<Z = E>(userId: string, data: Z): Promise<void> {
    const res = await this.callApi(`${this.relativePath}/${userId}/encrypted`, {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(data)
    })
    if (res.status >= 300) {
      throw new Error('could not set encrypted data')
    }
  }
}
