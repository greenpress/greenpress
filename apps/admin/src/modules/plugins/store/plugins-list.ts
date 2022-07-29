import {defineStore} from 'pinia';
import {useDispatcher} from '@/modules/core/compositions/dispatcher';
import {useSubmitting} from '@/modules/core/compositions/submitting';
import pluginsService from '@/services/plugins-service';
import {IPlugin} from '@/services/types/plugin';

export const usePluginsList = defineStore('plugins-list', function usePluginsList() {
  const {loading, result} = useDispatcher<IPlugin[]>(() => pluginsService.getAll());
  const {submit} = useSubmitting(
    ({_id}) =>
      pluginsService.remove(_id).then(() => {
        result.value = result.value.filter((plugin) => plugin._id !== _id);
      }),
    {
      success: 'Plugin removed successfully',
      error: 'Failed to remove plugin'
    }
  )

  return {
    loading,
    plugins: result,
    removePlugin: submit
  }
})
