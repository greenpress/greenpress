import {ref} from 'vue';
import postsService from '@/services/posts-service';
import {defineStore} from 'pinia';

export const usePostsListStore = defineStore('posts-list', function usePostsList() {
  const posts = ref<any[]>([])
  const loading = ref(true);

  return {
    loading,
    posts,
    async fetchPosts(filters: any = {}) {
      loading.value = true;
      const qs: any = {populate: ['category']};
      if (filters?.category) {
        qs.category = filters.category;
      }
      posts.value = await postsService.getAll(qs);
      loading.value = false;
      return posts.value;
    },
    remove: (postId) => postsService.remove(postId)
      .then(() => posts.value = posts.value.filter(({_id}) => _id !== postId))
  }
})
