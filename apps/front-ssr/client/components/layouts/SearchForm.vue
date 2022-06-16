<template>
  <form @submit.prevent="search" class="search-form">
    <label>
      <span>{{label || 'Search Posts'}}</span>
      <input :value="route.query.q" ref="input" :placeholder="placeholder || 'Search posts..'">
    </label>
  </form>
</template>
<script lang="ts" setup>
import {ref} from 'vue';
import {useRouter, useRoute} from 'vue-router';

defineProps({
  label: String,
  placeholder: String
})

const router = useRouter()
const route = useRoute();
const input = ref<HTMLInputElement>()

function search() {
  router.push({
    name: 'search',
    query: {
      q: input.value?.value.trim()
    }
  })
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
