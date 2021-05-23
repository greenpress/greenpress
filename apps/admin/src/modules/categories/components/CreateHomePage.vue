<template>
  <p>It seems like you don't have an home page. <a @click="create">Click here to create your home page</a>!</p>
</template>
<script>
  import { createCategory } from '@/modules/categories/compositions/categories.ts'
	import { useRouter } from 'vue-router'

  export default {
    name: 'CreateHomePage',
    setup() {
      const router = useRouter()
      return {

        create: async () => {
          await createCategory({ path: '-' })
					router.push({
            name: 'editCategory',
            params: { categoryPath: '-', content: '<p>Welcome to my website!</p>' }
          })
        }
      }
    }
  }
</script>
<style scoped>
  p {
    padding: 10px;
  }
  a {
    font-weight: bold;
    cursor: pointer;
  }
</style>
