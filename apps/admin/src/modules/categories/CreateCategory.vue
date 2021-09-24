<template>
	<div class="category-page">
		<PageTitle title="Create Category"/>
		<CategoryForm :category="{}" @submitted="submit"/>
	</div>
</template>
<script>
import CategoryForm from './components/CategoryForm.vue'
import { createCategory } from './compositions/categories'
import PageTitle from '../core/components/semantics/PageTitle.vue'
import { removeUnsavedChanges } from '@/modules/drafts/compositions/unsaved-changes.ts'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'CreateCategory',
	components: { PageTitle, CategoryForm },
	setup() {
		const router = useRouter()

		async function submit(data) {
			const { path } = await createCategory(data)
			removeUnsavedChanges('category')
			router.push({
				name: 'editCategory',
				params: { categoryPath: path }
			})
		}

		return {
			submit
		}
	}
})
</script>
