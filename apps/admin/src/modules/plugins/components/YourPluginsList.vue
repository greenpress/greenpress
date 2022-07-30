<template>
  <GpItem v-for="plugin in store.plugins" :key="plugin._id">
    <template v-slot:title>
      <router-link :to="{name: 'editPlugin', params: {pluginId: plugin._id}}">{{ plugin.name }}</router-link>
    </template>
    <div class="metadata">
      <p>{{ plugin.description }}</p>
      <h4>{{ $t('Micro-Frontends') }}:</h4>
      <ul class="micro-frontends">
        <li v-for="mf in plugin.microFrontends" :key="mf.path">
          <router-link :to="'/play/' + mf.route.path">{{mf.name}}</router-link>
        </li>
      </ul>
      <h4>{{ $t('Subscribed Events') }}:</h4>
      <ul class="micro-frontends">
        <li v-for="(eventDetails, index) in plugin.subscribedEvents" :key="index">
          {{ $t('Source') }}: {{ eventDetails.source || '*' }},
          {{ $t('Kind') }}: {{ eventDetails.kind || '*' }},
          {{ $t('Event') }}: {{ eventDetails.eventName || '*' }}
        </li>
      </ul>
    </div>
    <template v-slot:actions>
      <small class="link" @click.prevent="remove(plugin)">
        <el-icon>
          <icon-delete/>
        </el-icon>
        {{ $t('Remove') }}</small>
    </template>
  </GpItem>
</template>
<script lang="ts" setup>
import GpItem from '../../core/components/layout/GpItem.vue';
import {usePluginsList} from '@/modules/plugins/store/plugins-list';
import {useConfirmAction} from '@/modules/core/compositions/confirm-action';

const store = usePluginsList()

const remove = useConfirmAction(store.removePlugin)
</script>
<style scoped lang="scss">
.metadata {
  padding: 0 10px 10px 10px;
}

.micro-frontends {
  list-style: none;
}
.micro-frontends li {
  padding: 10px;
}
</style>
