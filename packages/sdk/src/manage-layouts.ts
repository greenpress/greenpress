import { GreenpressSDKOptions } from "./types";
import BaseSDK from "./base-gp-sdk";
import {ILayout, LayoutKind} from './layouts';

export default class GpManageLayouts extends BaseSDK {
  private relativePath = "/api/layouts";

  constructor(options: GreenpressSDKOptions) {
    super(options);
  }

  getLayout(kind: LayoutKind, extra?: Partial<RequestInit>) {
    return this.callJsonApi<ILayout>(`${this.relativePath}/${kind}`, extra);
  }

  getList(extra?: Partial<RequestInit>) {
    return this.callJsonApi<ILayout[]>(this.relativePath, extra);
  }

  remove(kind: LayoutKind, extra?: Partial<RequestInit>): Promise<any> {
    return this.callApi(`${this.relativePath}/${kind}`, {
      method: "delete",
      ...(extra || {}),
    });
  }

  update(
    kind: LayoutKind,
    changes: Partial<ILayout>,
    extra?: Partial<RequestInit>
  ): Promise<ILayout> {
    return this.callJsonApi<ILayout>(`${this.relativePath}/${kind}`, {
      method: "put",
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(changes),
      ...(extra || {}),
    });
  }

  create(layout: ILayout, extra?: Partial<RequestInit>): Promise<ILayout> {
    return this.callJsonApi<ILayout>(this.relativePath, {
      method: "post",
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(layout),
      ...(extra || {}),
    });
  }
}
