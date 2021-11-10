export type FetchLike = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

export interface GreenpressSDKOptions {
  appUrl: string;
  fetch: FetchLike;
}
