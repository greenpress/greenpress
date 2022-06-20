<template>
  <h1 class="post-title" :key="`post-title-${post._id}`" v-html="post.title"/>
</template>
<script lang="ts" setup>
import {IPost} from '@greenpress/sdk/dist/posts';

defineProps({
  post: Object as () => IPost,
})
</script>
