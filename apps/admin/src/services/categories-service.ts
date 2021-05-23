import { getCrud } from './crud'
import { ICategory } from './types/category'

const categoriesService = getCrud<ICategory>('/api/categories')

export default categoriesService
