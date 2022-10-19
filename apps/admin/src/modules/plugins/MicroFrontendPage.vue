<template>
  <iframe :src="currentMicroFrontend.frameUrl"/>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {useRouter} from 'vue-router';

const currentRoute = useRouter().currentRoute;

const currentMicroFrontend = computed(() => {
  return {
    frameUrl: currentRoute.value.meta.mfeUrl,
  }
})
</script>

<style scoped>
iframe {
  border: none;
}
</style>
