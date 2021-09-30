<template>
	<PostForm v-if="post" :post="post" :submitting="submitting" @submitted="submit"/>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import {useEditPost} from './compositions/posts'
import PostForm from './components/PostForm.vue'
import PageTitle from '../core/components/semantics/PageTitle.vue'
import {useRoute, useRouter} from 'vue-router'

export default defineComponent({
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
})
</script>
