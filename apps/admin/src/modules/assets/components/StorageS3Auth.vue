<template>
	<div>
		<FormInput title="Access Key" v-model="form.accessKey"/>
		<FormInput title="Secret Key" v-model="form.secretKey"/>
	</div>
</template>
<script>
import { watchEffect, reactive } from 'vue'
import FormInput from '../../core/components/forms/FormInput.vue'

export default {
	name: 'StorageS3Auth',
	props: {
		value: Object
	},
	components: { FormInput },
	setup(props, { emit }) {
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

		watchEffect(() => emit('change', getFormInputs(form)))
		return {
			form
		}
	}
}
</script>
