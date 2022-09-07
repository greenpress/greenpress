import {FetchLike, GreenpressSDKOptions} from './types';

export default class BaseSDK {
  #appUrl: string;
  #fetch: FetchLike;

  constructor(private gpOptions: GreenpressSDKOptions) {
    this.#appUrl = gpOptions.appUrl.endsWith('/') ? gpOptions.appUrl.slice(0, -1) : gpOptions.appUrl;
    this.#fetch = gpOptions.fetch;
  }

  callApi(relativeUrl: string, data?: RequestInit) {
    data = data || {};
    data.headers = data.headers || {};
    Object.assign(data.headers, this.gpOptions.extraHeaders());
    return this.#fetch(this.#appUrl + relativeUrl, data);
  }

  callJsonApi<T>(relativeUrl: string, data?: RequestInit): Promise<T> {
    return this.callApi(relativeUrl, data).then(async res => {
      const body = await res.json()
      if (res.status >= 300) {
        throw body;
      }
      return body;
    });
  }
}
