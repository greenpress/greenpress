<template>
  <div class="category-page" v-if="category">
    <PageTitle :title="title" :item-name="category.name" />
    <CategoryForm
      :is-home-page="isHomePage"
      :category="category"
      :submitting="submitting"
      @submitted="updateCategory"
    />
  </div>
</template>
<script>
  import { computed } from 'vue'
  import CategoryForm from './components/CategoryForm.vue'
  import { useEditCategory } from './compositions/categories'
  import PageTitle from '../core/components/semantics/PageTitle.vue'
	import { useRoute } from 'vue-router'

  export default {
    name: 'EditCategory',
    components: { PageTitle, CategoryForm },
    setup() {
      const { params } = useRoute()
      const { category, updateCategory, submitting } = useEditCategory(params.categoryPath)

      const isHomePage = computed(() => !!category.value.homePage)

      return {
        isHomePage,
        title: computed(() => isHomePage.value ? 'Edit' : 'Edit category'),
        category,
        updateCategory,
        submitting
      }
    }
  }
</script>
