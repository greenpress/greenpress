<template>
<div class="form-wrapper">
  <h2>Welcome</h2>
  <form @submit.prevent="$emit('submit')">
    <ul class="form-inputs">
      <slot></slot>
    </ul>
    <div class="form-buttons">
      <button class="submit-btn" type="submit">{{ buttonTitle }}</button>
      <a class="link" :href="nextPage">{{ message }}</a>
    </div>
  </form>
</div>
</template>

<script>
import FormInput from "./FormInput";
import Logo from "./Logo";

export default {
  components: {
    FormInput,
    Logo,
  },
  props: {
    inputs: Array,
    buttonTitle: String,
    message: String,
    nextPage: String,
  },
};
</script>