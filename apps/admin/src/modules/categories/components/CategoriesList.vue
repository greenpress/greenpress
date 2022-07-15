<template>
  <div>
    <CreateHomePage v-if="noHomePage"/>
    <div class="content-list">
      <GpItem v-for="category in categories" :key="category._id" class="content-item">
        <template v-slot:title>
          <router-link :to="{name: 'editCategory', params: {categoryPath: category.path}}">
            {{ category.name }}
          </router-link>
        </template>
        <router-link v-if="category.thumbnail" class="thumbnail"
                     :to="{name: 'editCategory', params: {categoryPath: category.path}}">
          <img :src="category.thumbnail">
        </router-link>
        <div class="small metadata">
          <span v-if="category.isPublic"><el-icon><icon-check/></el-icon> {{ $t('Public') }}</span>
          <span v-if="!category.homePage">Path:
            <a :href="'/' + category.path" target="_blank"><strong>{{ category.path }}</strong></a></span>
        </div>
        <template v-slot:actions>
          <a v-if="!category.homePage" @click.prevent="askBeforeRemove(category)">
            <el-icon>
              <icon-delete/>
            </el-icon>
            {{ $t('Remove') }}</a>
          <router-link v-if="!category.homePage" :to="{name: 'posts', query: {category: category.path}}">
            <el-icon>
              <icon-document/>
            </el-icon>
            {{ $t('Posts') }}
          </router-link>
        </template>
      </GpItem>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {computed} from 'vue'
import {useCategoriesList} from '../compositions/categories'
import {useConfirmAction} from '../../core/compositions/confirm-action'
import CreateHomePage from './CreateHomePage.vue'
import GpItem from '../../core/components/layout/GpItem.vue';

const {categories, removeCategory} = useCategoriesList()

const askBeforeRemove = useConfirmAction(removeCategory);
const noHomePage = computed(() => !categories.value.some(category => category.path === '-'));
</script>
<style scoped lang="scss">
</style>
