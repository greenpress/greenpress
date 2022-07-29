import { getCrud } from './crud'
import {IPlugin} from '@/services/types/plugin';

const pluginsService = getCrud<IPlugin>('/api/plugins')

export default pluginsService
