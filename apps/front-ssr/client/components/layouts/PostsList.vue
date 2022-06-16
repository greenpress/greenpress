<template>
  <div class="posts-list">
    <section v-for="post in posts" :key="post._id" class="post-item">
      <h3 class="post-item-title">
      <router-link
        :to="`/${post.category?.path || post.category}/${post.path}`">
        {{post.title}}
      </router-link>
      </h3>
      <div class="post-item-short" v-html="post.short"/>
    </section>
  </div>
</template>
<script lang="ts" setup>
import {IPost} from '@greenpress/sdk/dist/posts';

defineProps( {
  posts: Array as () => IPost[],
})
</script>
