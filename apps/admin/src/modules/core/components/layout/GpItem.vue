<template>
  <div class="gp-item">
    <h4 v-if="$slots.title">
      <slot name="title"/>
    </h4>
    <slot/>
    <div class="actions small">
      <slot name="actions"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../../../style/colors";

.gp-item {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 1px 1px #ccc;
  margin: 20px;
  display: flex;
  flex-direction: column;

  &:hover {
    opacity: 0.9;
  }

  ::v-deep(*) {
  }

  h4 {
    padding: 10px 10px;
    font-size: 18px;
  }
}

.metadata {
  margin: 10px;
}

.actions {
  margin: auto 10px 10px 10px;
  > ::v-deep(*) {
    padding-inline-end: 10px;
  }
}
</style>
