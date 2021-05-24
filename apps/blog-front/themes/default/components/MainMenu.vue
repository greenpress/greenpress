<template>
  <div class="menu-wrapper">
    <div class="menu">
      <menuLink v-for="(item, index) of menu" :link="item" :key="index" class="link" />
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

<style scoped>
  .menu-wrapper {
    display: block;
    overflow: auto;
  }

  .menu {
    flex-wrap: nowrap;
    display: flex;
  }

  .link /deep/ a {
    display: block;
    padding: 5px 10px;
    height: 35px;
    white-space: nowrap;
  }

  .link /deep/ a.nuxt-link-active,
  .link /deep/ a:hover {
    border-bottom: 1px solid #03414c;
    text-decoration: none;
  }
</style>
