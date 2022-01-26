import { IPlugin, ILayout, ILayoutContent } from "../types";
import { IViewBuilderElement } from "../types/view-builder";

class BuilderStore {
  builderEl!: IViewBuilderElement;

  #plugins: IPlugin[] = [];
  #layout!: ILayout;

  #watcher = document.createElement("div");

  #hoverItemElements: HTMLElement[] = [];

  pluginsMap = new Map<string, IPlugin>();
  getDisplayElementForItem: (context: {
    content: ILayoutContent;
    plugin?: IPlugin;
    target: HTMLElement;
  }) => HTMLElement | null = () => null;

  #emit(key: keyof BuilderStore) {
    this.#watcher.dispatchEvent(new CustomEvent(key));
  }

  emitAsBuilder(event: CustomEvent) {
    this.builderEl.dispatchEvent(event);
  }

  init(builderEl: IViewBuilderElement) {
    this.builderEl = builderEl;
  }

  matchPlugin(element: HTMLElement) {
    return this.plugins.find((plugin) => element.matches(plugin.match));
  }

  watch<K extends keyof BuilderStore>(
    key: K,
    callback: (newVal: BuilderStore[K]) => any
  ) {
    const internalCallback = () => callback(this[key]);
    this.#watcher.addEventListener(key, internalCallback);

    return () => this.#watcher.removeEventListener(key, internalCallback);
  }

  setHoverItem(element: HTMLElement) {
    this.#hoverItemElements[
      this.#hoverItemElements.length - 1
    ]?.classList.remove("hover");
    element.classList.add("hover");
    this.#hoverItemElements.push(element);
  }

  removeHoverItem() {
    this.#hoverItemElements.pop()?.classList.remove("hover");

    const lastItem =
      this.#hoverItemElements[this.#hoverItemElements.length - 1];
    lastItem?.classList.add("hover");
  }

  get plugins(): IPlugin[] {
    return this.#plugins;
  }

  set plugins(plugins: IPlugin[]) {
    this.#plugins = plugins.map((plugin) => ({
      ...plugin,
      showChildren:
        plugin.showChildren || !plugin.hasOwnProperty("showChildren"),
      supportChildren:
        plugin.supportChildren || !plugin.hasOwnProperty("supportChildren"),
    }));
    this.pluginsMap.clear();
    this.plugins.forEach((plugin) => this.pluginsMap.set(plugin.match, plugin));
    this.#emit("plugins");
  }

  get layout(): ILayout {
    return this.#layout;
  }

  set layout(layout: ILayout) {
    this.#layout = layout;
    this.#emit("layout");
  }
}

const store = new BuilderStore();

export default store;
