<template>
  <h1 class="category-title" v-html="category.name"/>
</template>
<script lang="ts" setup>
import {ICategory} from '@greenpress/sdk/dist/categories';

defineProps({
  category: Object as () => ICategory,
})
</script>
