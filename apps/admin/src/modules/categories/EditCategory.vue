<template>
  <div class="category-page" v-if="category">
    <CategoryForm
        :is-home-page="isHomePage"
        :category="category"
        :submitting="submitting"
        @submitted="updateCategory"
    />
  </div>
</template>
<script lang="ts" setup>
import {computed} from 'vue'
import CategoryForm from './components/CategoryForm.vue'
import {useEditCategory} from './compositions/categories'
import {useRoute} from 'vue-router'

const {params} = useRoute()
const {category, updateCategory, submitting} = useEditCategory(params.categoryPath as string)

const isHomePage = computed(() => !!category.value.homePage)
</script>
