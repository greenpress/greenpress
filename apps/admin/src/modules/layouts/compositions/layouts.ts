import {useSubmitting} from '../../core/compositions/submitting'
import {useDispatcher} from '../../core/compositions/dispatcher'
import {ILayout, LayoutKind} from '@greenpress/sdk/dist/layouts';
import sdk from '@/services/sdk';
import {removeUnsavedChanges} from '@/modules/drafts/compositions/unsaved-changes';
import {reactive} from 'vue';
import {useEditedInputModels} from '@/modules/core/compositions/edited-inputs';

export function useLayoutsList() {
  const {loading, result} = useDispatcher<ILayout[]>(() => {
      return sdk.layouts.getList()
  });
  const {submit} = useSubmitting(
    ({kind}) =>
        sdk.layouts.remove(kind).then(() => {
        result.value = result.value.filter((layout) => layout.kind !== kind);
      }),
    {
      success: 'Layout removed successfully',
      error: 'Failed to remove layout'
    }
  )

  return {
    loading,
    layouts: result,
    removeLayout: submit
  }
}

export function useEditLayout(kind: LayoutKind) {
    const {result: layout} = useDispatcher<ILayout>(() => sdk.layouts.getLayout(kind))

    const {submit, submitting} = useSubmitting(
        (payload) => sdk.layouts.update(kind, payload).then((newlayout) => {
            removeUnsavedChanges('layout', kind);
            layout.value = newlayout;
        }),
        {
            success: 'Layout updated successfully',
            error: 'Failed to update layout'
        }
    )

    return {
        layout,
        updateLayout: submit,
        submitting
    }
}


export function useLayoutForm(props) {
    const editedLayout = reactive<Partial<ILayout>>({
        kind: null,
        connectedData: null,
        content: null,
    })

    return {
        editedLayout,
        ...useEditedInputModels(editedLayout, props.layout, ['kind', 'connectedData', 'content']),
    }
}
