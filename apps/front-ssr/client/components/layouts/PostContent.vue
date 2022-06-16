<template>
  <section class="post-content" v-for="(content, index) in post.contents" :key="index" v-html="content"/>
</template>
<script lang="ts" setup>
import {IPost} from '@greenpress/sdk/dist/posts';

defineProps({
  post: Object as () => IPost,
})
</script>
