<template>
<div class="box">
  <h2>Welcome</h2>
  <img class="logo" :src="'/logo.png'" alt="logo" />
  <form @submit.prevent="$emit('submit')">
    <ul class="form-inputs">
      <slot></slot>
    </ul>
    <div class="bottom">
      <button class="btn" type="submit">{{ buttonTitle }}</button>
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

ul {
  list-style-type: none;
}

form {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.box {
  display: flex;
  flex-direction: column;
  margin: auto auto;
  padding: 0.125rem;
  width: 20rem;
  max-width: 80%;
  box-sizing: border-box;
  border: 2px solid #dadce0;
  border-radius: 8px;
}

.box h2 {
  padding: 0;
  text-align: center;
  color: #202124;
  font-family: "Google Sans", sans-serif;
  font-size: 28px;
  font-weight: 400;
  margin-top: 25px;
}

.box .btn {
  margin-right: 1.76rem;
  border: none;
  outline: none;
  color: #fff;
  background-color: #42b983;
  padding: 0.625rem 1.25rem;
  cursor: pointer;
  border-radius: 0.312rem;
  font-size: 1rem;
  float: right;
  letter-spacing: 1px;
  margin: 1rem 2rem;
}

.box .btn:hover {
  background-color: #42b983;
  box-shadow: 0 1px 1px 0 rgba(66, 185, 131, 0.45),
    0 1px 3px 1px rgba(66, 185, 131, 0.3);
}

.box form {
  display: flex;
  flex-direction: column;
}

.box form .bottom {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
}

.box a {
  color: grey;
}

.form-inputs {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.form-inputs>* {
  width: 80%;
  padding: 0.2rem 0.5rem;
}

.link {
  text-align: center;
  margin-bottom: 1rem;
}

img {
  max-width: 100%;
  max-height: 100%;
  display: block;
  /* remove extra space below image */
}

.logo {
  width: 70px;
  margin: 0 auto;
  margin-top: 0.3rem;
}
</style>
