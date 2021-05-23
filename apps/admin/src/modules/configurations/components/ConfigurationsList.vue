<template>
	<div>
		<table>
			<thead>
			<tr>
				<th>{{$t('Name')}}</th>
				<th>{{$t('Public')}}</th>
				<th>{{$t('Description')}}</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="config in list" :key="config.key">
				<td>
					<router-link :to="{name: 'editConfiguration', params: {key: config.key}}">{{$t(config.key)}}
					</router-link>
				</td>
				<td><i v-if="config.public" class="el-icon-check"/></td>
				<td>{{config.description}}</td>
			</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
  import { useConfigurationsList } from '../compositions/configurations'

  export default {
    name: 'ConfigurationsList',
    setup() {
      return useConfigurationsList()
    }
  }
</script>
<style scoped lang="scss">
</style>
