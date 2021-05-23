import { useConfirmAction } from '../../core/compositions/confirm-action'
import usersService from '../../../services/users-service'
import { useDispatcher } from '../../core/compositions/dispatcher'
import { useSubmitting } from '../../core/compositions/submitting'

export function useEditUsers(userId) {
  const { result: user } = useDispatcher(() => usersService.getOne(userId))
  const { submit, submitting } = useSubmitting((payload) => usersService.update(userId, payload), {
    success: 'User updated successfully',
    error: 'Failed to update user'
  })
  return {
    user,
    updateUser: submit,
    submitting
  }
}

export function useCreateUser() {
  const { submit, submitting } = useSubmitting(usersService.create, {
    success: 'User created successfully',
    error: 'Failed to create user'
  })
  return {
    createUser: submit,
    submitting
  }
}

export function useRemoveUser(onSuccess) {
  const { submit, submitting: removing } = useSubmitting(
    (id) => usersService.remove(id).then(() => onSuccess(id)),
    {
      success: 'User removed successfully',
      error: 'Failed to remove user'
    })

  return {
    remove: useConfirmAction(user => submit(user._id)),
    removing
  }
}

/**
 *
 * @returns {{users: Ref<Array<any>>}}
 */
export function useUsersList() {
  const { result: users } = useDispatcher(() => usersService.getAll(), [])
  return { users }
}
