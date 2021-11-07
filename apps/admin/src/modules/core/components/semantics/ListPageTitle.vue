<template>
  <h1>
    <span>{{ $t(title) }}</span>
    <el-button type="primary" icon="el-icon-edit" @click="$router.push({name: createRoute})" />
  </h1>
</template>
<script lang="ts">
  export default {
    name: 'ListPageTitle',
    props: {
      title: String,
      createRoute: String
    }
  }
</script>

<style scoped lang="scss">
  h1 {
    span {
      margin-inline-start: 20px;
    }

    > * {
      vertical-align: middle;
    }
  }
</style>
