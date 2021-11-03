<template>
	<details>
		<summary>Metadata</summary>
		<div class="input-group">
			<el-form-item label="Category">
				<CategorySelector :model-value="categoryPath" @change="emitCategory" @mounted="mountCategory"/>
			</el-form-item>
			<FormInput title="Path" label="leave empty to auto-generate"
			           :model-value="path" @input="emitPath"/>
		</div>
	</details>
</template>

<script lang="ts">
import FormInput from '../../core/components/forms/FormInput.vue'
import CategorySelector from '../../categories/components/CategorySelector.vue'

export default {
	name: 'PostFormMetadata',
	components: {FormInput, CategorySelector},
	props: {
		categoryPath: String,
		path: String,
		isNew: Boolean,
	},
	emits: ['changed:path', 'changed:category'],
	setup(props, {emit}) {
		const emitCategory = (path: string) => {
			emit('changed:category', path);
		};
		const emitPath = (path: string) => {
			emit('changed:path', path);
		};
		return {
			emitCategory,
			emitPath,
			mountCategory(path: string) {
				if (props.isNew) {
					emit('changed:category', path);
				}
			},
		}
	}
}
</script>

<style scoped>
details {
	border: 1px solid #eee;
	padding: 10px;
	margin: 10px 0;
}

details summary {
	cursor: pointer;
	user-select: none;
}

.input-group {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: end;
}

@media (max-width: 720px) {
	.input-group {
		flex-direction: column;
	}
}
</style>
