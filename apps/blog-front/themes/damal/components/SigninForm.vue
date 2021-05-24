<template>
	<Form
		button_title="Sign in"
		next_page="/signup"
		v-bind:onSubmit="onSubmit"
		message="Don't have an account yet? Sign Up"
		title="Sign in">
		<FormInput
			v-model="inputs.email"
			label="Email"
			name="email"
			type="text"
			v-bind:validators="validators.email" />
		<FormInput
			v-model="inputs.password"
			label="Password"
			name="password"
			type="password" />
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
