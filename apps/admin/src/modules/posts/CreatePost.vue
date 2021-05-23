<template>
	<div class="create-post-page">
		<PageTitle title="Create Post"/>
		<PostForm :post="{}" :submitting="submitting" @submitted="submit"/>
	</div>
</template>
<script lang="ts">
  import { useCreatePost } from './compositions/posts'
  import { removeUnsavedChanges } from '../drafts/compositions/unsaved-changes'
  import { defineComponent } from 'vue'
  import PostForm from './components/PostForm.vue'
  import PageTitle from '../core/components/semantics/PageTitle.vue'
	import { useRouter } from 'vue-router'

  export default defineComponent({
    name: 'CreatePost',
    components: { PageTitle, PostForm },
    setup() {
			const router = useRouter()
			const { submitting, submit } = useCreatePost()
      return {
        submitting,
        submit: async (updatedPost) => {
          try {
            const { _id } = await submit(updatedPost)
            removeUnsavedChanges('post')
						router.push({
              name: 'editPost',
              params: { postId: _id }
            })
          } catch (e) {
            //
          }
        }
      }
    }
  })
</script>
