import { useDispatcher } from '../../core/compositions/dispatcher'
import menusService from '../../../services/menus-service'
import { useSubmitting } from '../../core/compositions/submitting'
import { useConfirmAction } from '../../core/compositions/confirm-action'

export function useMenusList() {
  const { result } = useDispatcher(() => menusService.getAll(), [])

  const { submit: remove } = useSubmitting(
    (name) => menusService.remove(name),
    {
      error: 'Failed to remove menu',
      success: 'Menu removed successfully'
    })

  return { menus: result, remove: useConfirmAction(remove) }
}
