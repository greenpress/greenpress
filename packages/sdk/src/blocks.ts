import {GreenpressSDKOptions} from './types';
import BaseSDK from './base-gp-sdk';

export interface IBlock {
  name: string;
  description?: string;
  content: string;
  contentType?: 'content' | 'html'

  [key: string]: any;
}

export default class GpBlocks extends BaseSDK {
  private relativePath = '/api/blocks';

  constructor(options: GreenpressSDKOptions) {
    super(options)
  }

  getBlock(blockId: string) {
    return this.callJsonApi<IBlock>(`${this.relativePath}/${blockId}`)
  }

  getList() {
    return this.callJsonApi<IBlock[]>(this.relativePath);
  }

  remove(blockId: string): Promise<any> {
    return this.callApi(`${this.relativePath}/${blockId}`, {method: 'delete'});
  }

  update(blockId: string, changes: Partial<IBlock>): Promise<IBlock> {
    return this.callJsonApi<IBlock>(
      `${this.relativePath}/${blockId}`,
      {method: 'put', body: JSON.stringify(changes)}
    )
  }

  create(block: IBlock): Promise<IBlock> {
    return this.callJsonApi<IBlock>(this.relativePath, {method: 'post', body: JSON.stringify(block)})
  }
}
