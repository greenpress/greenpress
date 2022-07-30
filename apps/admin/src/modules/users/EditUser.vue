<template>
  <div class="edit-post-page">
    <PageTitle title="Edit User" v-if="user" :item-name="user.name"/>
    <UserForm v-if="user" :user="user" @submitted="updateUser" :submitting="submitting"/>
  </div>
</template>
<script lang="ts" setup>
import {useEditUsers} from './compositions/users.js'
import UserForm from './components/UserForm.vue'
import PageTitle from '../core/components/semantics/PageTitle.vue'
import {useRoute} from 'vue-router'

const {user, updateUser, submitting} = useEditUsers(useRoute().params.userId);
</script>
