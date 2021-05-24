<template>
  <ul>
    <li v-for="error in errors" :key="error">{{ error }}</li>
  </ul>
</template>

<script>
export default {
  name: "ErrorDisplay",
  props: {
    errors: Array,
  },
};
</script>

<style scoped>
li {
  flex: 1;
  margin: 0;
  padding: 0;
  display: block;
  color: red;
  font-size: 10px;
}

ul {
  padding: 0;
  margin: auto auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
</style>
