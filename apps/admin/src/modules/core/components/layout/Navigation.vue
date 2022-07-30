<template>
  <nav :class="{show: opened}">
    <div class="mobile-mask" @click="close"/>
    <router-link to="/" class="home-logo">
      <img alt="greenpress Admin Panel" src="../../../../assets/logo.png">
    </router-link>

    <el-menu router>
      <div v-if="microFrontends.top.length" class="nav-group">
        <h4>{{ $t('PLAY') }}</h4>
        <el-menu-item v-for="mf in microFrontends.top" :key="mf.route.path" :route="'/play/' + mf.route.path"
                      :index="'/play/' + mf.route.path">
          <span>{{ mf.name }}</span>
        </el-menu-item>
      </div>

      <div class="nav-group">
        <h4>{{ $t('CONTENT') }}</h4>
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <icon-document/>
            </el-icon>
            <span>{{ $t('Posts') }}</span>
          </template>
          <el-menu-item :route="{name: 'posts'}" index="/posts" :active="false">
            <span>{{ $t('Posts List') }}</span>
          </el-menu-item>
          <el-menu-item :route="{name: 'createPost'}" index="/posts/new">
            <span>{{ $t('Create Post') }}</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <icon-folder-opened/>
            </el-icon>
            <span>{{ $t('Pages') }}</span>
          </template>
          <el-menu-item :route="{name: 'categories'}" index="/categories">
            <span>{{ $t('Pages List') }}</span>
          </el-menu-item>
          <el-menu-item :route="{name: 'createCategory'}" index="/categories/new">
            <span>{{ $t('Create Page') }}</span>
          </el-menu-item>
        </el-sub-menu>
      </div>

      <div class="nav-group">
        <h4>{{ $t('LOOK AND FEEL') }}</h4>
        <el-menu-item :route="{name: 'layouts'}" index="/layouts">
          <el-icon>
            <icon-grid/>
          </el-icon>
          <span>{{ $t('Layouts') }}</span>
        </el-menu-item>
      </div>

      <div class="nav-group">
        <h4>{{ $t('COMPONENTS') }}</h4>

        <el-menu-item :route="{name: 'menus'}" index="/menus">
          <el-icon>
            <icon-menu/>
          </el-icon>
          <span>{{ $t('Menus') }}</span>
        </el-menu-item>
        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <icon-box/>
            </el-icon>
            <span>{{ $t('Content Boxes') }}</span>
          </template>
          <el-menu-item :route="{name: 'blocks'}" index="/blocks">
            <span>{{ $t('Boxes List') }}</span>
          </el-menu-item>
          <el-menu-item :route="{name: 'createBlock'}" index="/blocks/new">
            <span>{{ $t('Create Content Box') }}</span>
          </el-menu-item>
        </el-sub-menu>
      </div>

      <div class="nav-group">
        <h4>{{ $t('MANAGE') }}</h4>
        <el-menu-item :route="{name: 'storageList'}" index="/assets">
          <el-icon>
            <icon-files/>
          </el-icon>
          <span>{{ $t('Storage & Assets') }}</span>
        </el-menu-item>

        <el-menu-item v-if="isAdmin" :route="{name: 'users'}" index="/users">
          <el-icon>
            <icon-user/>
          </el-icon>
          <span>{{ $t('Users') }}</span>
        </el-menu-item>

        <el-menu-item :route="{name: 'drafts'}" index="/drafts">
          <el-icon>
            <icon-document-copy/>
          </el-icon>
          <span>{{ $t('Drafts') }}</span>
        </el-menu-item>

        <el-menu-item v-if="isAdmin" :route="{name: 'configurations'}" index="/configurations">
          <el-icon>
            <icon-setting/>
          </el-icon>
          <span>{{ $t('Configurations') }}</span>
        </el-menu-item>
      </div>

      <div class="nav-group">
        <h4>{{ $t('PLUGINS') }}</h4>
        <el-menu-item :route="{name: 'plugins'}" index="/plugins">
          <el-icon>
            <icon-sugar/>
          </el-icon>
          <span>{{ $t('Plugins List') }}</span>
        </el-menu-item>
      </div>

      <div v-if="microFrontends.bottom.length" class="nav-group">
        <h4>{{ $t('PLAY') }}</h4>
        <el-menu-item v-for="mf in microFrontends.top" :key="mf.route.path" :route="'/play/' + mf.route.path"
                      :index="'/play/' + mf.route.path">
          <span>{{ mf.name }}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </nav>
</template>

<script lang="ts" setup>
import {useRouter} from 'vue-router';
import {storeToRefs} from 'pinia';
import {usePluginsMicroFrontends} from '@/modules/plugins/store/plugins-microfrontends';
import {isAdmin} from '@/modules/core/store/auth';

const router = useRouter()
const {microFrontends} = storeToRefs(usePluginsMicroFrontends());

defineProps({opened: Boolean})
const emit = defineEmits(['close'])

const close = () => emit('close')

</script>
<style scoped lang="scss">
@import "../../../../style/colors";

$nav-width: 240px;

nav {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 1px 1px #eee;
  transition: width .2s linear;
  width: $nav-width;
  overflow-y: auto;
}

nav .el-menu, nav .el-menu-item:hover {
  --el-menu-hover-bg-color: var(--main-color-light);
}

.el-menu-item {
  padding: 0;
  margin: 5px;
  border-radius: 5px;
  line-height: 50px;
  height: 50px;
}

.el-sub-menu {
  margin: 5px;

  ::v-deep(.el-sub-menu__title) {
    padding: 0;
    border-radius: 5px;
    line-height: 50px;
    height: 50px;
  }
}

a:hover {
  border: none;
}

.mobile-mask {
  display: none;
}

.home-logo {
  display: block;
  padding: 5px 0 10px 0;
  height: 70px;
  align-self: center;
  text-align: center;
  background-color: #fff;
  transition: background 0.1s linear;
  width: $nav-width;
  position: sticky;
  top: 0;
  z-index: 2;

  img {
    max-width: 100%;
    max-height: 100%;
  }
}

@media (max-width: 600px) {
  nav {
    position: absolute;
    width: auto;
    left: -100%;
    top: 0;
    bottom: 0;
    overflow: hidden;
    transition: left 0.2s ease-in-out;
    z-index: 2;

    &.show {
      display: flex;
      left: 0;

      .mobile-mask {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
      }
    }
  }

  .home-logo {
    background: transparent;

    img {
      display: inline;
    }
  }
}

@media (min-width: 1200px) {
  nav {
    width: $nav-width;
  }

  nav .home-logo {
    background: transparent;
    width: $nav-width;
  }

  nav .home-logo img {
    display: inline-block;
  }
}

.nav-group {
  h4 {
    color: #a1a1a1;
    font-size: 13px;
    font-weight: normal;
    margin: 15px 0 5px;

    &:before {
      content: '';
      display: inline-block;
      vertical-align: middle;
      width: 15px;
      height: 1px;
      background-color: #a1a1a1;
      margin-inline-end: 5px;
    }
  }
}

.bottom {
  margin-top: auto;
}
</style>
