import {useSubmitting} from '../../core/compositions/submitting'
import {useDispatcher} from '../../core/compositions/dispatcher'
import {ILayout, LayoutKind} from '@greenpress/sdk/dist/layouts';
import sdk from '@/services/sdk';
import {removeUnsavedChanges} from '@/modules/drafts/compositions/unsaved-changes';
import {reactive} from 'vue';
import {useEditedInputModels} from '@/modules/core/compositions/edited-inputs';

function getBasicElement(tag: string) {
  return {
    component: tag,
    predefined: false,
    classes: '',
    props: {}
  };
}

function getBasicContentItem() {
  return {
    ...getBasicElement('div'),
    children: [
      getBasicElement('header'),
      getBasicElement('main'),
      getBasicElement('footer'),
    ]
  };
}

function getNewLayout(kind): ILayout {
  return {
    kind,
    connectedData: [],
    content: [getBasicContentItem()]
  }
}

export function useEditLayout(kind: LayoutKind) {
  const {result: layout} = useDispatcher<ILayout>(
    () => sdk.layouts.getLayout(kind)
      .then((layout): ILayout => {
        return layout || getNewLayout(kind);
      })
      .catch(() => {
        return getNewLayout(kind)
      })
  )

  const {submit, submitting} = useSubmitting(
    (payload) => sdk.manageLayouts.update(kind, payload).then((newLayout) => {
      removeUnsavedChanges('layout', kind);
      layout.value = newLayout;
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
