<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>{{$t('Context')}}</th>
        <th>{{$t('Name')}}</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="draft in drafts" :key="draft._id">
				<td>{{$t(draft.contextType)}}</td>
        <td>
          <router-link :to="getDraftLink(draft)">{{ draft.contextDisplayName }}</router-link>
        </td>
        <td>
          <a @click.prevent="deleteDraft(draft)" class="el-icon-delete" />
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import { ref } from 'vue'
  import { useConfirmAction } from '@/modules/core/compositions/confirm-action'
  import { getAll, deleteDraft } from '@/services/drafts-service'
  import { useNotifications } from '@/modules/core/compositions/notifications.ts'
  import { useSubmitting } from '@/modules/core/compositions/submitting.ts'

  export default {
    name: 'DraftsList',
    setup() {
      const drafts = ref([])
      const { error } = useNotifications()
      getAll().then(list => drafts.value = list).catch(() => error('Failed to load drafts list'))

      return {
        drafts,
        getDraftLink: (draft) => {
          let routeName
          if (draft.contextType === 'post') {
            routeName = draft.contextId ? 'editPost' : 'createPost'
          } else {
            routeName = draft.contextId ? 'editCategory' : 'createCategory'
          }

          return {
            name: routeName,
            params: draft.contextRouteParams
          }
        },
        deleteDraft: useConfirmAction(
          useSubmitting(
            async draft => {
              await deleteDraft(draft.contextType, draft.contextId)
              drafts.value = drafts.value.filter(d => d !== draft)
            },
            { success: 'Draft deleted successfully', error: 'Failed to remove draft' }
          ).submit)
      }
    }
  }
</script>
<style scoped lang="scss">
</style>
