<template>
  <el-dialog
      v-model="isOpen"
      title="Edit Component Props"
      width="80%"
      destroy-on-close
      center>
    <template v-if="canHaveClasses">
      <h3>{{ $t('Classes') }}</h3>
      <FormInput v-model="classes"/>
      <div v-if="optionalClasses.length">
        <strong>{{$t('Available classes')}}</strong>
        <span v-for="cls in optionalClasses">{{cls}}</span>
      </div>
    </template>
    <h3>{{ $t('Properties') }}</h3>
    <div v-for="(_, index) in propsArr" :key="index" centered>
      <span><el-icon @click="removeRow(index)" class="icon"><icon-delete/></el-icon></span>
      <FormInput class="name-input" v-model="propsArr[index][0]"/>
      <span>:</span>
      <FormInput class="value-input" v-model="propsArr[index][1]"/>
    </div>
    <div centered>
      <el-icon class="icon" @click="propsArr.push(['', ''])">
        <icon-plus/>
      </el-icon>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">{{ $t('Cancel') }}</el-button>
        <el-button type="primary" @click="submit">{{ $t('Confirm') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue';
import FormInput from '@/modules/core/components/forms/FormInput.vue';
import {StylesMatches} from '@/modules/layouts/compositions/layout-styles';
import {IOnCreateEventDetail} from '@greenpress/view-builder/src';

const props = defineProps({
  layoutItem: Object as () => IOnCreateEventDetail,
  styles: Object as () => StylesMatches
});

const emit = defineEmits(['cancel', 'submit']);

const isOpen = ref(true);

const propsArr = ref(Object.entries(props.layoutItem.content.props || {}));
const classes = ref(props.layoutItem.content.classes);
const canHaveClasses = props.layoutItem.content.component !== 'link';

let optionalClasses;
if (canHaveClasses) {
  optionalClasses = Array.from(new Set(Object.entries(props.styles).reduce((all, [selector, classes]) => {
    if (props.layoutItem.target.contentEl.matches(selector)) {
      return all.concat(classes);
    }
    return all;
  }, [])))
}


function removeRow(index) {
  propsArr.value.splice(index, 1);
}

function cancel() {
  emit('cancel');
}

watch(isOpen, (isOpen) => !isOpen && cancel())

function submit() {
  emit('submit', {props: Object.fromEntries(propsArr.value), classes: classes.value});
}
</script>

<style scoped>
[centered] {
  gap: 10px;
  align-items: center;
}

.icon {
  cursor: pointer;
}

.name-input {
  flex: 1;
}

.value-input {
  flex: 2;
}

span {
  margin-bottom: 22px;
}
</style>
