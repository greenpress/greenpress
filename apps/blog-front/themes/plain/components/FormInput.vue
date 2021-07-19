<template>
<div class="form-group field">
  <input v-model="input" :type="type" class="form-input" :placeholder="label" :name="name" required />
  <label class="form-label">{{ label }}</label>
  <ErrorDisplay v-if="input" :errors="errors" />
</div>
</template>

<script>
import useInputValidator from "~/compositions/useInputValidator";
import ErrorDisplay from "./ErrorDisplay";

export default {
  name: "FormInput",
  components: {
    ErrorDisplay,
  },
  props: {
    type: String,
    name: String,
    label: String,
    validators: Array,
  },
  setup(props, {emit}) {
    const {input, errors} = useInputValidator(
      props.value,
      props.validators || [],
      (value) => emit("input", value)
    );
    return {
      input,
      errors,
    };
  },
};
</script>