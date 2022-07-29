<template>
  <iframe :src="currentMicroFrontend.frameUrl"/>
</template>

<script setup lang="ts">
import {computed, toRef} from 'vue';
import {useRouter} from 'vue-router';

const currentRoute = useRouter().currentRoute;

const currentMicroFrontend = computed(() => {
  return {
    frameUrl: currentRoute.value.meta.microfUrl,
  }
})
</script>

<style scoped>

</style>
