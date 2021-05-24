<template>
  <div class="input-box">
    <input v-bind:type="type" v-bind:name="name" required v-model="input" />
    <label>{{ label }}</label>
    <ErrorDisplay v-if="input" :errors="errors" />
  </div>
</template>

<script>
  import useInputValidator from '~/compositions/useInputValidator'
  import ErrorDisplay from './ErrorDisplay'

  export default {
    name: 'FormInput',
    components: {
      ErrorDisplay
    },
    props: {
      type: String,
      name: String,
      label: String,
      validators: Array
    },
    setup (props, {
      emit
    }) {
      const {
        input,
        errors
      } = useInputValidator(
        props.value,
        props.validators || [],
        (value) => emit('input', value)
      )
      return {
        input,
        errors
      }
    }
  }
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    background-size: cover;
    font-family: sans-serif;
  }

  .input-box {
    position: relative;
    margin-left: 1.76rem;
    margin-bottom: 1.875rem;
  }

  .input-box input {
    width: 93%;
    padding: 0.625rem 10px;
    font-size: 1rem;
    letter-spacing: 0.062rem;
    border: 1px solid #ccc;
    background: transparent;
    border-radius: 4px;
  }

  .input-box label {
    position: absolute;
    top: 0;
    left: 10px;
    padding: 0.625rem 0;
    font-size: 1rem;
    color: gray;
    pointer-events: none;
    transition: 0.5s;
  }

  .input-box input:focus ~ label,
  .input-box input:valid ~ label,
  .input-box input:not([value=""]) ~ focus ~ label {
    top: -1.125rem;
    left: 10px;
    color: #42b983;
    font-size: 0.75rem;
    background-color: #fff;
    height: 10px;
    padding-left: 5px;
    padding-right: 5px;
  }

  .input-box input:focus {
    outline: none;
    border: 2px solid #42b983;
  }

  input[type="submit"] {
    margin-right: 1.76rem;
    margin-bottom: 2rem;
    border: none;
    outline: none;
    color: #fff;
    background-color: #42b983;
    padding: 0.625rem 1.25rem;
    cursor: pointer;
    border-radius: 0.312rem;
    font-size: 1rem;
    float: right;
  }

  input[type="submit"]:hover {
    background-color: #42b983;
    box-shadow: 0 1px 1px 0 rgba(66, 185, 131, 0.45),
    0 1px 3px 1px rgba(66, 185, 131, 0.3);
  }
</style>
