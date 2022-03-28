<template>
  <div class="edit-post-page">
    <PageTitle title="Update your profile"/>
    <UserForm v-if="user" :user="user" :hide-roles="true" :submitting="submitting" @submitted="submit"/>
  </div>
</template>
<script lang="ts" setup>
import UserForm from './components/UserForm.vue'
import PageTitle from '../core/components/semantics/PageTitle.vue'
import {useAuth} from '../core/compositions/authentication';
import {useSubmitting} from '../core/compositions/submitting';
import {updateProfile} from '../core/store/auth';

const {user} = useAuth();

const {submit, submitting} = useSubmitting((payload) => updateProfile(payload), {
  success: 'Your profile has been updated.',
  error: 'Failed to update your profile'
})
</script>
