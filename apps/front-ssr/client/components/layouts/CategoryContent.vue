<template>
  <div v-if="category.content" v-html="category.content"/>
</template>
<script lang="ts">
import {ICategory} from '@greenpress/sdk/dist/categories';

export default {
  props: {
    category: Object as () => ICategory,
  }
}
</script>
