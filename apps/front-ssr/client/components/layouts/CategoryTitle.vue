<template>
  <h1 v-html="category.name"/>
</template>
<script lang="ts">
import {ICategory} from '@greenpress/sdk/dist/categories';

export default {
  props: {
    category: Object as () => ICategory,
  }
}
</script>
