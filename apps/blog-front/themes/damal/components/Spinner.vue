<template>
	<div class="spinner"></div>
</template>

<script>
  export default {
    name: 'Spinner'
  }
</script>

<style lang="scss" scoped>
	@import "../colors";

	@keyframes spin {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(359deg);
		}
	}

	.spinner {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		background-color: white;
		position: relative;
		overflow: hidden;
		animation: spin 5s linear infinite;

		&:before {
			content: ' ';
			position: absolute;
			z-index: 2;
			top: 50%;
			right: 50%;
			margin: -10px 0 -10px 0;
			width: 20px;
			height: 20px;
			border-radius: 50%;
			background-color: $mainColorOpacity;
		}

		&:after {
			content: ' ';
			position: absolute;
			z-index: 1;
			top: 0;
			bottom: 0;
			right: 0;
			left: 50%;
			background-color: $mainColor;
		}
	}
</style>
