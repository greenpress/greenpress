<template>
	<div class="menu-wrapper" :class="{active: active}">
		<div class="menu-opener" @click="active = true">-</div>
		<div class="menu-closer" @click="active = false"/>
		<div class="menu">
			<menuLink v-for="(item, index) of links"
			          :link="item" :key="index" class="link"
			          @click.native="active = false"/>
			<SearchForm class="search-form"/>
		</div>
	</div>
</template>
<script>
  import { ref } from '@nuxtjs/composition-api'
  import { useMenuLinks } from '~/compositions/main-menu'
  import MenuLink from '~/components/MenuLink'
  import SearchForm from './SearchForm'

  export default {
    components: { MenuLink, SearchForm },
    setup () {
      return {
        links: useMenuLinks(),
        active: ref(false),
      }
    }
  }
</script>
<style scoped lang="scss">
	@import "../colors";

	.menu-wrapper {
		flex: 1;
		padding: 0 10px;
	}

	.menu {
		width: 100%;
		flex-wrap: nowrap;
		display: flex;
		align-items: center;
		background-color: #000;
	}

	.menu-opener, .menu-closer {
		display: none;
	}

	.search-form {
		margin-left: auto;
	}

	.link /deep/ a {
		color: #fff;
		line-height: 46px;
		display: block;
		padding: 0 10px;
		margin: 0 5px;
		transition: background-color 0.2s linear;


		&:hover, &.nuxt-link-active {
			background-color: $mainColor;
			text-decoration: none;
		}
	}

	@media all and (max-width: 720px) {
		.menu-opener {
			width: 36px;
			height: 36px;
			margin: 0 10px;
			cursor: pointer;
			background-color: $mainColor;
			border-radius: 5px;
			color: white;
			font-size: 70px;
			text-align: center;
			display: flex;
			flex-direction: column;
			justify-content: center;
			line-height: 10px;

			&:before, &:after {
				content: '-';
				text-align: center;
				line-height: 10px;
			}

			&:before {
				margin-top: -13px;
				vertical-align: top;
			}
		}
		.menu-closer {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.6);
		}
		.menu {
			width: 80%;
			position: fixed;
			top: 0;
			left: -80%;
			bottom: 0;
			z-index: 1;
			flex-direction: column;
			align-items: flex-start;
			transition: left 150ms ease-in-out;
			padding-top: 20px;

			@at-root html[dir="rtl"] #{&} {
				left: auto;
				right: -80%;
				transition-property: right;
			}
		}

		.active {
			.menu {
				left: 0;
				@at-root html[dir="rtl"] #{&} {
					left: auto;
					right: 0;
				}
			}

			.menu-closer {
				display: block;
			}
		}

		.link /deep/ a {
			&:hover, &.nuxt-link-active {
				background-color: transparent;
				color: $mainColor;
				text-decoration: none;
			}
		}
	}
</style>
