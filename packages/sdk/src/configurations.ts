import { GreenpressSDKOptions } from "./types";
import BaseSDK from "./base-gp-sdk";

export interface IAppConfiguration {
  name: string;
  logoUrl: string;
  description: string;
  keywords: string;
  slogan: string;
  language: string;
  direction: string;
  titleSuffix: string;
  themeStylesUrl: string;
  websiteUrls: string[];

  [key: string]: any;
}

export default class GpConfigurations extends BaseSDK {
  private relativePath = "/api/configurations/app-configuration";

  constructor(options: GreenpressSDKOptions) {
    super(options);
  }

  getAppConfiguration(extra?: Partial<RequestInit>) {
    return this.callJsonApi<IAppConfiguration>(this.relativePath, extra);
  }

  update(changes: Partial<IAppConfiguration>, extra?: Partial<RequestInit>): Promise<IAppConfiguration> {
    return this.callJsonApi<IAppConfiguration>(this.relativePath, {
      method: "put",
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(changes),
      ...(extra || {}),
    });
  }
}
