<template>
  <h1>
    <span>{{ $t(title) }}</span>
    <el-button type="primary" v-if="createRoute" @click="$router.push({name: createRoute})">
      <el-icon>
        <icon-edit/>
      </el-icon>
    </el-button>
  </h1>
</template>
<script lang="ts" setup>

defineProps({
  title: String,
  createRoute: String
})
</script>

<style scoped lang="scss">
h1 {
  span {
    margin-inline-end: 20px;
  }

  > * {
    vertical-align: middle;
  }
}
</style>
