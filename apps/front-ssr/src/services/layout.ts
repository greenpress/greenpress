import {LayoutItem} from '../components/types/layout';
import {Component} from 'vue';

export type ComponentsMap = { [key: string]: Component };

function getAllUniqueComponents(items: LayoutItem[]): { [key: string]: boolean } {
  return items.reduce((components: { [key: string]: boolean }, item) => {
    if (item.predefined) {
      components[item.component as string] = true;
    }
    if (item.children) {
      return {...components, ...getAllUniqueComponents(item.children)}
    }
    return components;
  }, {});
}

export async function getLazyLayoutComponents(layout: LayoutItem[]): Promise<ComponentsMap> {
  const components = getAllUniqueComponents(layout) as ComponentsMap & any;

  await Promise.all(Object.keys(components).map(componentName => {
    return import(`../components/layouts/${componentName}.vue`).then(component => {
      components[componentName] = component.default;
    })
  }));

  return components;
}
