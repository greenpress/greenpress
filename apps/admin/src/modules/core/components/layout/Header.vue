<template>
  <header :dir="$t('appDirection')">
    <el-button type="default" icon="el-icon-menu" class="btn" circle @click="open"/>
    <el-dropdown>
      <div class="el-dropdown-link user-welcome">
        <span v-html="greeting"/>
        <i class="el-icon-arrow-down"/>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <router-link :to="{name: 'updateProfile'}">{{t('Update profile')}}</router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </header>
</template>
<script lang="ts">
import { computed } from 'vue';
import { useAuth } from '../../compositions/authentication'
import { translate } from '../../../../plugins/i18n';

export default {
  name: 'Header',
  setup(_, { emit }) {
    const { user } = useAuth()

    const greeting = computed(() => translate('Hello {userName}', { userName: user.value?.name || '' }))

    return {
      greeting,
      t: translate,
      open: () => emit('open'),
    }
  }
}
</script>
<style scoped lang="scss">
@import "../../../../style/colors";

header {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: flex-start;
  height: 70px;
  background-color: $negative-color;
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

@media (max-width: 600px) {
  .btn {
    display: block;
  }
}
</style>
