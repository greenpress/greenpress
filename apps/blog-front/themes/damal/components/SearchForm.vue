<template>
  <form @submit.prevent="search">
    <label>
      <input :value="$route.query.q" ref="input" placeholder="Search Posts..">
    </label>
    <button>Search</button>
  </form>
</template>
<script>
  import { ref, useContext } from '@nuxtjs/composition-api'

  export default {
    setup () {
      const { app: { router } } = useContext()
      const input = ref(null)

      return {
        input,
        search () {
          router.push({
            name: 'search',
            query: {
              q: input.value.value
            }
          })
        }
      }
    }
  }
</script>
<style scoped>
  form {
    padding: 20px;
    display: flex;
  }

  label, input {
    width: 100%;
  }

  input, button {
    outline: #ddd;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
  }

  input {
    color: #a8a8a8;
    transition: color 0.2s ease-in-out;
  }

  input:focus {
    color: #000;
  }

  button {
    margin: 0 5px;
    cursor: pointer;
    background-color: #f6f6f6;
    transition: background-color 0.2s ease-in-out;
  }

  button:hover {
    background-color: #eee;
  }

  @media all and (max-width: 720px) {
    form {
      padding: 0 10px;
      width: 100%;
    }

    input, button {
      font-size: 12px;
      padding: 6px;
      border-radius: 3px;
    }
  }
</style>
