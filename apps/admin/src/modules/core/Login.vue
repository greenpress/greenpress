<template>
	<div class="login-page">
		<img alt="greenpress Admin Panel" src="../../assets/logo.png">
		<h1>{{$t('Please login')}}:</h1>
		<LoginForm/>
	</div>
</template>

<script>
  import LoginForm from './components/LoginForm.vue'

  export default {
    name: 'Login',
    components: {
      LoginForm
    }
  }
</script>
<style scoped>
	.login-page {
		text-align: center;
	}
	img {
		max-width: 400px;
		width: 80%;
		padding: 30px;
	}
</style>
