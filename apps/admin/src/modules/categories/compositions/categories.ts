import { computed, reactive, onMounted } from 'vue'
import {
  addCategory,
  categoriesStore, enrichHomeCategory,
  fetchCategories,
  removeCategory
} from '../store/categories'
import { useSubmitting } from '../../core/compositions/submitting'
import categoriesService from '../../../services/categories-service'
import { useDispatcher } from '../../core/compositions/dispatcher'
import { removeUnsavedChanges } from '../../drafts/compositions/unsaved-changes'
import { ICategory } from '../../../services/types/category'

function useCategories() {
  return computed(() => categoriesStore.categories)
}

export function createCategory(category) {
  return categoriesService.create(category).then((category) => {
    addCategory(category)
    return category
  })
}

export function useEditCategory(categoryPath: string) {
  const { result: category } = useDispatcher<ICategory>(() =>
    categoriesService.getOne(categoryPath).then(category => categoryPath === '-' ? enrichHomeCategory(category) : category)
  )

  const { submit, submitting } = useSubmitting(
    (payload) => {
      return categoriesService.update(categoryPath, payload)
        .then((newCategory) => {
          removeUnsavedChanges('category', category.value._id)
          category.value = newCategory;
        })
    },
    {
      success: 'Category updated successfully',
      error: 'Failed to update category'
    }
  )

  return {
    category,
    updateCategory: submit,
    submitting
  }
}

export function useCategoriesList() {
  fetchCategories()
  const { submit } = useSubmitting(
    ({ path }) =>
      categoriesService.remove(encodeURIComponent(path)).then(() => removeCategory(path)),
    {
      success: 'Category removed successfully',
      error: 'Failed to remove category'
    }
  )

  return {
    categories: useCategories(),
    removeCategory: submit
  }
}

export function useCategoryForm(props) {
  const editedCategory = reactive<{ [key: string]: any | null }>({
    name: null,
    path: null,
    thumbnail: null,
    content: null,
    isPublic: null
  })
  onMounted(() => {
    if (!props.category._id) {
      editedCategory.isPublic = true
    }
  })
  const name = computed(() => {
    return editedCategory.name === null
      ? props.category.name
      : editedCategory.name
  })
  const path = computed(() => {
    return editedCategory.path === null
      ? props.category.path
      : editedCategory.path
  })
  const thumbnail = computed(() => {
    return editedCategory.thumbnail === null
      ? props.category.thumbnail
      : editedCategory.thumbnail
  })
  const content = computed(() => {
    return editedCategory.content === null
      ? props.category.content
      : editedCategory.content
  })
  const isPublic = computed(() => {
    return editedCategory.isPublic === null
      ? props.category.isPublic
      : editedCategory.isPublic
  })

  return {
    editedCategory,
    name,
    path,
    thumbnail,
    content,
    isPublic
  }
}

export function useCategorySelector() {
  fetchCategories()

  return {
    mounted: computed(() => categoriesStore.loaded),
    categories: useCategories()
  }
}
