import {FetchLike, GreenpressSDKOptions} from './types';

export default class BaseSDK {
  private appUrl: string;
  private fetch: FetchLike;

  constructor(options: GreenpressSDKOptions) {
    this.appUrl = options.appUrl.endsWith('/') ? options.appUrl.slice(0, -1) : options.appUrl;
    this.fetch = options.fetch;
  }

  callApi(relativeUrl: string, data?: RequestInit) {
    return this.fetch(this.appUrl + relativeUrl, data);
  }

  callJsonApi<T>(relativeUrl: string, data?: RequestInit): Promise<T> {
    return this.callApi(relativeUrl, data).then(async res => {
      const body = await res.json()
      if (res.status >= 300) {
        throw new Error(body)
      }
      return body;
    });
  }
}
