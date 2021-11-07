<template>
  <div :class="isOpen ? 'panel open' : 'panel'" :dir="$t('appDirection')">
    <a @click="togglePanel" class="toggle">
      <i :class="isOpen ? 'el-icon-arrow-right' : 'el-icon-arrow-left'" />
    </a>
    <div class="content">
      <AssetsStorageSelector @change="selectedStorage = $event._id" />
      <template v-if="selectedStorage">
        <BasicFileUploader :storage="selectedStorage" />
        <BasicAssetsList :storage="selectedStorage" />
      </template>
    </div>
  </div>
</template>
<script lang="ts">
  import { ref } from 'vue'
  import AssetsStorageSelector from '../AssetsStorageSelector.vue'
  import BasicFileUploader from '../BasicFileUploader.vue'
  import BasicAssetsList from './BasicAssetsList.vue'

  export default {
    name: 'AssetsDetailsPanel',
    components: { BasicFileUploader, AssetsStorageSelector, BasicAssetsList },
    setup() {
      const isOpen = ref(false)
      const selectedStorage = ref<string>()
      return {
        togglePanel: () => isOpen.value = !isOpen.value,
        selectedStorage,
        isOpen
      }
    }
  }
</script>
<style scoped lang="scss">
  .panel {
    position: fixed;
    z-index: 1;
    top: 130px;
    right: -400px;
    width: 400px;
    height: 70%;
    max-width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    transition: right 0.3s ease-in-out;

    &[dir="rtl"] {
      left: -400px;
      right: auto;
      transition: left 0.3s ease-in-out;

      .toggle {
        border-radius: 0 8px 8px 0;
      }
    }

    &.open {
      right: 0;

      &[dir="rtl"] {
        right: auto;
        left: 0;
      }
    }

    .toggle {
      cursor: pointer;
      margin-top: 200px;
      margin-inline-start: -20px;
      width: 20px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px 0 0 8px;
      text-decoration: none;
      background-color: #ddd;
      transition: background-color 0.2s ease-in-out;
    }
  }

  .toggle:hover {
    background-color: #ccc;
  }

  .content {
    background-color: #eee;
    align-self: stretch;
    flex: 1;
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    width: 100%;
  }

  .content > * {
    margin: 10px;
  }

  .assets-list {
    flex: 1;
  }
</style>
