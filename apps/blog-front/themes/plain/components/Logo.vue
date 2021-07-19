<template>
<nuxt-link to="/" class="logo-link"><img class="logo" :src="logoUrl || '/logo.png'" :alt="siteName" /></nuxt-link>
</template>

<script>
export default {
  name: "Logo",
  props: {
    logoUrl: String,
    siteName: String,
  },
};
</script>