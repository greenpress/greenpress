<template>
	<GpItem v-for="post in posts" :key="post._id">
		<template v-slot:title>
			<router-link :to="{name: 'editPost', params: {postId: post._id}}">
				{{ post.title }}
			</router-link>
		</template>
		<div class="small metadata">
			<span v-if="post.isPublic"><el-icon><icon-check/></el-icon> {{ $t('Public') }}</span>
			<span v-if="post.isPinned"><el-icon><icon-check/></el-icon> {{ $t('Pinned') }}</span>
			<span>Path: <strong>{{ getPath(post) }}</strong></span>
			<router-link :to="{name: 'editCategory', params: {categoryPath: post.category.path}}">
				<el-icon><icon-folder-opened/></el-icon>
				{{ post.category.name }}
			</router-link>
		</div>
		<template v-slot:actions>
			<a @click.prevent="remove(post._id)"><el-icon><icon-delete/></el-icon> {{ $t('Remove') }}</a>
		</template>
	</GpItem>
</template>
<script lang="ts">
import { usePostsList } from '../compositions/posts'
import { useConfirmAction } from '../../core/compositions/confirm-action'
import { useI18n } from 'vue-i18n';
import GpItem from '../../core/components/layout/GpItem.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

export default {
	components: { GpItem },
	setup() {
		const route = useRoute();
		const queryParams = computed(() => route.name === 'posts' ? (route.query || {}) : null);
		const { posts, remove } = usePostsList(queryParams)
		const { t } = useI18n();

		return {
			posts,
			remove: useConfirmAction(remove),
			t,
			getPath(post) {
				return '/' + post.category.path + '/' + post.path;
			}
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
