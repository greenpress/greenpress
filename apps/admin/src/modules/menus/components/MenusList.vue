<template>
  <table>
    <thead>
    <tr>
      <th>{{$t('Name')}}</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="menu in menus" :key="menu">
      <td>
        <router-link :to="{name: 'editMenu', params: {menuName: menu}}">{{menu}}</router-link>
      </td>
      <td>
        <a @click.prevent="remove(menu)" class="el-icon-delete"/>
      </td>
    </tr>
    </tbody>
  </table>
</template>
<script>
  import { useMenusList } from '../compositions/menus-list'

  export default {
    name: 'MenusList',
    setup() {
      return useMenusList()
    }
  }
</script>
<style scoped lang="scss">

</style>
