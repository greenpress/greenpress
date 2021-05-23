import { computed, watch, ref } from 'vue'
import { useAppConfiguration } from '@/modules/configurations/store/app-configuration.ts'

export function useEditorConfig() {
	const config = useAppConfiguration()
	const editorConfig = ref({})

	const language = computed(() => (config.value && config.value.metadata.language) || 'en')

	watch(language, async language => {
		await import(`../../../../node_modules/@greenpress/gp-editor/translations/${language}.js`).catch(() => {
		})
		editorConfig.value = { language }
	}, { immediate: true })

	return {
		editorConfig
	}
}
