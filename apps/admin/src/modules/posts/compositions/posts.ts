import {reactive, ref} from 'vue'
import debounce from 'lodash.debounce'
import {useSubmitting} from '../../core/compositions/submitting'
import {removeUnsavedChanges} from '../../drafts/compositions/unsaved-changes'
import postsService from '../../../services/posts-service';

export function useCreatePost() {
  return useSubmitting((post) => {
    return postsService.create(post)
  }, {success: 'Post created successfully', error: 'Failed to create post'})
}

function fetchPost(postId: string) {
  return postsService.getOne(postId)
}

export function useEditPost(postId) {
  const post = ref<any>(null)
  fetchPost(postId).then(data => {
    post.value = data
  })

  return {
    ...useSubmitting((updatedPost) => {
      return postsService.update(post.value._id, updatedPost)
        .then(post => {
          post.value = post
          removeUnsavedChanges('post', post._id)
        })
    }, {success: 'Post updated successfully', error: 'Failed to update post'}),
    post
  }
}

export function useNewPost() {
  return {
    post: reactive({
      title: null,
      authors: null,
      thumbnail: null,
      short: null,
      contents: null,
      editorContentsStates: null,
      path: null,
      tags: null,
      category: '-',
      isPublic: null,
      isPinned: null
    })
  }
}


export function usePostsSearch() {
  const searchPostsList = ref<any[]>([])
  const selectedPost = reactive<any>({
    title: '',
    value: ''
  })

  function search() {
    return postsService.getAll({populate: ['category'], lean: true, q: selectedPost.title})
      .then(list => searchPostsList.value = list)
  }

  return {
    search: debounce(search, 500),
    selectedPost,
    searchPostsList
  }
}
