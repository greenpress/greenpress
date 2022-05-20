<template>
  <div class="posts-list">
    <section v-for="post in posts" :key="post._id">
      <h3>
      <router-link
        :to="`/${post.category?.path || post.category}/${post.path}`">
        {{post.title}}
      </router-link>
      </h3>
      <div v-html="post.short"/>
    </section>
  </div>
</template>
<script lang="ts">
import {IPost} from '@greenpress/sdk/dist/posts';

export default {
  props: {
    posts: Array as () => IPost[],
  }
}
</script>
