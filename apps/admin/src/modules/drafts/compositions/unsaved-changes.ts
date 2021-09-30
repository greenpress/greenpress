import { ElMessageBox } from 'element-plus'
import debounce from 'lodash.debounce'
import { Ref, watch } from 'vue'
import { UnwrapRef } from 'vue'
import { deleteDraft, getDraft, setDraft } from '../../../services/drafts-service'
import { IDraftContexts } from '../../../services/types/draft'
import { useRoute } from 'vue-router'
import {translate} from '../../../plugins/i18n';

async function restoreDraft(contextType: string, contextId: string | null, contextData: UnwrapRef<any>) {
	let draft
	try {
		draft = await getDraft(contextType, contextId)
	} catch (e) {
		return
	}
	if (!draft?.contextData) {
		return
	}
	try {
		await ElMessageBox.confirm(
			translate('Would you like to restore unsaved changes?'),
			translate('You have unsaved changes'), {
				type: 'info',
				cancelButtonText: translate('Cancel'),
				confirmButtonText: translate('OK')
			})
		Object.assign(contextData, draft.contextData)
	} catch (err) {
		removeUnsavedChanges(contextType, contextId)
	}
}

const savePostDraft = debounce(function({
																					contextType,
																					contextId,
																					contextData,
																					contextDisplayName,
																					contextRouteParams
																				}: IDraftContexts<any>) {
	setDraft({
		contextType,
		contextId,
		contextData,
		contextDisplayName,
		contextRouteParams
	})
}, 3000)

export function useUnsavedChanges(contextType: string, contextId: string | null = null, displayName: Ref<string>, contextData: UnwrapRef<any>) {
	const $route = useRoute()
	restoreDraft(contextType, contextId, contextData)

	watch(() => [...Object.values(contextData), displayName.value], () => {
		savePostDraft({
			contextType,
			contextId,
			contextData,
			contextDisplayName: displayName.value,
			contextRouteParams: $route.params
		})
	}, { immediate: false })

	return {
		saveChanges: (data: any) => {
			savePostDraft(contextType, contextId, data || contextData)
		}
	}
}

export function removeUnsavedChanges(contextType: string, contextId: string | null = null) {
	deleteDraft(contextType, contextId)
}
