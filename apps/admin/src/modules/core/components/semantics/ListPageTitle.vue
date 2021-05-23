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
      margin-right: 20px;

      @at-root [dir="rtl"] #{&} {
        margin-left: 20px;
        margin-right: 0;
      }
    }

    > * {
      vertical-align: middle;
    }
  }
</style>
