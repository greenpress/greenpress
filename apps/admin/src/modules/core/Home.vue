<template>
  <div class="home">
    <GpItem>
      <template v-slot:title>
        {{ $t('Common operations') }}
      </template>

      <div class="content">
        <router-link :to="{name: 'createPost'}">
          <h3>
            <el-icon>
              <icon-document/>
            </el-icon>
            {{ $t('Create Post') }}</h3>
        </router-link>

        <router-link :to="{name: 'createCategory'}">
          <h3>
            <el-icon>
              <icon-folder-opened/>
            </el-icon>
            {{ $t('Create Category') }}</h3>
        </router-link>

        <router-link :to="{name: 'editConfiguration', params: {key: 'app-configuration'}}">
          <h3>
            <el-icon>
              <icon-setting/>
            </el-icon>
            {{ $t('Edit website configuration') }}</h3>
        </router-link>
      </div>
    </GpItem>

    <GpItem>
      <template v-slot:title>
        {{ $t('Information') }}
      </template>
      <h3 v-if="!loadingPosts">{{ t('{amount} Posts', { amount: posts.length}, posts.length) }}</h3>
      <h3 v-if="!loadingBlocks">{{ t('{amount} Blocks', { amount: blocks.length}, blocks.length) }}</h3>
    </GpItem>
  </div>
</template>
<style scoped lang="scss">
@import "../../style/colors";

.home {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
}

@media screen and (min-width: 1200px) {
  .home {
    padding: 0 2%;
  }
}

.home i {
  font-size: 24px;
}

.home > * {
  width: 30%;
  margin: 20px;
  border: none;
}

h3 {
  padding: 10px;
  font-weight: normal;
}

h3 > * {
  vertical-align: middle;
}

.content {
  padding: 20px;
}
</style>
<script setup lang="ts">
import GpItem from '@/modules/core/components/layout/GpItem.vue';
import {usePostsListStore} from '@/modules/posts/store/posts-list';
import {toRefs} from 'vue';
import {useI18n} from 'vue-i18n';
import {useBlocksList} from '@/modules/blocks/store/blocks-list';

const {loading: loadingPosts, posts, fetchPosts} = toRefs(usePostsListStore())

const {loading: loadingBlocks, blocks} = toRefs(useBlocksList())

const {t} = useI18n();

fetchPosts.value();

</script>
