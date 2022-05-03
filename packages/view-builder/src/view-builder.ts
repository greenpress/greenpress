import store from "./store/builder-store";
import "./view-builder.css";
import { ILayout, IPlugin, ILayoutContent, IBuilderLayout } from "./types";
import { IViewBuilderElement } from "./types/view-builder";

export default class ViewBuilderElement
  extends HTMLElement
  implements IViewBuilderElement
{
  static tag = "view-builder";

  pluginsEl: HTMLElement = document.createElement("builder-plugins");
  layoutEl: IBuilderLayout = document.createElement(
    "builder-layout"
  ) as IBuilderLayout;

  get plugins() {
    return store.plugins;
  }
  set plugins(plugins: IPlugin[]) {
    store.plugins = plugins;
  }

  get layout(): ILayout {
    return store.layout;
  }
  set layout(layout: ILayout) {
    store.layout = layout;
  }

  setContentDisplayCreator(
    func: (context: {
      content: ILayoutContent;
      plugin?: IPlugin;
      target: HTMLElement;
    }) => HTMLElement | null
  ): void {
    store.getDisplayElementForItem = func;
  }

  constructor() {
    super();
    store.init(this);
    setTimeout(() => {
      this.appendChild(this.pluginsEl);
      this.appendChild(this.layoutEl);
    }, 0);
  }
}
