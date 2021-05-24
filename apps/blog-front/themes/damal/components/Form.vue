<template>
<div class="box">
    <h2>{{ title }}</h2>
    <form @submit.prevent="$emit('submit')">
        <ul class="form-inputs">
            <slot></slot>
        </ul>
        <div class="bottom">
            <button class="btn" type="submit">{{ buttonTitle }}</button>
            <a :href="nextPage">{{ message }}</a>
        </div>
    </form>
</div>
</template>

<script>
import FormInput from "./FormInput";

export default {
    components: {
        FormInput,
    },
    props: {
        inputs: Array,
        title: String,
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

.box {
    margin: auto auto;
    padding: 0.125rem;
    width: 30rem;
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
    font-size: 32px;
    font-weight: 400;
    margin: 25px 0;
}

.box .btn {
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
    letter-spacing: 1px;
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
    position: relative;
    margin-left: 1.76rem;
}

.box a {
    color: grey;
}
</style>
