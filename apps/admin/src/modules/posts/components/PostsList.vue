<template>
	<table>
		<thead>
		<tr>
			<th>{{$t('Title')}}</th>
			<th>{{$t('Category')}}</th>
			<th>{{$t('Path')}}</th>
			<th>{{$t('Public')}}</th>
			<th>{{$t('Pinned')}}</th>
			<th></th>
		</tr>
		</thead>
		<tbody>
		<tr v-for="post in posts" :key="post._id">
			<td>
				<router-link :to="{name: 'editPost', params: {postId: post._id}}">
					{{post.title}}
				</router-link>
			</td>
			<td>
				<router-link :to="{name: 'editCategory', params: {categoryPath: post.category.path}}">
					{{post.category.name}}
				</router-link>
			</td>
			<td>{{post.path}}</td>
			<td><i v-if="post.isPublic" class="el-icon-check"/></td>
			<td><i v-if="post.isPinned" class="el-icon-check"/></td>
			<td>
				<a @click.prevent="remove(post._id)" class="el-icon-delete" />
			</td>
		</tr>
		</tbody>
	</table>
</template>
<script>
  import { usePostsList } from '../compositions/posts'
  import { useConfirmAction } from '../../core/compositions/confirm-action'
	import { useI18n } from 'vue-i18n';

  export default {
    setup() {
      const { posts, remove } = usePostsList()
			const {t: $t} = useI18n();
      return { posts, remove: useConfirmAction(remove), $t }
    }
  }
</script>
<style scoped lang="scss">
</style>
