<template>
  <header :dir="$t('appDirection')">
    <div class="welcome">
      <el-button type="default" class="btn" circle @click="open">
        <el-icon>
          <icon-menu/>
        </el-icon>
      </el-button>

      <el-dropdown>
        <div class="el-dropdown-link user-welcome">
          <span v-html="greeting"/>
          <el-icon>
            <icon-arrow-down/>
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <router-link :to="{name: 'updateProfile'}">{{ $t('Update profile') }}</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </div>
    <router-link :to="{name: 'createPost'}" class="quick-action">
      <el-icon>
        <icon-document/>
      </el-icon>
    </router-link>
    <router-link :to="{name: 'createCategory'}" class="quick-action">
      <el-icon>
        <icon-folder-opened/>
      </el-icon>
    </router-link>
  </header>
</template>
<script lang="ts" setup>
import {computed} from 'vue';
import {useAuth} from '../../compositions/authentication'
import {translate} from '../../../../plugins/i18n';
const emit = defineEmits(['open']);
const {user} = useAuth()

const greeting = computed(() => translate('Hello {userName}', {userName: user.value?.name || ''}))

const open = () => emit('open')
</script>
<style scoped lang="scss">
@import "../../../../style/colors";

header {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: flex-start;
  height: 50px;
  align-items: center;
  margin: 15px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 2px 2px #eee;
}

.welcome {
  margin-right: auto;
  display: flex;
  align-items: center;
}

.user-welcome {
  padding-inline-start: 10px;
  color: $main-color;
  font-size: 16px;

  > i {
    margin-inline-start: 5px;
  }
}

.btn {
  margin-inline-start: 10px;
  font-size: 18px;
  display: none;
}

a {
  text-decoration: none;
  border: 0;
  text-align: right;
  height: 100%;
  cursor: pointer;
  color: $main-color;

  &:hover {
    text-decoration: underline;
  }
}

.actions {
  margin-inline-start: auto;
  margin-inline-end: 10px;
}

.quick-action {
  font-size: 1.3em;
  padding: 5px;
  height: auto;
  border: 0;
}

.quick-action:hover {
  color: white;
}

@media (max-width: 600px) {
  .btn {
    display: block;
  }
}
</style>
