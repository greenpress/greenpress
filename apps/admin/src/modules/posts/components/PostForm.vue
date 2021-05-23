<template>
  <el-form class="post-form" @submit.native.prevent="submit">
    <el-checkbox :model-value="isPublic" @change="editedPost.isPublic = $event">{{$t('Public Post')}}</el-checkbox>
    <el-checkbox :model-value="isPinned" @change="editedPost.isPinned = $event">{{$t('Pinned Post')}}</el-checkbox>

    <FormInput title="Title" :model-value="title" @input="editedPost.title = $event" />
    <FormInput title="Path" label="leave empty to auto-generate"
               :model-value="path" @input="editedPost.path = $event" />

    <el-form-item label="Thumbnail">
      <a @click="toggleUpload">Upload</a>
      <AssetUploader v-if="uploadThumbnailOpen" @change="uploadComplete" />
      <FormInput v-else :model-value="thumbnail" placeholder="https://" @input="thumbnail = $event" />
      <div>
        <img v-if="!uploadThumbnailOpen" class="thumbnail-image" :src="editedPost.thumbnail || post.thumbnail">
      </div>
    </el-form-item>

    <el-form-item label="Category">
      <CategorySelector :model-value="categoryPath" @change="editedPost.category = $event"
                        @mounted="mountCategory" />
    </el-form-item>

    <FormInput title="Tags" v-model="currentTagText" @keydown.enter.prevent="addTag" placeholder="ADD NEW TAG">
      <ul>
        <li v-for="tag in tags" :key="tag">
          {{ tag }}
          <i @click="removeTag(tag)" class="el-icon-delete" />
        </li>
      </ul>
    </FormInput>

    <el-form-item label="Short" class="form-item-flex">
      <div>
        <gp-editor :model-value="post.short || editedPost.short" @input="editedPost.short = $event" :config="editorConfig"/>
      </div>
    </el-form-item>

    <el-form-item label="Content" class="form-item-flex">
      <div class="post-contents">
        <PostContentEditor v-for="item in contents"
                           :key="item.index"
                           :value="item.content"
                           :state="item.state"
                           @remove="removeContent(item.index)"
                           @contentChange="setContent(item.index, $event)"
                           @typeChange="setContentsStates(item.index, $event)" />
        <el-button native-type="button" type="text" icon="el-icon-plus" @click="addContent" />
      </div>
    </el-form-item>

    <el-button native-type="submit" :loading="submitting">{{$t('SAVE')}}</el-button>
  </el-form>
</template>
<script>
  import FormInput from '../../core/components/forms/FormInput.vue'
  import CategorySelector from '../../categories/components/CategorySelector.vue'
  import { clearNulls } from '../../core/utils/clear-nulls'
  import PostContentEditor from './PostContentEditor.vue'
  import { computed, onBeforeMount } from 'vue'
  import { usePostTags } from '../compositions/post-tags'
  import { usePostContents } from '../compositions/post-contents'
  import { useNewPost } from '../compositions/posts'
  import { useEditedInputs } from '../../core/compositions/edited-inputs'
  import { usePostThumbnail } from '../compositions/post-thumbnail'
  import { useUnsavedChanges } from '../../drafts/compositions/unsaved-changes'
  import { useEditorConfig } from '@/modules/posts/compositions/gp-editor'
	import AssetUploader from '../../assets/components/AssetUploader.vue'

  export default {
    components: { AssetUploader, PostContentEditor, CategorySelector, FormInput },
    props: {
      post: Object,
      submitting: Boolean
    },
		emits: ['submit'],
    setup(props, { emit }) {
      const editedPost = useNewPost().post
      const tagsContext = usePostTags(editedPost, props.post)
      const contentsContext = usePostContents(editedPost, props.post)

      useUnsavedChanges('post', props.post._id, computed(() => props.post.title), editedPost)

      onBeforeMount(() => {
        if (!props.post._id) {
          editedPost.isPublic = true
        }
      })

      return {
        ...tagsContext,
        ...contentsContext,
        ...useEditorConfig(),
        ...usePostThumbnail(editedPost, props.post),
        ...useEditedInputs(editedPost, props.post, ['title', 'path']),
        editedPost,
        categoryPath: computed(() => editedPost.category || (props.post.category && props.post.category.path)),
        isPublic: computed(() => {
          const isBool = typeof editedPost.isPublic === 'boolean'
          return isBool ? editedPost.isPublic : props.post.isPublic
        }),
        isPinned: computed(() => {
          const isBool = typeof editedPost.isPinned === 'boolean'
          return isBool ? editedPost.isPinned : props.post.isPinned
        }),
        mountCategory(path) {
          if (!props.post._id) {
            editedPost.category = path
          }
        },
        submit() {
          const submittedPost = clearNulls(editedPost)
          emit('submitted', submittedPost)
        }
      }
    }
  }
</script>
<style scoped lang="scss">

  .post-form {
    padding: 0 10px;
    margin-bottom: 20px;
  }

  .thumbnail-image {
    max-width: 100px;
  }

  .post-contents {
    display: flex;
    flex-direction: column;
    align-items: center;

    .content-editor {
      width: 100%;
      margin-bottom: 5px;
    }
  }
</style>
