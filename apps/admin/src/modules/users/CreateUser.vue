<template>
  <div>
    <PageTitle title="Create User"/>
    <UserForm :user="{}" @submitted="save"/>
  </div>
</template>
<script lang="ts" setup>
import {useRouter} from 'vue-router';
import {useCreateUser} from './compositions/users'
import UserForm from './components/UserForm.vue'
import PageTitle from '../core/components/semantics/PageTitle.vue'

const router = useRouter()

const {createUser} = useCreateUser()

const save = async user => {
  const {_id} = await createUser(user)
  await router.push({name: 'editUser', params: {userId: _id}})
};
</script>
