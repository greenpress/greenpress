import {LayoutItem} from '../components/types/layout';
import {Component} from 'vue';

export type ComponentsMap = { [key: string]: Component };

function getAllUniqueComponents(items: LayoutItem[], references: Map<string, any>): { [key: string]: boolean } {
  return items.reduce((components: { [key: string]: boolean }, item) => {
    if (item.predefined) {
      components[item.component as string] = true;
    }
    if (item.children) {
      return {...components, ...getAllUniqueComponents(item.children, references)}
    }
    if (typeof item.props === 'object') {
      for (const prop in item.props) {
        const refer = item.props[prop];
        if (references.has(refer)) {
          item.props[prop] = references.get(refer);
        }
      }
    }
    return components;
  }, {});
}

export async function getLazyLayoutComponents(layout: LayoutItem[], references: Map<string, any>): Promise<ComponentsMap> {
  const components = getAllUniqueComponents(layout, references) as ComponentsMap & any;

  await Promise.all(Object.keys(components).map(componentName => {
    return import(`../components/layouts/${componentName}.vue`).then(component => {
      components[componentName] = component.default;
    })
  }));

  return components;
}
