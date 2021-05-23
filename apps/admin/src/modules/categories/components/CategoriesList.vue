<template>
  <div>
    <CreateHomePage v-if="noHomePage" />
    <table>
      <thead>
      <tr>
        <th>{{$t('Name')}}</th>
        <th>{{$t('Public')}}</th>
        <th>{{$t('Path')}}</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="category in categories" :key="category._id">
        <td>
          <router-link :to="{name: 'editCategory', params: {categoryPath: category.path}}">
            {{ category.name }}
          </router-link>
        </td>
        <td><i v-if="category.isPublic" class="el-icon-check" /></td>
        <td>{{ category.path }}</td>
        <td>
          <a v-if="!category.homePage" @click.prevent="askBeforeRemove(category)" class="el-icon-delete" />
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import { computed } from 'vue'
  import { useCategoriesList } from '../compositions/categories'
  import { useConfirmAction } from '../../core/compositions/confirm-action'
  import CreateHomePage from '@/modules/categories/components/CreateHomePage.vue'

  export default {
    name: 'CategoriesList',
    components: { CreateHomePage },
    setup() {
      const { categories, removeCategory } = useCategoriesList()

      return {
        categories,
        askBeforeRemove: useConfirmAction(removeCategory),
        noHomePage: computed(() => !categories.value.some(category => category.path === '-'))
      }
    }
  }
</script>
<style scoped lang="scss">
</style>
