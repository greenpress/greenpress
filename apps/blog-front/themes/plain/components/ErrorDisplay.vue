<template>
  <ul class="input-errors">
    <li v-for="error in errors" :key="error">{{ error }}</li>
  </ul>
</template>

<script>
export default {
  name: "ErrorDisplay",
  props: {
    errors: Array,
  }
};
</script>