import state from "./state";
import "./view-builder.css";
import { ILayout, IPlugin, ILayoutContent } from "./types";

export default class ViewBuilderElement extends HTMLElement {
  static tag = "view-builder";

  pluginsEl: HTMLElement = document.createElement("builder-plugins");
  layoutEl: HTMLElement = document.createElement("builder-layout");

  get plugins() {
    return state.plugins;
  }
  set plugins(plugins: IPlugin[]) {
    state.plugins = plugins;
  }

  get layout(): ILayout {
    return state.layout;
  }
  set layout(layout: any) {
    state.layout = layout;
  }

  setContentDisplayCreator(
    func: (context: {
      content: ILayoutContent;
      plugin?: IPlugin;
      target: HTMLElement;
    }) => HTMLElement | null
  ): void {
    state.getDisplayElementForItem = func;
  }

  constructor() {
    super();
    state.init(this);
    this.appendChild(this.pluginsEl);
    this.appendChild(this.layoutEl);
  }
}
