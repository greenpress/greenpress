import {useDispatcher} from '@/modules/core/compositions/dispatcher';
import {useSubmitting} from '@/modules/core/compositions/submitting';
import pluginsService from '@/services/plugins-service';
import {IPlugin} from '@/services/types/plugin';
import {usePluginsList} from '../store/plugins-list';

export function useEditPlugin(pluginId: string) {
  const {loading, result: plugin} = useDispatcher<IPlugin[]>(() => pluginsService.getOne(pluginId));
  const {removePlugin, retry} = usePluginsList();

  const {submit: updatePlugin, submitting} = useSubmitting(
    (changes: Partial<IPlugin>) =>
      pluginsService.update(pluginId, changes).then(retry),
    {
      success: 'Plugin updated successfully',
      error: 'Failed to update plugin'
    }
  )

  return {
    loading,
    submitting,
    plugin,
    removePlugin: () => removePlugin(plugin.value),
    updatePlugin
  }
}
