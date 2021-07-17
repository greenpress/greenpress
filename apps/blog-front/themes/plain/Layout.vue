<template>
<div class="app-layout">
  <Header />
  <nuxt />
  <Footer />
</div>
</template>

<script>
import Footer from "./components/Footer";
import Header from "./components/Header";

export default {
  components: {
    Header,
    Footer,
  }
};
</script>