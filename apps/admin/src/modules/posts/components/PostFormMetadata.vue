<template>
  <div class="input-group">
    <el-form-item label="Category">
      <div>&nbsp;</div>
      <CategorySelector :model-value="categoryPath" @change="emitCategory" @mounted="mountCategory"/>
    </el-form-item>
    <FormInput title="Path" label="leave empty to auto-generate"
               :model-value="path" @input="emitPath"/>
  </div>
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
.input-group {
	display: flex;
	flex-direction: row;
	align-items: end;
  gap: 5px;
}

.input-group > :first-child {
  flex: 2;
  min-width: 200px;
}


.input-group > :last-child {
  flex: 5;
}

@media (max-width: 720px) {
	.input-group {
		flex-direction: column;
	}
}
</style>
