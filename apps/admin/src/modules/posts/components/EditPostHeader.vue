<template>
	<div class="post-header">
		<h2>{{ title }}<strong v-if="post.title">{{ post.title }}</strong></h2>
		<div class="buttons-group">
			<a @click="to('details')" :class="{active: $route.query.tab === 'details'}">{{ $t('Page details') }}</a>
			<a @click="to('short')" :class="{active: $route.query.tab === 'short'}">{{ $t('Short') }}</a>
			<a @click="to('content')" :class="{active: $route.query.tab === 'content'}">{{ $t('Content') }}</a>
			<el-button native-type="submit" type="primary" :loading="submitting" icon="el-icon-s-promotion"/>
		</div>
	</div>
</template>

<script lang="ts">
import {computed} from 'vue';
import {translate} from '../../../plugins/i18n';
import {useRouter} from 'vue-router';

export default {
	name: 'EditPostHeader',
	props: {
		post: Object,
		submitting: Boolean
	},
	setup({post}) {
		const router = useRouter();
		return {
			title: computed(() => translate(post._id ? 'Edit Post' : 'Create Post')),
			to: (tab) => {
				router.push({query: {tab}})
			}
		}
	}
}
</script>

<style scoped lang="scss">
@import "../../../style/colors";

.post-header {
  display: flex;
  flex-direction: row;
  background-color: $border-color;
  justify-content: space-between;
  align-items: center;
}

h2 {
  strong {
	color: $main-color;

	&:before {
	  content: ': ';
	  color: black;
	}
  }
}

@media screen and (max-width: 780px) {
  h2 {
	font-size: 11px;
  }
  h2 strong {
	display: none;
  }
  .buttons-group {
	padding: 0 6px;
  }

  .el-button {
	font-size: 11px;
	padding: 8px;
	min-height: 20px;
  }
}

.buttons-group {
  padding: 0 10px;
  flex: 1;
  display: flex;
  justify-content: flex-end;

  a {
		margin: 0 5px;
		padding: 0 15px;
		line-height: 40px;
		transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

		&.active, &:active {
			background-color: #fff;
			box-shadow: 2px 2px #eee;
		}

		&:hover {
			color: $secondary-color;
			border: 0;
		}
  }
}
</style>
