<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>{{ $t('Context') }}</th>
        <th>{{ $t('Name') }}</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="draft in drafts" :key="draft._id">
        <td>{{ $t(draft.contextType) }}</td>
        <td>
          <router-link :to="getDraftLink(draft)">{{ draft.contextDisplayName }}</router-link>
        </td>
        <td>
          <a @click.prevent="remove(draft)"><el-icon><icon-delete/></el-icon></a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
import {useConfirmAction} from '../../core/compositions/confirm-action'
import {getAll, deleteDraft } from '../../../services/drafts-service'
import {useNotifications} from '../../core/compositions/notifications'
import {useSubmitting} from '../../core/compositions/submitting'

const drafts = ref([])
const {error} = useNotifications()
getAll().then(list => drafts.value = list).catch(() => error('Failed to load drafts list'))

const getDraftLink = (draft) => {
  let routeName
  switch (draft.contextType) {
    case 'post':
      routeName = draft.contextId ? 'editPost' : 'createPost'
      break;
    case 'category':
      routeName = draft.contextId ? 'editCategory' : 'createCategory'
      break;
    case 'block':
      routeName = draft.contextId ? 'editBlock' : 'createBlock'
      break;
    default:
      routeName = '[no name]'
  }

  return {
    name: routeName,
    params: draft.contextRouteParams
  }
};
const remove = useConfirmAction(
  useSubmitting(
    async draft => {
      await deleteDraft(draft.contextType, draft.contextId)
      drafts.value = drafts.value.filter(d => d !== draft)
    },
    {success: 'Draft deleted successfully', error: 'Failed to remove draft'}
  ).submit)
</script>
<style scoped lang="scss">
</style>
