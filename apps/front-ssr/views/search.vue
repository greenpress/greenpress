<template>
  <Layout :layout="layout"/>
</template>

<script lang="ts">
import Layout from '../src/components/Layout.vue';

export const path = '/search'

export default {
  components: {Layout},
  setup() {
    return {
      layout: [
        {component: 'SearchForm', predefined: true},
      ]
    }
  }
}
</script>
