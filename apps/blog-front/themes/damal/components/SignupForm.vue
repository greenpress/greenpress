<template>
	<Form button_title="Sign up" next_page="/signin" v-bind:onSubmit="onSubmit" message="Already have an account? Sign In"
				title="Sign up">
		<FormInput v-model="inputs.name" label="Display name" name="name" type="text" />
		<FormInput v-model="inputs.email" label="Email" name="email" type="text" v-bind:validators="validators.email" />
		<FormInput v-model="inputs.password" label="Password" name="password" type="password" />
		<FormInput v-model="inputs.confirmPassword" label="Confirm password" name="confirm_password" type="password" />
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
				name: '',
				email: '',
				password: '',
				confirmPassword: ''
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
