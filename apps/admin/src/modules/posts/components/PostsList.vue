<template>
  <div class="content-list">
    <GpItem v-for="post in posts" :key="post._id" class="content-item">
      <template v-slot:title>
        <router-link :to="{name: 'editPost', params: {postId: post._id}}">
          {{ post.title }}
        </router-link>
      </template>
      <router-link class="thumbnail" :to="{name: 'editPost', params: {postId: post._id}}">
        <img v-if="post.thumbnail" :src="post.thumbnail">
        <el-icon v-else>
          <icon-picture/>
        </el-icon>
      </router-link>
      <div class="metadata" v-if="post.category.path !== '-'">
        <router-link :to="{name: 'editCategory', params: {categoryPath: post.category.path}}">
          <el-icon>
            <icon-folder-opened/>
          </el-icon>
          {{ post.category.name }}
        </router-link>
      </div>
      <div class="small metadata">
        <span v-if="post.isPublic"><el-icon><icon-check/></el-icon> {{ $t('Public') }}</span>
        <span v-if="post.isPinned"><el-icon><icon-check/></el-icon> {{ $t('Pinned') }}</span>
        <span>Path: <a :href="getPath(post)" target="_blank"><strong>{{ getPath(post) }}</strong></a></span>
      </div>
      <template v-slot:actions>
        <a @click.prevent="remove(post._id)">
          <el-icon>
            <icon-delete/>
          </el-icon>
          {{ $t('Remove') }}</a>
      </template>
    </GpItem>
  </div>
</template>
<script lang="ts">
import {useConfirmAction} from '../../core/compositions/confirm-action'
import {useI18n} from 'vue-i18n';
import GpItem from '../../core/components/layout/GpItem.vue';
import {useRoute} from 'vue-router';
import {computed, toRefs, watch} from 'vue';
import {usePostsListStore} from '../store/posts-list';

export default {
  components: {GpItem},
  setup() {
    const route = useRoute();
    const queryParams = computed(() => route.name === 'posts' ? (route.query || {}) : null);
    const {posts, remove, fetchPosts} = toRefs(usePostsListStore())

    const {t} = useI18n();

    watch(queryParams, fetchPosts.value, {immediate: true});

    return {
      posts,
      remove: useConfirmAction(remove.value),
      t,
      getPath(post) {
        return '/' + post.category.path + '/' + post.path;
      }
    }
  }
}
</script>
<style scoped lang="scss">
</style>
