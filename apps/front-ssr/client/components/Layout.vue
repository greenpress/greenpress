<template>
  <div :class="kind">
    <LayoutItems v-if="layout" :items="layout" :internals="internalComponents"/>
  </div>
</template>

<script lang="ts">
import {computed} from 'vue';
import {useHead} from '@vueuse/head';
import {LayoutItem} from './types/layout';
import {getLazyLayoutComponents} from '../services/layout';
import LayoutItems from './LayoutItems.vue';
import {IAppConfiguration} from '@greenpress/sdk/dist/configurations';

export default {
  name: 'Layout',
  components: {LayoutItems},
  props: {
    kind: String,
    config: Object as () => IAppConfiguration,
    layout: Array as () => LayoutItem[],
    connectedData: Array as () => { kind: string, identifier: string, data: any, reference: string }[]
  },
  async setup(props: { layout: LayoutItem[], connectedData: any[], config: IAppConfiguration }) {

    const head = computed(() => {
      const config = props.config || {};

      const links = [
        {rel: 'icon', href: 'data:image/x-icon;,'}
      ];
      if (config.themeStylesUrl) {
        links.push({
          rel: 'stylesheet',
          href: config.themeStylesUrl
        })
      }

      return {
        title: `${config.name} - ${config.slogan}`,
        htmlAttrs: {dir: config.direction, lang: config.language},
        meta: [
          {name: 'keywords', content: config.keywords},
          {name: 'description', content: config.description},
        ],
        links,
      }
    });

    useHead(head);

    const references = new Map<string, any>();
    props.connectedData.forEach(({reference, data}) => references.set(reference, data));

    const internalComponents = await getLazyLayoutComponents(props.layout, references);

    return {internalComponents}
  }
}
</script>
<style scoped>

</style>
