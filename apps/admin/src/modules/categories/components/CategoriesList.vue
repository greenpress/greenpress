<template>
  <div>
    <CreateHomePage v-if="noHomePage" />
	  <GpItem v-for="category in categories" :key="category._id">
		  <template v-slot:title>
				<router-link :to="{name: 'editCategory', params: {categoryPath: category.path}}">
					{{ category.name }}
				</router-link>
		  </template>
		  <div class="small metadata">
			  <span v-if="category.isPublic"><i class="el-icon-check"/> {{$t('Public')}}</span>
			  <span v-if="!category.homePage">Path: <strong>{{ category.path }}</strong></span>
		  </div>
		  <template v-slot:actions>
			  <a v-if="!category.homePage" @click.prevent="askBeforeRemove(category)"><i class="el-icon-delete"/> {{$t('Remove')}}</a>
		  	<router-link v-if="!category.homePage" :to="{name: 'posts', query: {category: category.path}}"><i class="el-icon-document"/> {{ $t('Posts') }}</router-link>
	  </template>
	  </GpItem>
  </div>
</template>
<script>
  import { computed } from 'vue'
  import { useCategoriesList } from '../compositions/categories'
  import { useConfirmAction } from '../../core/compositions/confirm-action'
  import CreateHomePage from './CreateHomePage.vue'
  import GpItem from '../../core/components/layout/GpItem.vue';

  export default {
    name: 'CategoriesList',
    components: { CreateHomePage, GpItem },
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
.metadata {
  padding-bottom: 5px;

  > * {
	padding-inline-end: 8px;
	margin-inline-end: 8px;
	border-inline-end: 1px solid #eee;

	&:last-child {
	  border: none
	}
  }
}
</style>
