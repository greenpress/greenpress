<template>
  <form @submit.prevent="search">
    <label>
      <span>Search posts</span>
      <input :value="route.query.q" ref="input" placeholder="Search posts..">
    </label>
  </form>
</template>
<script lang="ts">
import {ref} from 'vue';
import {useRouter, useRoute} from 'vue-router';

export default {
  setup() {
    const router = useRouter()
    const route = useRoute();
    const input = ref<HTMLInputElement>()

    return {
      route,
      input,
      search() {
        router.push({
          path: '/search',
          query: {
            q: input.value?.value.trim()
          }
        })
      }
    }
  }
}
</script>
<style scoped>
form {
  display: flex;
}

span {
  display: none;
}

label, input {
  width: 250px;
}

input {
  outline: #ddd;
  padding: 10px;
  border-radius: 3px;
  border: 1px solid #ccc;
  font-size: 16px;
  color: #a8a8a8;
  transition: color 0.2s ease-in-out;
}

input:focus {
  color: #000;
}

@media all and (max-width: 720px) {
  form {
    padding: 0 10px;
    width: 100%;
  }

  input {
    font-size: 12px;
    width: 100%;
  }
}
</style>
