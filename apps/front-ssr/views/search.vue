<template>
  <router-link to="/">home</router-link>
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
