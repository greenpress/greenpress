<template>
	<div class="category-page" v-if="config">
		<PageTitle title="Edit Configuration" :item-name="$t(config.key)"/>
		<ConfigurationForm :metadata="config.metadata" :submitting="submitting" @save="submit"/>
	</div>
</template>
<script>
  import { useSubmitting } from '../core/compositions/submitting'
  import { useEditConfiguration } from './compositions/configurations'
  import PageTitle from '../core/components/semantics/PageTitle.vue'
  import ConfigurationForm from './components/ConfigurationForm.vue'
	import { useRoute } from 'vue-router'

  export default {
    name: 'EditConfiguration',
    components: { ConfigurationForm, PageTitle },
    setup() {
			const { params } = useRoute()
      const { config, updateConfiguration } = useEditConfiguration(params.key)

      const { submitting, submit } = useSubmitting(
        (metadata) => updateConfiguration({ metadata }),
        { success: 'Configurations updated successfully', error: 'Failed to updated configurations' })

      return {
        config,
        submit,
        submitting
      }
    }
  }
</script>
