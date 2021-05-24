import { useContext } from '@nuxtjs/composition-api'

export function getPostLinkParams (post) {
  return {
    name: 'category-post',
    params: {
      post: post.path, category: post.category.path || post.category
    }
  }
}

export function usePostNavigation () {
  const { app: { router } } = useContext()
  return (post) => router.push(getPostLinkParams(post))
}
