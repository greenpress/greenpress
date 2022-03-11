<template>
	<div>
		<FormInput title="FTP Host" v-model="form.host"/>
		<FormInput title="Username" v-model="form.username"/>
		<FormInput title="Password" type="password" v-model="form.password"/>
	</div>
</template>
<script lang="ts" setup>
import { watchEffect, reactive } from 'vue'
import FormInput from '../../core/components/forms/FormInput.vue'

const props = defineProps({value: Object})
const emit = defineEmits(['update:modelValue'])

const form = reactive({
	host: '',
	username: '',
	password: ''
})
if (props.value) {
	form.host = props.value.host
	form.username = props.value.username
	form.password = props.value.password
}

function getFormInputs({ host, username, password }) {
	return { host, username, password };
}

watchEffect(() => emit('update:modelValue', getFormInputs(form)))
</script>
