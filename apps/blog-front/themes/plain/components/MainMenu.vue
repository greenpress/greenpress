<template>
  <div class="main-menu-wrapper">
    <div class="main-manu">
      <MenuLink v-for="(item, index) of menu" :link="item" :key="index" class="menu-link" />
    </div>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  import { name, GETTERS } from '~/store/menus/consts'
  import MenuLink from '~/components/MenuLink'

  const { mapGetters } = createNamespacedHelpers(name)

  export default {
    components: {
      MenuLink
    },
    computed: {
      ...mapGetters({
        menu: GETTERS.MAIN_MENU_LINKS
      })
    }
  }
</script>