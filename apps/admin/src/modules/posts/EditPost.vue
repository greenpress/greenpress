<template>
	<div class="edit-post-page" v-if="post">
		<PageTitle title="Edit Post" :item-name="post.title"/>
		<PostForm :post="post" :submitting="submitting" @submitted="submit"/>
	</div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { useEditPost } from './compositions/posts'
  import PostForm from './components/PostForm.vue'
  import PageTitle from '../core/components/semantics/PageTitle.vue'
	import { useRoute } from 'vue-router'

  export default defineComponent({
    name: 'EditPost',
    components: { PageTitle, PostForm },
    setup() {
      return useEditPost(useRoute().params.postId)
    }
  })
</script>
