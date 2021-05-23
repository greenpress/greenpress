<template>
	<div class="edit-post-page">
		<PageTitle title="Edit User" v-if="user" :item-name="user.name"/>
		<UserForm v-if="user" :user="user" @submitted="updateUser"/>
	</div>
</template>
<script>
  import { useEditUsers } from './compositions/users'
  import UserForm from './components/UserForm.vue'
  import PageTitle from '../core/components/semantics/PageTitle.vue'
	import { useRoute } from 'vue-router'

  export default {
    name: 'EditUser',
    components: { PageTitle, UserForm },
    setup() {
      return useEditUsers(useRoute().params.userId)
    }
  }
</script>
