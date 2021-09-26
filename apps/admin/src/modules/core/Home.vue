<template>
	<div class="home">
		<router-link :to="{name: 'createPost'}">
			<i class="el-icon-document"/>
			<h3>{{ $t('Create Post') }}</h3>
		</router-link>
		<router-link :to="{name: 'createCategory'}">
			<i class="el-icon-folder-opened"/>
			<h3>{{ $t('Create Category') }}</h3>
		</router-link>
		<router-link :to="{name: 'editConfiguration', params: {key: 'app-configuration'}}">
			<i class="el-icon-setting"/>
			<h3>{{ $t('Edit website configuration') }}</h3>
		</router-link>
	</div>
</template>

<script lang="ts">
export default {
	name: 'Home',
}
</script>
<style scoped lang="scss">
@import "../../style/colors";

.home {
  padding-top: 2%;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

@media screen and (min-width: 1200px) {
  .home {
	padding: 2%;
  }
}

.home i {
  font-size: 36px;
}

.home > a {
  flex: 1;
  padding: 10%;
}

.home > a:hover {
  text-decoration: none;
  background: $secondary-color;
	color: white;
}
</style>
