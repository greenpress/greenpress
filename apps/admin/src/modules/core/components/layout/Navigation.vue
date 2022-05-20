<template>
	<nav :class="{show: opened}">
		<div class="mobile-mask" @click="close"/>
		<router-link to="/" class="home-logo">
			<img alt="greenpress Admin Panel" src="../../../../assets/logo.png">
		</router-link>
		<router-link to="/configurations">
			<el-icon><icon-setting/></el-icon>
			<span>{{ $t('Configurations') }}</span>
		</router-link>
		<router-link to="/assets">
			<el-icon><icon-files/></el-icon>
			<span>{{ $t('Storage & Assets') }}</span>
		</router-link>
		<router-link to="/menus">
			<el-icon><icon-menu/></el-icon>
			<span>{{ $t('Menus') }}</span>
		</router-link>
		<router-link to="/categories">
			<el-icon><icon-folder-opened/></el-icon>
			<span>{{ $t('Categories') }}</span>
		</router-link>
		<router-link to="/posts">
			<el-icon><icon-document/></el-icon>
			<span>{{ $t('Posts') }}</span>
		</router-link>
    <router-link to="/blocks">
	  <el-icon><icon-box/></el-icon>
      <span>{{ $t('Blocks') }}</span>
    </router-link>
    <router-link to="/layouts">
      <el-icon><icon-grid /></el-icon>
      <span>{{ $t('Layouts') }}</span>
    </router-link>
		<router-link to="/users">
			<el-icon><icon-user/></el-icon>
			<span>{{ $t('Users') }}</span>
		</router-link>
		<router-link to="/drafts">
			<el-icon><icon-document-copy/></el-icon>
			<span>{{ $t('Drafts') }}</span>
		</router-link>
		<a class="bottom" @click="logout" v-t="'Logout'"></a>
	</nav>
</template>

<script lang="ts" setup>
import {useAuth} from '../../compositions/authentication';
import {useRouter} from 'vue-router';

const router = useRouter()

defineProps({ opened: Boolean })
const emit = defineEmits(['close'])

const {logout: logoutApi} = useAuth()

const close = () => emit('close')

const logout = async () => {
	await logoutApi()
	router.push('login')
}
</script>
<style scoped lang="scss">
@import "../../../../style/colors";

nav {
  display: flex;
  flex-direction: column;
  width: 220px;
  background-color: #eee;
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.4);
}

.mobile-mask {
  display: none;
}

.home-logo {
  padding: 5px 0 10px 0;
  height: 75px;
  align-self: center;

  img {
	max-width: 100%;
	max-height: 100%;
  }
}

a {
  font-weight: bold;
  color: $negative-color;
  padding: 15px 3px;
  display: inline-flex;

  &:hover {
	text-decoration: none;
	background-color: #e4e4e4;
	border: none;
  }

  &.router-link-active {
	color: $main-color;
  }
  .el-icon {
	  padding-inline-start: 10px;
	  padding-inline-end: 25px;
  }
}

@media (max-width: 600px) {
  nav {
	position: absolute;
	left: -100%;
	top: 0;
	bottom: 0;
	overflow: hidden;
	transition: left 0.2s ease-in-out;
	z-index: 2;

	&.show {
	  display: flex;
	  left: 0;

	  .mobile-mask {
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
	  }
	}
  }
}

.bottom {
  display: block;
  margin-top: auto;
	text-align: center;
}
</style>
