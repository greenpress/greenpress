import {reactive} from 'vue'
import {useSubmitting} from '../../core/compositions/submitting'
import {useDispatcher} from '../../core/compositions/dispatcher'
import {removeUnsavedChanges} from '../../drafts/compositions/unsaved-changes'
import {IBlock} from '../../../services/types/block';
import blocksService from '../../../services/blocks-service'
import {useEditedInputModels} from '../../core/compositions/edited-inputs';

export function useEditBlock(blockId: string) {
  const {result: block} = useDispatcher<IBlock>(() => blocksService.getOne(blockId))

  const {submit, submitting} = useSubmitting(
    (payload) => blocksService.update(blockId, payload).then((newBlock) => {
      removeUnsavedChanges('block', blockId);
      block.value = newBlock;
    }),
    {
      success: 'Block updated successfully',
      error: 'Failed to update category'
    }
  )

  return {
    block,
    updateBlock: submit,
    submitting
  }
}

export function useBlocksList() {
  const {loading, result} = useDispatcher<IBlock[]>(() => blocksService.getAll());
  const {submit} = useSubmitting(
    ({_id}) =>
      blocksService.remove(_id).then(() => {
        result.value = result.value.filter((block) => block._id !== _id);
      }),
    {
      success: 'Block removed successfully',
      error: 'Failed to remove block'
    }
  )

  return {
    loading,
    blocks: result,
    removeBlock: submit
  }
}

export function useBlockForm(props) {
  const editedBlock = reactive<Partial<IBlock>>({
    name: null,
    description: null,
    content: null,
    contentType: null,
  })

  return {
    editedBlock,
    ...useEditedInputModels(editedBlock, props.block, ['name', 'description', 'content', 'contentType']),
  }
}
