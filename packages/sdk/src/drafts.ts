import {GreenpressSDKOptions} from './types';
import BaseSDK from './base-gp-sdk';

export interface IDraftMetadata {
  contextDisplayName?: string;
  contextRouteParams?: any;
  contextType: string;
  contextId?: string;
  contextData: any;
}

export interface IDraft extends IDraftMetadata {
  user: string;
  tenant?: string;
}

export default class GpDrafts extends BaseSDK {
  private relativePath = '/api/drafts';

  constructor(options: GreenpressSDKOptions) {
    super(options)
  }

  #getDraftUrl(contextType, contextId): string {
    const url = new URL(this.relativePath, 'https://stub');
    if (contextType) {
      url.searchParams.append('contextType', contextType)
    }
    if (contextId) {
      url.searchParams.append('contextId', contextId)
    }
    return url.href.replace(url.origin, '');
  }

  getList() {
    return this.callJsonApi<IDraft[]>(this.relativePath);
  }

  getDraft(contextType: string, contextId: string) {
    return this.callJsonApi<IDraft>(this.#getDraftUrl(contextType, contextId))
  }

  setDraft(draft: IDraftMetadata): Promise<IDraft> {
    return this.callJsonApi<IDraft>(
      this.relativePath,
      {
        method: 'put',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(draft)
      }
    )
  }

  remove(contextType: string, contextId: string): Promise<any> {
    return this.callApi(this.#getDraftUrl(contextType, contextId), {method: 'delete'});
  }
}
