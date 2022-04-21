<template>
	<div>
		<FormInput title="Api Key" v-model="form.apiKey"/>
		<FormInput title="Api Secret" type="password" v-model="form.apiSecret"/>
	</div>
</template>
<script>
import { watchEffect, reactive } from 'vue'
import FormInput from '../../core/components/forms/FormInput.vue'

export default {
	name: 'StorageCloudinaryAuth',
	props: {
		value: Object
	},
	components: { FormInput },
	setup(props, { emit }) {
		const form = reactive({
			apiKey: '',
      apiSecret: '',
		})
		if (props.value) {
      form.apiKey = props.value.apiKey;
      form.apiSecret = props.value.apiSecret;
		}

		function getFormInputs({ apiKey, apiSecret }) {
			return { apiKey, apiSecret };
		}

		watchEffect(() => emit('update:modelValue', getFormInputs(form)))
		return {
			form
		}
	}
}
</script>
