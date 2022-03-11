<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>{{$t('Name')}}</th>
          <th>{{$t('Kind')}}</th>
          <th/>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item._id">
          <td>
            <router-link :to="{ name: 'editStorage', params: { storageId: item._id } }">
							{{ item.name }}
						</router-link>
          </td>
          <td>{{ item.kind }}</td>
          <td>
            <a @click.prevent="remove(item)"><icon-delete/></a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts" setup>
  import { useStorageList } from '../compositions/storages'
  import { useConfirmAction } from '../../core/compositions/confirm-action'

  const list = useStorageList();

  const items = list.items;
  const remove = useConfirmAction(list.remove)
</script>
<style scoped lang="scss"></style>
