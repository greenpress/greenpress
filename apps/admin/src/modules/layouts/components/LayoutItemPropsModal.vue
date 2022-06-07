<template>
  <el-dialog
      v-model="isOpen"
      title="Edit Component Props"
      width="80%"
      destroy-on-close
      center>
    <div v-for="(_, index) in propsArr" :key="index" centered>
      <span><el-icon @click="removeRow(index)" class="icon"><icon-delete/></el-icon></span>
      <FormInput class="name-input" v-model="propsArr[index][0]"/>
      <span>:</span>
      <FormInput class="value-input" v-model="propsArr[index][1]"/>
    </div>
    <div centered>
      <el-icon class="icon" @click="propsArr.push(['', ''])"><icon-plus/></el-icon>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">Cancel</el-button>
        <el-button type="primary" @click="submit">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue';
import FormInput from '@/modules/core/components/forms/FormInput.vue';

const props = defineProps({
  itemProps: {
    type: Object as () => { [key: string]: any },
    default: () => ({})
  }
});

const emit = defineEmits(['cancel', 'submit']);

const isOpen = ref(true);

const propsArr = ref(Object.entries(props.itemProps));

function removeRow(index) {
  propsArr.value.splice(index, 1);
}


function cancel() {
  emit('cancel');
}

watch(isOpen, (isOpen) => !isOpen && cancel())

function submit() {
  emit('submit', Object.fromEntries(propsArr.value));
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
