<template>
	<label>
		<span>{{$t('Kind')}}:</span>
		<el-select :model-value="value" @change="emitChange">
			<el-option value="category" label="Category"/>
			<el-option value="post" label="Post"/>
			<el-option value="http" label="HTTP"/>
		</el-select>
	</label>
</template>
<script>
  export default {
    name: 'MenuKindInput',
    props: {
      value: String
    },
    setup(_, { emit }) {
      return {
        emitChange(event) {
          emit('change', event)
        }
      }
    }
  }
</script>
<style scoped lang="scss">
label {
	display: flex;
	flex-direction: column;
}
</style>
