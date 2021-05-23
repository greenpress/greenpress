<template>
  <div>
    <FormInput title="FTP Host" v-model="form.host" />
    <FormInput title="Username" v-model="form.username" />
    <FormInput title="Password" type="password" v-model="form.password" />
  </div>
</template>
<script>
  import { watchEffect, reactive } from 'vue'
  import FormInput from '../../core/components/forms/FormInput.vue'

  export default {
    name: 'StorageFtpAuth',
    props: {
      value: Object
    },
    components: { FormInput },
    setup(props, { emit }) {
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
      watchEffect(() => emit('change', form))
      return {
        form
      }
    }
  }
</script>
