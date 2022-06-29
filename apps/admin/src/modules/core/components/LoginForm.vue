<template>
	<el-form class="login-form" @submit.native.prevent="submit">
		<el-form-item :label="$t('Email')" class="form-item-flex">
			<div dir="ltr">
				<el-input name="email" v-model="form.email" type="email" required @focus="onFocus"/>
			</div>
		</el-form-item>
		<el-form-item :label="$t('Password')" class="form-item-flex">
			<div dir='ltr'>
				<el-input name="password" v-model="form.password" type="password" required @focus="onFocus"/>
			</div>
		</el-form-item>
		<div class="form-buttons">
      <SaveButton :submitting="submitting" text="Login"/>
		</div>
	</el-form>
</template>

<script lang="ts">
import {watch} from 'vue'
import {useLogin} from '../compositions/authentication'
import {useSubmitting} from '../compositions/submitting'
import {useRouter} from 'vue-router'
import SaveButton from '@/modules/core/components/forms/SaveButton.vue';

export default {
	name: 'LoginForm',
  components: {SaveButton},
  setup() {
		const {login, form, isLoggedIn} = useLogin()
		const router = useRouter()

		const {submit, submitting} = useSubmitting(login, {error: 'Login failed'})

		watch(isLoggedIn, (is) => is && router.push({name: 'home'}))

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
@import "../../../style/colors";

form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 90%;
  max-width: 500px;
  margin: 0 auto;
}

form ::v-deep(label) {
	color: white;
}

.form-buttons {
	text-align: end;
}
</style>
