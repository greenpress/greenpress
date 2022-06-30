<template>
  <div class="block-box" v-html="block.content"/>
</template>
<script lang="ts">
import {IBlock} from '@greenpress/sdk/dist/blocks';

export default {
  props: {
    block: Object as () => IBlock,
  }
}
</script>
