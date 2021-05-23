import { computed, ref } from 'vue'

export function usePostTags(editedPost, originalPost) {
  const currentTagText = ref('')

  const tags = computed(() => {
    const editedTags = editedPost.tags
    const tags = originalPost.tags
    return editedTags || tags || []
  })

  function addTag(event) {
    event.preventDefault()
    if (tags.value.includes(event.target.value)) {
      return
    }
    editedPost.tags = [...tags.value, event.target.value]
    currentTagText.value = ''
  }

  function removeTag(tag) {
    editedPost.tags = tags.value.filter(t => t !== tag)
  }

  return {
    currentTagText,
    tags,
    addTag,
    removeTag
  }
}
