export type FetchLike = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

export interface GreenpressSDKOptions {
  appUrl: string;
  fetch: FetchLike;
  getAccessToken?: () => undefined | string;
  refreshToken?: () => Promise<any>;
  extraHeaders?: () => { [key: string]: string };
}
