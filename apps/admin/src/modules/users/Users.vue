<template>
  <div class="about-page">
    <ListPageTitle title="Users" create-route="createUser"/>
    <UsersList/>
  </div>
</template>
<script lang="ts" setup>
import UsersList from './components/UsersList.vue'
import ListPageTitle from '../core/components/semantics/ListPageTitle.vue'
</script>
