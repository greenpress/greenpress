<template>
  <div class="menu-wrapper">
    <div class="menu">
      <MenuLink v-for="(item, index) of menu.links"
                :link="item" :key="index" class="link"/>
    </div>
  </div>
</template>
<script lang="ts">
import { IMenu } from '@greenpress/sdk/dist/menus';
import MenuLink from './MenuLink.vue';

export default {
  components: { MenuLink },
  props: {
    menu: Object as () => IMenu,
  }
}
</script>
<style scoped>
</style>
