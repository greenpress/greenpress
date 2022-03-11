<template>
	<PostForm v-if="post" :post="post" :submitting="submitting" @submitted="submit"/>
</template>
<script lang="ts" setup>
import {useRoute, useRouter} from 'vue-router'
import {useEditPost} from './compositions/posts'
import PostForm from './components/PostForm.vue'

const router = useRouter()
const route = useRoute();

if (!route.query.tab) {
	router.push({query: {tab: 'content'}})
}

const { post, submitting, submit } = useEditPost(route.params.postId)
</script>
