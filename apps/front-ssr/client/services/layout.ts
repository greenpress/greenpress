import {Component} from 'vue';
import {LayoutItem} from '../components/types/layout';

export type ComponentsMap = { [key: string]: Component };

function getAllUniqueComponents(items: LayoutItem[], references: Map<string, any>): { [key: string]: boolean } {
  return items.reduce((components: { [key: string]: boolean }, item) => {
    if (item.predefined) {
      components[item.component as string] = true;
    }
    if (typeof item.props === 'object') {
      for (const prop in item.props) {
        const refer = item.props[prop];
        console.log('refer', refer)
        if (references.has(refer)) {
          console.log('refer exists on connected data', refer)
          item.props[prop] = references.get(refer);
        }
      }
    }
    if (item.children && item.children.length) {
      return {...components, ...getAllUniqueComponents(item.children, references)}
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
