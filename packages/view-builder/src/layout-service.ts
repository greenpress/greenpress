import state from "./state";
import { ILayoutContent } from "./types";

export function getNewLayoutItem(match: string): ILayoutContent | undefined {
  const plugin = state.pluginsMap.get(match);
  if (!plugin) return;

  return {
    component: plugin.component,
    predefined: false,
    classes: plugin.classes || "",
    props: {},
    children: plugin.supportChildren ? [] : undefined,
  };
}
