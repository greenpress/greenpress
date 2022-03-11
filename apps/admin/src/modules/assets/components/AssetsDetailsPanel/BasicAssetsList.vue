<template>
	<div v-if="loaded" class="assets-list">
		<div v-for="asset in assets" :key="asset.identifier" class="asset-box">
			<img v-if="asset.type === 'image'" :src="asset.publicUrl"/>
			<icon-warning-outline v-else/>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { getAssetInStorage } from '../../compositions/assets'

const props = defineProps({
	storage: {
		type: String,
		required: true
	},
	identifier: {
		type: String,
		default: '/'
	}
})

const loaded = ref(false)
const assets = ref([])

watch(() => props.storage + props.identifier, async () => {
	loaded.value = false
	try {
		assets.value = await getAssetInStorage(props.storage, props.identifier)
	} finally {
		loaded.value = true
	}
}, {immediate: true})
</script>
<style scoped>
.assets-list {
	overflow: auto;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;
}

.asset-box {
	margin: 1%;
	width: 30%;
	height: 120px;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: background-color 0.1s ease-in-out;
	cursor: move;
}

.asset-box:hover {
	background-color: #e1e1e1;
}

img {
	max-width: 100%;
}

i {
	font-size: 36px;
}
</style>
