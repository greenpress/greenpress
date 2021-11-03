<template>
	<el-select v-model="model">
		<el-option v-for="category in categories"
		           :key="category._id"
		           :value="category[prop]" :label="category.name"/>
	</el-select>
</template>
<script>
import { computed, watch } from 'vue'
import { useCategorySelector } from '../compositions/categories'

export default {
	name: 'CategorySelector',
	props: {
		value: String,
		prop: { type: String, default: 'path' },
	},
	setup(props, { emit }) {
		const { mounted, categories } = useCategorySelector()

		const model = computed({
			get() {
				const value = props.value

				return value || (categories.value.length ? categories.value[0][props.prop] : null)
			},
			set(value) {
				emit('change', value)
			}
		})

		watch(
			mounted,
			() => emit('mounted', props.value || (categories[0] && categories[0][props.prop]))
		)

		return {
			model,
			categories
		}
	}
}
</script>
