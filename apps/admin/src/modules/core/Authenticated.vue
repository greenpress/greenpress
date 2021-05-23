<template>
  <div class="admin-panel" v-if="isLoaded">
    <Navigation class="navigation" :opened="navigationOpened" @close="navigationOpened = false" />
    <div class="admin-content">
      <Header class="header" @open="navigationOpened = true" />
      <router-view class="main" />
      <AssetsDetailsPanel />
    </div>
  </div>
</template>

<script lang="ts">
  import { ref, defineComponent } from 'vue'
  import { useAuthenticatedIntercept } from './compositions/authentication'
  import Header from './components/layout/Header.vue'
  import Navigation from './components/layout/Navigation.vue'
  import AssetsDetailsPanel from '@/modules/assets/components/AssetsDetailsPanel/AssetsDetailsPanel.vue'
	import { useRouter } from 'vue-router'

  export default defineComponent({
    name: 'Authenticated',
    components: { AssetsDetailsPanel, Header, Navigation },
    setup() {
			const router = useRouter()

			const navigationOpened = ref(false)

      router.afterEach(() => navigationOpened.value = false)

      return {
        ...useAuthenticatedIntercept(),
        navigationOpened
      }
    }
  })
</script>
<style scoped lang="scss">
  .admin-panel {
    display: flex;

    width: 100%;
    height: 100%;
    flex-direction: row;
  }

  .admin-content {
    display: flex;
    flex-direction: column;
    flex: 1;

    .main {
      flex: 1;
      overflow: auto;
    }
  }

  @media (max-width: 600px) {
    .admin-panel {
      flex-direction: column;
    }
  }
</style>
