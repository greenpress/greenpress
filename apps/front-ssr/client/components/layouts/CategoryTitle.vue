<template>
  <h1 v-html="category.title"/>
</template>
<script lang="ts">
import {ICategory} from '@greenpress/sdk/dist/categories';

export default {
  props: {
    category: Object as () => ICategory,
  }
}
</script>
