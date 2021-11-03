<template>
	<PostForm v-if="post" :post="post" :submitting="submitting" @submitted="submit"/>
</template>
<script lang="ts">
import {useRoute, useRouter} from 'vue-router'
import {useEditPost} from './compositions/posts'
import PostForm from './components/PostForm.vue'
import PageTitle from '../core/components/semantics/PageTitle.vue'

export default {
	name: 'EditPost',
	components: {PageTitle, PostForm},
	setup() {
		const router = useRouter()
		const route = useRoute();

		if (!route.query.tab) {
			router.push({query: {tab: 'content'}})
		}
		return useEditPost(useRoute().params.postId)
	}
}
</script>
