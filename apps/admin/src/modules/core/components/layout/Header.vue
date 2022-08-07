<template>
  <header :dir="$t('appDirection')">
    <SearchForm/>
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
            <el-dropdown-item @click="logout">
              {{ $t('Logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </div>
  </header>
</template>
<script lang="ts" setup>
import {computed} from 'vue';
import {useAuth} from '../../compositions/authentication'
import {translate} from '@/plugins/i18n';
import SearchForm from '@/modules/core/components/layout/SearchForm.vue';
import {useRouter} from 'vue-router';
const emit = defineEmits(['open']);
const {user, logout: logoutApi} = useAuth()
const router = useRouter()

const greeting = computed(() => translate('Hello {userName}', {userName: user.value?.fullName || ''}))

const open = () => emit('open')

const logout = async () => {
  await logoutApi()
  router.push('login')
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
  height: 62px;
  align-items: center;
  margin: 15px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 2px 2px #eee;
}

.welcome {
  display: flex;
  align-items: center;
}

.user-welcome {
  padding-inline-end: 10px;
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
