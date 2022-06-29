<template>
  <el-dialog
      v-model="isOpen"
      title="Styles Marketplace"
      width="80%"
      destroy-on-close
      center>
    <div class="styles-list">
      <GpItem v-for="item in styles" :key="item.name" class="style-product" @click="selectStyle(item)">
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
        <div centered>
          <img v-if="item.thumbnails.length" :src="getProductThumbnail(item)">
        </div>
        <small>
          {{ $t('Creator') }}: <a :href="item.creator.website" target="_blank">{{ item.creator.name }}</a>
        </small>
      </GpItem>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue';
import {IStyleProduct, useStylesMarketplace} from '@/modules/layouts/compositions/styles-marketplace';
import GpItem from '@/modules/core/components/layout/GpItem.vue';

const emit = defineEmits(['cancel', 'submit']);

const isOpen = ref(true);

const {styles} = useStylesMarketplace();

function getProductThumbnail(product: IStyleProduct) {
  const path = product.thumbnails[0];
  if (path.startsWith('https://')) {
    return path;
  }
  return `https://marketplace.greenpress.app/styles/${product.name}/${path}`;
}

async function selectStyle(product: IStyleProduct) {
  const res = await fetch(`https://marketplace.greenpress.app/styles/${product.name}/versions.json`);
  const versions = await res.json();

  emit('submit', versions[0]);

}

function cancel() {
  emit('cancel');
}

watch(isOpen, (isOpen) => !isOpen && cancel())
</script>

<style scoped>
.styles-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.styles-list > * {
  width: 33%;
  cursor: pointer;
}

.style-product img {
  max-width: 80%;
  max-height: 100px;
}
</style>
