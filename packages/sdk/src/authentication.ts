import {GreenpressSDKOptions} from './types';
import BaseSDK from './base-gp-sdk';

export interface IUser {
  _id: string;
  email: string;
  name: string;
  roles: string[];

  [key: string]: any;
}

export interface ICredentials {
  email: string;
  password: string;
  roles?: string[];
}

export interface BasicPayload {
  user: IUser;
}

export interface ISignupInformation {
  email: string;
  password: string;
  name: string;
}

export default class GpAuthentication extends BaseSDK {

  constructor(options: GreenpressSDKOptions) {
    super(options)
  }

  signin(credentials: ICredentials) {
    return this.callJsonApi<{ payload: BasicPayload }>('/api/signin', {
      method: 'post',
      body: JSON.stringify(credentials)
    })
  }

  oAuthSignin(credentials: ICredentials) {
    return this.callJsonApi<{ payload: BasicPayload & { token: string, refreshToken: string } }>(
      '/api/signin',
      {
        method: 'post',
        body: JSON.stringify({...credentials, authType: 'oauth'})
      })
  }

  signup(information: ISignupInformation) {
    return this.callJsonApi<{ payload: BasicPayload }>(
      '/api/signup',
      {
        method: 'post',
        body: JSON.stringify(information)
      })
  }

  oAuthSignup(information: ISignupInformation) {
    return this.callJsonApi<{ payload: BasicPayload & { token: string, refreshToken: string } }>(
      '/api/signup',
      {
        method: 'post',
        body: JSON.stringify({...information, authType: 'oauth'})
      })
  }

  refreshToken(refreshToken: string) {
    return this.callJsonApi<{ payload: BasicPayload & { token: string, refreshToken: string } }>(
      '/api/token/refresh',
      {
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + refreshToken
        }
      })
  }

  logout() {
    return this.callApi('/api/logout', {method: 'post'})
  }

  getLoggedInUser() {
    return this.callJsonApi<IUser>('/api/me')
  }

  updateLoggedInUser(changes: Partial<IUser & { password?: string }>): Promise<IUser> {
    return this.callJsonApi<IUser>('/api/me', {method: 'post', body: JSON.stringify(changes)})
  }
}
