import { getCrud } from './crud'
import { IBlock } from './types/block';

const blocksService = getCrud<IBlock>('/api/blocks')

export default blocksService
