<template>
	<div class="menu-link-input">
		<MenuKindInput :value="value.kind" @change="changeKind"/>
		<div>
			<div v-if="value.kind === 'category'" class="select-category">
				<div>{{ $t('Category') }}:</div>
				<CategorySelector prop="_id" :value="categoryValue" @change="changeValue"/>
			</div>
			<PostSelector v-else-if="value.kind === 'post'"
			              :value="value.value || (value.post && value.post._id)"
			              :title="value.post ? value.post.title : null"
			              @changed="changeValue"/>
			<MenuHttpInput v-else-if="value.kind === 'http'"
			               :value="value.value"
			               @changed="changeValue"/>
		</div>
		<div class="actions">
			<i @click="$emit('removed', value)" class="el-icon-delete"/>
		</div>
	</div>
</template>
<script lang="ts">
import {computed, PropType} from 'vue'
import MenuKindInput from './MenuKindInput.vue'
import PostSelector from './PostSelector.vue'
import MenuHttpInput from './MenuHttpInput.vue'
import CategorySelector from '../../categories/components/CategorySelector.vue'

export default {
	components: {CategorySelector, MenuHttpInput, PostSelector, MenuKindInput},
	props: {
		value: Object as PropType<{ value: string, category?: {_id: string} }>
	},
	emits: ['changed', 'removed'],
	setup(props, {emit}) {
		function emitUpdate(changes) {
			emit('changed', {
				...props.value,
				...changes
			})
		}

		return {
			categoryValue: computed(() => {
				return props.value.value || props.value.category?._id || props.value.category
			}),
			changeKind(kind) {
				let value
				switch (kind) {
					case 'category':
					case 'post':
						value = ''
						break
					case 'http':
						value = {}
				}
				emitUpdate({kind, value})
			},
			changeValue: (value) => emitUpdate({value})
		}
	}
}
</script>
<style scoped lang="scss">
@import "../../../style/colors";

.menu-link-input {
  display: flex;
  align-items: start;
  border: 1px solid $border-color;
  margin: 10px;
  padding: 15px;
  background-color: $secondary-color;
  color: #fff;
  gap: 10px;
}

.select-category {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.actions {
	margin-left: auto;
}
</style>
