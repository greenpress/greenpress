<template>
  <el-dialog
      v-model="isOpen"
      title="Edit Component"
      width="80%"
      destroy-on-close
      center>
    <template v-if="canHaveClasses">
      <h3>{{ $t('Classes') }}</h3>
      <FormInput v-model="classes"/>
      <div v-if="optionalClasses.length" class="optional-classes">
        <strong>{{ $t('Available classes') }}</strong>
        <span v-for="item in optionalClasses"
              class="label"
              :key="item.className"
              :data-active.attr="item.exists" @click="toggleClass(item)">{{ item.className }}</span>
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
import {computed, ref, watch} from 'vue';
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
const classes = ref(props.layoutItem.content.classes || '');
const canHaveClasses = props.layoutItem.content.component !== 'link';

const classesArr = computed(() => classes.value.split(' '))

const optionalClasses = ref(canHaveClasses ? getOptionalClasses() : null)

function isClassExists(className: string) {
  return classesArr.value.includes(className)
}

function getOptionalClasses(): Array<{ className: string, exists: boolean }> {
  return Array.from(new Set(Object.entries(props.styles).reduce((all, [selector, classes]) => {
    if (props.layoutItem.target.contentEl.matches(selector)) {
      return all.concat(classes);
    }
    return all;
  }, [])))
      .map(className => {
        return {
          className,
          exists: isClassExists(className)
        }
      })
}

function toggleClass(item) {
  item.exists = isClassExists(item.className);
  if (item.exists) {
    classes.value = classesArr.value.filter(cls => cls !== item.className).join(' ');
  } else {
    classes.value += ' ' + item.className;
  }
  item.exists = !item.exists;
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

[centered] span {
  margin-bottom: 22px;
}

.optional-classes {
  margin-bottom: 20px;
}

.optional-classes .label {
  margin: 0 5px;
  padding: 5px;
  border-radius: 4px;
  background-color: #eee;
  cursor: pointer;
}

.optional-classes .label[data-active="true"] {
  background-color: #c4ecd0;
}
</style>
