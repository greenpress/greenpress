<template>
	<table>
		<thead>
		<tr>
			<th>{{$t('Name')}}</th>
			<th>{{$t('Email')}}</th>
			<th>{{$t('Roles')}}</th>
			<th></th>
		</tr>
		</thead>
		<tbody>
		<tr v-for="user in users" :key="user._id">
			<td>
				<router-link :to="{name: 'editUser', params: {userId: user._id}}">
					{{user.name}}
				</router-link>
			</td>
			<td>
				<a :href="user.email">{{user.email}}</a>
			</td>
			<td>{{join(user.roles)}}</td>
			<td>
				<a @click.prevent="remove(user)">
					<el-icon><icon-delete/></el-icon>
				</a>
			</td>
		</tr>
		</tbody>
	</table>
</template>
<script lang="ts" setup>
import { useUsersList, useRemoveUser } from '../compositions/users'

const { users } = useUsersList()
const { remove } = useRemoveUser((id) => {
users.value = users.value.filter(user => user._id !== id)
})

const join = (arr) => arr.join(', ')
</script>
