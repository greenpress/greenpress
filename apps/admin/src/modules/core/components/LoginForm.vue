<template>
	<el-form class="login-form" @submit.native.prevent="submit">
		<el-form-item :label="$t('Email')">
			<div dir="ltr">
				<el-input name="email" v-model="form.email" type="email" required @focus="onFocus"/>
			</div>
		</el-form-item>
		<el-form-item :label="$t('Password')">
			<div dir='ltr'>
				<el-input name="password" v-model="form.password" type="password" required @focus="onFocus"/>
			</div>
		</el-form-item>
		<div>
			<el-button native-type="submit" :loading="submitting">{{$t('Login')}}</el-button>
		</div>
	</el-form>
</template>

<script lang="ts">
  import { watch } from 'vue'
  import { useLogin } from '../compositions/authentication'
  import { useSubmitting } from '../compositions/submitting'
	import { useRouter } from 'vue-router'

  export default {
    name: 'LoginForm',
    setup() {
      const { login, form, isLoggedIn } = useLogin()
			const router = useRouter()

      const { submit, submitting } = useSubmitting(login, { error: 'Login failed' })

      watch(isLoggedIn, (is) => is && router.push({ name: 'home' }))

      return {
        submit,
        form,
        submitting,
        onFocus: () => {
          window.scrollTo(0, 0)
          document.body.scrollTop = 0
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	form {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		width: 90%;
		max-width: 500px;
		margin: 0 auto;
	}

	label {
		display: flex;
		padding: 10px 0;
		align-items: center;
		text-align: left;

		span {
			width: 100px;
		}

		input {
			flex-grow: 1;
			padding: 10px;
			border: 1px solid #ddd;
			border-radius: 5px;
			outline: none;
			font-size: 14px;
		}
	}
</style>
