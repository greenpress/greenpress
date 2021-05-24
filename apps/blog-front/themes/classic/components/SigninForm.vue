<template>
	<Form buttonTitle="Sign in" nextPage="/signup" @submit="onSubmit" message="Don't have an account? Sign Up">
		<FormInput v-model="inputs.email" label="Email" name="email" type="text" :validators="validators.email" />
		<FormInput v-model="inputs.password" label="Password" name="password" type="password" />
	</Form>
</template>

<script>
	import FormInput from './FormInput'
	import Form from './Form'
	import { reactive } from '@nuxtjs/composition-api'
	import { isEmail } from '~/compositions/validators'

	export default {
		components: {
			FormInput,
			Form
		},
		setup () {
			const inputs = reactive({
				email: '',
				password: ''
			})

			return {
				inputs,
				validators: {
					email: [isEmail()]
				},
				onSubmit: (e) => {
					console.log('Submitting...')
					// Call api
				}
			}
		}
	}
</script>
