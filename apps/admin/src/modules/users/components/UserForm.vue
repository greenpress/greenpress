<template>
  <el-form @submit.native.prevent="submit">
    <FormInput title="Name" :model-value="fullName" @input="editedData.fullName = $event"/>
    <FormInput title="Email" :model-value="email" @input="editedData.email = $event"/>
    <el-form-item label="Password">
      <small>Leave empty to ignore changes</small>
      <el-input name="password"
                type="password"
                v-model="editedData.password"/>
    </el-form-item>
    <div v-if="!hideRoles">
      <el-form-item>
        <el-checkbox-group v-model="roles">
          <el-checkbox label="admin"></el-checkbox>
          <el-checkbox label="editor"></el-checkbox>
          <el-checkbox label="plugin"></el-checkbox>
          <el-checkbox label="user"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </div>
    <SaveButton :submitting="submitting"/>
  </el-form>
</template>
<script lang="ts">
import {computed, reactive} from 'vue'
import FormInput from '../../core/components/forms/FormInput.vue'
import {clearNulls} from '../../core/utils/clear-nulls'
import {useEditedInputs} from '../../core/compositions/edited-inputs'
import {IUser} from '../../core/store/types/user';
import SaveButton from '@/modules/core/components/forms/SaveButton.vue';

export default {
  components: {SaveButton, FormInput},
  props: {
    user: Object as () => IUser,
    hideRoles: Boolean,
    submitting: Boolean,
  },
  setup(props, {emit}) {
    const editedData = reactive({
      fullName: null,
      email: null,
      password: null,
      roles: props.user && props.user._id ? null : ['user'],
    });

    let roles;

    if (!props.hideRoles) {
      roles = computed<Array<string>>({
        get: () => editedData.roles || props.user.roles || [],
        set: (roles) => editedData.roles = roles
      });
    }

    return {
      editedData,
      ...useEditedInputs(editedData, props.user, ['fullName', 'email']),
      roles,
      submit() {
        emit('submitted', clearNulls(editedData))
      }
    }
  }
}
</script>
<style scoped lang="scss">

</style>
