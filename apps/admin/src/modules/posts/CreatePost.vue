<template>
	<PostForm :post="{}" :submitting="submitting" @submitted="submit"/>
</template>
<script lang="ts">
import {useCreatePost} from './compositions/posts'
import {removeUnsavedChanges} from '../drafts/compositions/unsaved-changes'
import PostForm from './components/PostForm.vue'
import PageTitle from '../core/components/semantics/PageTitle.vue'
import {useRouter, useRoute} from 'vue-router'

export default {
	name: `CreatePost`,
	components: {PageTitle, PostForm},
	setup() {
		const router = useRouter()
		const route = useRoute();

		if (!route.query.tab) {
			router.push({query: {tab: 'details'}})
		}
		const {submitting, submit} = useCreatePost()
		return {
			submitting,
			submit: async (updatedPost) => {
				try {
					const {_id} = await submit(updatedPost)
					removeUnsavedChanges('post')
					router.push({
						name: 'editPost',
						params: {postId: _id}
					})
				} catch (e) {
					//
				}
			}
		}
	}
}
</script>
