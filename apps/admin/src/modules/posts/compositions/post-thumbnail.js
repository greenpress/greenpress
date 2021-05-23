import { computed, ref } from 'vue'

export function usePostThumbnail(editedPost, originalPost) {
  const uploadThumbnailOpen = ref(false)

  const thumbnail = computed({
    get: () => editedPost.thumbnail || originalPost.thumbnail,
    set: url => editedPost.thumbnail = url
  })

  return {
    thumbnail,
    uploadThumbnailOpen,
    toggleUpload() {
      uploadThumbnailOpen.value = !uploadThumbnailOpen.value
    },
    uploadComplete(publicUrl) {
      thumbnail.value = publicUrl
      uploadThumbnailOpen.value = false
    }
  }
}
