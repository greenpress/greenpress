<template>
	<div>
		<label>
			Text:
			<el-input :model-value="value.text" @input="emitChange('text', $event)"/>
		</label>
		<label>
			URL:
			<el-input :model-value="value.url" @input="emitChange('url', $event)"/>
		</label>
		<label>
			<el-checkbox :checked="value.newWindow" @input="emitChange('newWindow', $event)"/>
			Open in new window
		</label>
	</div>
</template>
<script>
  export default {
    name: 'PostSelector',
    props: {
      value: {
        type: Object, default: () => ({})
      }
    },
    setup(props, { emit }) {
      return {
        emitChange(key, value) {
          emit('change', {
            ...props.value,
            [key]: value
          })
        }
      }
    }
  }
</script>
<style scoped lang="scss">

</style>
