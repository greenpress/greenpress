<template>
	<div class="post-header">
		<h2>{{ title }}<strong v-if="post.title">{{ post.title }}</strong></h2>
		<div class="buttons-group">
			<el-button @click="to('details')" :disabled="$route.query.tab === 'details'">{{ $t('Page details') }}
			</el-button>
			<el-button @click="to('short')" :disabled="$route.query.tab === 'short'">{{ $t('Short') }}</el-button>
			<el-button @click="to('content')" :disabled="$route.query.tab === 'content'">{{ $t('Content') }}</el-button>
			<el-button native-type="submit" type="primary" :loading="submitting">
				{{ $t('SAVE') }}
			</el-button>
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
  h2 strong {
	display: none;
  }
}

.buttons-group {
  padding: 0 10px;
  flex: 1;
  display: flex;
  justify-content: flex-end;

  .is-disabled {
	color: black;

	&:hover {
	  color: black;
	  cursor: default;
	}
  }
}
</style>
