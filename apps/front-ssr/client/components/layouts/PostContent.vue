<template>
  <section v-for="(content, index) in post.contents" :key="index" v-html="content"/>
</template>
<script lang="ts">
import {IPost} from '@greenpress/sdk/dist/posts';

export default {
  props: {
    post: Object as () => IPost,
  }
}
</script>
