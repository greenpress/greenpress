import state from "./state";
import "./view-builder.css";
import { IPlugin } from "./types";

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

  get layout() {
    return state.layout;
  }
  set layout(layout: any) {
    state.layout = layout;
  }

  constructor() {
    super();
    this.appendChild(this.pluginsEl);
    this.appendChild(this.layoutEl);
  }
}
