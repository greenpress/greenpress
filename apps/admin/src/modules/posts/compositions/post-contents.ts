import { computed, Ref } from 'vue'
import { PostContent, PostContents, PostContentState } from '@/modules/posts/compositions/types/post-contents.ts'

export function usePostContents(editedPost, originalPost) {
  const editorContentsStates = computed(() => {
    if (editedPost.editorContentsStates === null) {
      return originalPost.editorContentsStates || [PostContentState.EDITOR]
    }
    return editedPost.editorContentsStates
  })

  function getCurrent() {
    const contents = editedPost.contents || originalPost.contents
    return { contents, editorContentsStates: editorContentsStates.value }
  }

  const contents: Readonly<Ref<Readonly<PostContents>>> = computed(() => {
    const states = editorContentsStates.value
    const contents: string[] = (editedPost.contents === null ? originalPost.contents : editedPost.contents) || [null]
    return contents.map((content, index): PostContent => {
      return {
        content,
        index,
        state: states[index] || PostContentState.EDITOR,
      }
    })
  })

  function setContent(index, html) {
    editedPost.contents = editedPost.contents !== null ? [...editedPost.contents] : [...(originalPost.contents || [])]
    editedPost.contents[index] = html
  }

  function setContentsStates(index, type) {
    editedPost.editorContentsStates = [].concat(editedPost.editorContentsStates || originalPost.editorContentsStates || [])
    editedPost.editorContentsStates[index] = type
  }

  function removeContent(index) {
    const { contents, editorContentsStates } = getCurrent()

    contents.splice(index, 1)
    editorContentsStates.splice(index, 1)

    editedPost.contents = contents
    editedPost.editorContentsStates = editorContentsStates
  }

  function addContent() {
    const { contents, editorContentsStates } = getCurrent()

    contents.push('')
    editorContentsStates.push(PostContentState.EDITOR)

    editedPost.contents = contents
    editedPost.editorContentsStates = editorContentsStates
  }

  return {
    editorContentsStates,
    contents,
    setContent,
    setContentsStates,
    removeContent,
    addContent
  }
}
