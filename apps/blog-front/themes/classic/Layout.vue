<template>
  <div class="app">
    <Header />
    <nuxt />
    <Footer />
    <div id="fb-root"></div>
  </div>
</template>
<script>
  import Footer from './components/Footer'
  import Header from './components/Header'

  export default {
    components: {
      Header,
      Footer
    },
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400&display=swap'
        }
      ]
    }
  }
</script>
<style lang="scss">
  @import "colors";

  html {
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
  }

  html[dir="rtl"] {
    text-align: right;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }

  a {
    text-decoration: none;
    color: $mainColor;
  }

  a:hover {
    text-decoration: underline;
  }

  .app {
    display: flex;
    flex-direction: column;
  }


  p {
    padding: 10px 0;
  }

  blockquote {
    margin: 10px;
    padding: 10px;
    font-family: monospace;
    background-color: #000;
    color: #fff;
    border-radius: 5px;
    word-break: break-all;
    *, a {
      color: #fff;
    }
  }

  @media all and (min-width: 500px) {
    .app {
      margin: 0 auto;
      width: 100%;
    }
    .content, article {
      margin: 0 auto;
      width: 90%;
    }
  }

  @media all and (min-width: 1200px) {
    .app {
      margin: 0 auto;
    }
    .content, article {
      margin: 0 auto;
      width: 80%;
    }
  }
</style>
