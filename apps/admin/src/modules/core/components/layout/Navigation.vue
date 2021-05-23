<template>
	<nav :class="{show: opened}">
		<div class="mobile-mask" @click="close"/>
		<router-link to="/" class="home-logo">
			<img alt="greenpress Admin Panel" src="../../../../assets/logo.png">
		</router-link>
		<router-link to="/configurations">
			<i class="el-icon-setting"/>
			<span>{{$t('Configurations')}}</span>
		</router-link>
		<router-link to="/assets">
			<i class="el-icon-files"/>
			<span>{{$t('Storage & Assets')}}</span>
		</router-link>
		<router-link to="/menus">
			<i class="el-icon-menu"/>
			<span>{{$t('Menus')}}</span>
		</router-link>
		<router-link to="/categories">
			<i class="el-icon-folder-opened"/>
			<span>{{$t('Categories')}}</span>
		</router-link>
		<router-link to="/posts">
			<i class="el-icon-document"/>
			<span>{{$t('Posts')}}</span>
		</router-link>
		<router-link to="/users">
			<i class="el-icon-user"/>
			<span>{{$t('Users')}}</span>
		</router-link>
    <router-link to="/drafts">
      <i class="el-icon-document-copy"/>
      <span>{{$t('Drafts')}}</span>
    </router-link>
	</nav>
</template>

<script>
  export default {
    name: 'Navigation',
    props: {
      opened: Boolean
    },
    setup(_, { emit }) {
      return {
        close: () => emit('close')
      }
    }
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
		text-align: center;

		img {
			max-width: 100%;
			max-height: 100%;
		}
	}

	a {
		font-weight: bold;
		color: $negative-color;
		padding: 15px 3px;

		&:hover {
			text-decoration: none;
			background-color: #e4e4e4;
		}

		&.router-link-active {
			color: $main-color;
		}

		i {
			padding: 0 7px;
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
</style>
