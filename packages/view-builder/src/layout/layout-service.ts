import state from "../store/builder-store";
import { IBuilderLayout, ILayoutContent, IPlugin } from "../types";

export function getNewLayoutItem(plugin?: IPlugin): ILayoutContent | undefined {
  if (!plugin) return;

  return {
    component: plugin.component,
    predefined: !!plugin.predefined,
    classes: plugin.classes || "",
    // @ts-ignore
    props: structuredClone({...plugin.props}),
    children: plugin.supportChildren ? [] : undefined,
  };
}

export function handleLayoutItemHover(element: IBuilderLayout) {
  element.addEventListener("mouseenter", (e) => {
    e.stopImmediatePropagation();
    state.setHoverItem(element);
  });
  element.addEventListener("mouseleave", (e) => {
    e.stopImmediatePropagation();
    state.removeHoverItem();
  });
}


