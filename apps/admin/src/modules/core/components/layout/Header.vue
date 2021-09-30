<template>
	<header :dir="$t('appDirection')">
		<el-button type="default" icon="el-icon-menu" class="btn" circle @click="open"/>
		<span class="user-welcome" v-if="user" v-html="$t('Hello {userName}',{userName:user.name})"></span>
	</header>
</template>
<script>
  import { useAuth } from '../../compositions/authentication'

  export default {
    name: 'Header',
    setup(_, { emit }) {
	    const { user } = useAuth()

      return {
        user,
        open: () => emit('open'),
      }
    }
  }
</script>
<style scoped lang="scss">
	@import "../../../../style/colors";

	header {
		position: sticky;
		top: 0;
		z-index: 1;
		display: flex;
		justify-content: flex-start;
		height: 70px;
		background-color: $negative-color;
		align-items: center;
		color: $main-color;
	}

	.user-welcome {
		padding-left: 10px;
	}

	.btn {
		margin-left: 10px;
		font-size: 18px;
		display: none;
	}

	a {
		text-decoration: none;
		border: 0;
		text-align: right;
		height: 100%;
		cursor: pointer;
		color: $main-color;

		&:hover {
			text-decoration: underline;
		}
	}

	.actions {
		margin-right: 10px;
		margin-left: auto;
	}

  [dir="rtl"] {
    .user-welcome {
      padding-right: 10px;
    }
    .actions {
      margin-left: 10px;
      margin-right: auto;
    }
  }

	@media (max-width: 600px) {
		.btn {
			display: block;
		}
	}
</style>
