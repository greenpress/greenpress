<template>
  <PostForm :post="{}" :submitting="submitting" @submitted="submit"/>
</template>
<script lang="ts" setup>
import {useCreatePost} from './compositions/posts'
import {removeUnsavedChanges} from '../drafts/compositions/unsaved-changes'
import PostForm from './components/PostForm.vue'
import PageTitle from '../core/components/semantics/PageTitle.vue'
import {useRouter, useRoute} from 'vue-router'

const router = useRouter()
const route = useRoute();

if (!route.query.tab) {
  router.push({query: {tab: 'details'}})
}
const {submitting, submit: submitPost} = useCreatePost()

const submit = async (updatedPost) => {
  try {
    const {_id} = await submitPost(updatedPost)
    removeUnsavedChanges('post')
    await router.push({
      name: 'editPost',
      params: {postId: _id}
    })
  } catch (e) {
    //
  }
};
</script>
