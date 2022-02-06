import {ILayout, ILayoutContent} from '../types';

function addToSet(content: ILayoutContent, classesSet: Set<string>): void {
  const classes = content.classes?.trim();
  if (classes) {
    content.classes?.trim().split(' ').forEach(c => classesSet.add(c));
  }
  content.children?.forEach(child => addToSet(child, classesSet));
}

export function getLayoutClasses(layout: ILayout): string[] {
  const classes = new Set<string>();

  layout.content.forEach(content => addToSet(content, classes));

  return Array.from(classes);
}

