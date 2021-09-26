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
  border-top: 2px solid $main-color;
  background: $negative-color;
  color: white;
  margin: 10px;
  padding: 10px;
  box-shadow: 0 10px 6px -6px #777;

  &:hover {
	opacity: 0.9;
  }

  ::v-deep(*) {
	color: white;
  }

  h4 {
	padding-bottom: 15px;
	font-size: 18px;
  }
}

.actions {
  > ::v-deep(*) {
	padding-inline-end: 10px;
  }
}
</style>
