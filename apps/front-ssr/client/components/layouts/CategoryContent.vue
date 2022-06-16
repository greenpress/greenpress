<template>
  <div class="category-content" v-if="category.content" v-html="category.content"/>
</template>
<script lang="ts" setup>
import {ICategory} from '@greenpress/sdk/dist/categories';
defineProps({
  category: Object as () => ICategory,
})
</script>
