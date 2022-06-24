<template>
  <el-form @submit.native.prevent="updateMenu">
    <FormInput v-if="!$props.menu" title="Menu Name" :model-value="name" @input="name = $event"/>

    <MenuLinkInput v-for="(item, $index) in links" :value="item" :key="$index"
                   @removed="removeLink"
                   @changed="updateLink"/>
    <AddMore @click="addLink"/>
    <el-button native-type="submit">{{ $t('SAVE') }}</el-button>
  </el-form>
</template>
<script lang="ts" setup>
import FormInput from '@/modules/core/components/forms/FormInput.vue'
import MenuLinkInput from './MenuLinkInput.vue'
import {useMenuOperations} from '../compositions/menus'
import AddMore from '../../core/components/forms/AddMore.vue';

const props = defineProps({
  menu: String
});

const {links, name, updateMenu, removeLink, updateLink, addLink} = useMenuOperations(props.menu);
</script>
