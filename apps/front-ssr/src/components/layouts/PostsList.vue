<template>
  <div class="posts-list">
    <section v-for="post in posts" :key="post._id">
      <h3>{{post.title}}</h3>
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
<style scoped>

</style>
