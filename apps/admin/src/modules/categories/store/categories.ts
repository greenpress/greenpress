import { reactive } from 'vue'
import categoriesService from '../../../services/categories-service'

export function enrichHomeCategory(category) {
  return {
    ...category,
    homePage: true,
    name: 'Home Page'
  }
}

export interface ICategoriesStore {
  loaded: boolean,
  loading: boolean,
  categories: any[]
}

export const categoriesStore = reactive<ICategoriesStore>({
  loaded: false,
  loading: false,
  categories: []
})

export async function fetchCategories() {
  if (categoriesStore.loaded || categoriesStore.loading) {
    return
  }
  categoriesStore.loading = true
  categoriesStore.loaded = false
  try {
    let categories = await categoriesService.getAll()
    const homeCategory = categories.find(cat => cat.path === '-')
    categoriesStore.categories = [enrichHomeCategory(homeCategory), ...categories.filter(cat => cat !== homeCategory)]
    categoriesStore.loaded = true
  } catch (e) {
    categoriesStore.loaded = false
  } finally {
    categoriesStore.loading = false
  }
}

export async function removeCategory(path) {
  categoriesStore.categories = categoriesStore.categories.filter(category => category.path !== path)
}

export function addCategory(category) {
  if (category.path === '-') {
    categoriesStore.categories.unshift(enrichHomeCategory(category))
  } else {
    categoriesStore.categories.push(category)
  }
}
