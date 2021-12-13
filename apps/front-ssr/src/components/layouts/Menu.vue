<template>
  <div v-html="menu.links"/>
</template>
<script lang="ts">
import {IMenu} from '@greenpress/sdk/dist/menus';

export default {
  props: {
    menu: Object as () => IMenu,
  }
}
</script>
