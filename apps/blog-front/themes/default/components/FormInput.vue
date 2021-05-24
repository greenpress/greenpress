<template>
<div class="form-group field">
  <input v-model="input" :type="type" class="form-field" :placeholder="label" :name="name" required />
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
  setup(props, {
    emit
  }) {
    const {
      input,
      errors
    } = useInputValidator(
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

<style lang="scss" scoped>
$black: #111111;
$primary: #11998e;
$secondary: #38ef7d;
$gray: #9b9b9b;

.form-group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 50%;
}

.form-field {
  z-index: 10;
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid $gray;
  outline: 0;
  font-weight: 200;
  font-size: 1rem;
  color: $black;
  padding: 10px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown~.form-label {
    font-size: 0.8rem;
    cursor: text;
    top: 20px;
  }
}

.form-label {
  z-index: -10;
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 0.6rem;
  color: $gray;
}

.form-field:focus {
  ~.form-label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 0.6rem;
    color: $primary;
    font-weight: 700;
  }

  padding-bottom: 2px;
  border-width: 3px;
  border-image: linear-gradient(to right, $primary, $secondary);
  border-image-slice: 1;
}

/* reset input */
.form-field {

  &:required,
  &:invalid {
    box-shadow: none;
  }
}
</style>
