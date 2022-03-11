<template>
	<div class="content-editor">
		<div class="content-options">
			<el-select class="change-type" :model-value="state" @change="changeType" size="mini">
				<el-option value="editor" label="Content Editor"/>
				<el-option value="html" label="HTML Editor"/>
				<el-option value="view" label="View"/>
			</el-select>
			<el-button type="danger"
			           native-type="button"
			           size="mini"
			           @click="removeContent"><el-icon><icon-delete/></el-icon></el-button>
		</div>
		<div>
			<gp-editor v-if="state === 'editor'" :model-value="value" @input="changeContent" :config="editorConfig"/>
			<textarea v-else-if="state === 'html'" :value="value" @input="changeContent($event.target.value)"/>
			<iframe v-else-if="state === 'view'" :src="iFrameSrc"/>
		</div>
	</div>
</template>
<script lang="ts">
  import { computed } from 'vue'
  import { useEditorConfig } from '../compositions/gp-editor'

  export default {
    name: 'PostContentEditor',
    props: {
      value: String,
      state: String
    },
    setup(props, { emit }) {
      return {
        ...useEditorConfig(),
        iFrameSrc: computed(() => 'data:text/html, ' + props.value),
        changeType: ($event) => emit('typeChange', $event),
        changeContent: ($event) => emit('contentChange', $event),
        removeContent: () => emit('remove', props.value)
      }
    }
  }
</script>
<style scoped lang="scss">
	@import "../../../style/colors";

	.content-editor {
		display: flex;
		flex-direction: column;
	}

	textarea, iframe {
		width: 100%;
		min-height: 300px;
		display: block;
		padding: 10px;
		border: 1px solid $border-color;
	}

	textarea {
		font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
	}

	.content-options {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin: 10px 30px 2px 0;

		> * {
			margin-inline-start: 5px;
		}
	}

</style>
