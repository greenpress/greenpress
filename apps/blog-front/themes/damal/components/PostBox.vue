<template>
  <section @click="navigate">
    <img v-if="post.thumbnail" :src="post.thumbnail" :alt="post.title"/>
    <div class="post-content">
      <Tags :tags="post.tags"/>
      <h3>
        <nuxt-link :to="getPostLinkParams(post)">
          {{ post.title }}
        </nuxt-link>
      </h3>
      <small class="created">{{ post.created | dateTime }}</small>
      <div class="short" v-html="post.short"></div>
    </div>
  </section>
</template>

<script>
import Tags from './Tags'
import { getPostLinkParams, usePostNavigation } from '~/compositions/post-link-params'

export default {
  components: { Tags },
  props: {
    post: Object,
  },
  setup (props) {
    const navigatePost = usePostNavigation()

    function navigate (e) {
      if (e.target.tagName.toLowerCase() !== 'a') {
        navigatePost(props.post)
      }
    }

    return {
      navigate,
      getPostLinkParams
    }
  }
}
</script>
<style scoped lang="scss">
@import "../colors";

$box-size: 210px;

section {
  position: relative;
  height: $box-size;
  overflow: hidden;
  margin: 3px;
  background-color: $mainColorOpacity;
  cursor: pointer;

  &:hover {
    .content {
      margin-top: $box-size / 4.3;
      height: $box-size / 1.3;
    }

    img {
      top: -2%;
      left: -2%;
      width: 104%;
    }
  }
}

img {
  top: -1%;
  left: -1%;
  width: 102%;
  position: absolute;
  z-index: -1;
  transition: all 0.2s ease-in-out;
}

.post-content {
  margin-top: $box-size / 2.4;
  padding: 10px;
  height: $box-size / 1.7;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;

  h3 {
    /deep/ a {
      color: #fff;
    }
  }

  small {
    font-size: 70%;
    color: #ddd;
  }

  .created {
    color: #ddd;
  }

  .short {
    color: #fff;
  }
}
</style>
