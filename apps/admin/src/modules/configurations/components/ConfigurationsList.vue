<template>
  <div>
    <GpItem v-for="config in list" :key="config.key">
      <template v-slot:title>
        <router-link :to="{name: 'editConfiguration', params: {key: config.key}}">{{ $t(config.key) }}
        </router-link>
      </template>
      <p v-if="config.description">{{ config.description }}</p>
      <small v-if="config.public"><i class="el-icon-check"/> Public</small>
    </GpItem>
  </div>
</template>
<script lang="ts">
import { useConfigurationsList } from '../compositions/configurations'
import GpItem from '../../core/components/layout/GpItem.vue';

export default {
  name: 'ConfigurationsList',
  components: { GpItem },
  setup() {
    return useConfigurationsList()
  }
}
</script>
<style scoped lang="scss">

</style>
