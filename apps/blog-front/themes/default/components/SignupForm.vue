<template>
  <Form buttonTitle="Sign up" nextPage="/signin" @submit="onSubmit" message="Already have an account? Sign In">
    <FormInput v-model="inputs.name" label="Display name" name="name" type="text" />
    <FormInput v-model="inputs.email" label="Email" name="email" type="text" :validators="validators.email" />
    <FormInput v-model="inputs.password" label="Password" name="password" type="password" />
    <FormInput v-model="inputs.confirmPassword" label="Confirm password" name="confirmPassword" type="password" />
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
