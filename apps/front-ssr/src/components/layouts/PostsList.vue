<template>
  <div class="posts-list">
    <section v-for="post in posts" :key="post._id">
      <h3>
      <router-link
        :to="{name: 'post', params: {category: post.category?.path || post.category, post: post.path}}">
        {{post.title}}
      </router-link>
      </h3>
      <div v-html="post.short"/>
    </section>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    posts: Array
  }
}
</script>