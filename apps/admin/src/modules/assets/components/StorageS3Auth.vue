<template>
	<div>
		<FormInput title="Access Key" v-model="form.accessKey"/>
		<FormInput title="Secret Key" v-model="form.secretKey"/>
	</div>
</template>
<script lang="ts" setup>
import { watchEffect, reactive } from 'vue'
import FormInput from '../../core/components/forms/FormInput.vue'

const props = defineProps({value: Object})
const emit = defineEmits(['update:modelValue'])

const form = reactive({
	accessKey: '',
	secretKey: ''
})
if (props.value) {
	form.accessKey = props.value.accessKey
	form.secretKey = props.value.secretKey
}

function getFormInputs({ accessKey, secretKey }) {
	return { accessKey, secretKey };
}

watchEffect(() => emit('update:modelValue', getFormInputs(form)))
</script>
