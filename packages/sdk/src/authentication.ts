import {GreenpressSDKOptions} from './types';
import BaseSDK from './base-gp-sdk';

export interface IUser {
  _id: string;
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  birthDate: string;
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
  fullName?: string;
  firstName: string;
  lastName: string;
  birthDate: string;
}

export default class GpAuthentication extends BaseSDK {

  #refreshToken: string;
  #accessToken: string;

  get accessToken() {
    return this.#accessToken;
  }

  constructor(options: GreenpressSDKOptions) {
    super(options);
    if (options.getAccessToken) {
      this.#accessToken = options.getAccessToken();
    }
  }

  signin(credentials: ICredentials) {
    return this.callJsonApi<{ payload: BasicPayload }>('/api/signin', {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(credentials)
    })
  }

  oAuthSignin(credentials: ICredentials) {
    return this.callJsonApi<{ payload: BasicPayload & { token: string, refreshToken: string } }>(
      '/api/signin',
      {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({...credentials, authType: 'oauth'})
      })
      .then(data => {
        this.#accessToken = data.payload.token;
        this.#refreshToken = data.payload.refreshToken;
        return data;
      })
  }

  signup(information: ISignupInformation) {
    return this.callJsonApi<{ payload: BasicPayload }>(
      '/api/signup',
      {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(information)
      })
  }

  oAuthSignup(information: ISignupInformation) {
    return this.callJsonApi<{ payload: BasicPayload & { token: string, refreshToken: string } }>(
      '/api/signup',
      {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({...information, authType: 'oauth'})
      })
      .then(data => {
        this.#accessToken = data.payload.token;
        this.#refreshToken = data.payload.refreshToken;
        return data;
      })
  }

  refreshToken(refreshToken: string = this.#refreshToken) {
    if (!refreshToken) {
      throw new Error('existing refresh token not found');
    }
    return this.callJsonApi<{ payload: BasicPayload & { token: string, refreshToken: string } }>(
      '/api/token/refresh',
      {
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + refreshToken
        }
      })
      .then(data => {
        this.#accessToken = data.payload.token;
        this.#refreshToken = data.payload.refreshToken;
        return data;
      })
  }

  logout() {
    return this.callApi('/api/logout', {method: 'post'})
  }

  getLoggedInUser() {
    return this.callJsonApi<IUser>('/api/me')
  }

  updateLoggedInUser(changes: Partial<IUser & { password?: string }>): Promise<IUser> {
    return this.callJsonApi<IUser>('/api/me', {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(changes)
    })
  }
}
