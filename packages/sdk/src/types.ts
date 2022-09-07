export type FetchLike = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

export interface GreenpressSDKOptions {
  appUrl: string;
  fetch: FetchLike;
  accessToken?: string;
  refreshToken?: string;
  getAccessToken?: () => undefined | string;
  extraHeaders?: () => { [key: string]: string };
}
