import { IPlugin, ILayout, ILayoutContent } from "./types";

class BuilderState {
  #builderEl: HTMLElement;

  #plugins: IPlugin[] = [];
  #layout!: ILayout;

  #watcher = document.createElement("div");
  #draggedContent?: ILayoutContent;
  #draggedContentCallback?: () => any;

  dragOverContent?: ILayoutContent;
  pluginsMap = new Map<string, IPlugin>();

  get draggedContent() {
    return this.#draggedContent;
  }

  #emit(key: keyof BuilderState) {
    this.#watcher.dispatchEvent(new CustomEvent(key));
  }

  emitAsBuilder(event: CustomEvent) {
    this.#builderEl.dispatchEvent(event);
  }

  init(builderEl: HTMLElement) {
    this.#builderEl = builderEl;
  }

  matchPlugin(element: HTMLElement) {
    return this.plugins.find((plugin) => element.matches(plugin.match));
  }

  setDraggedContent(content: ILayoutContent, callback: () => any) {
    this.#draggedContent = content;
    this.#draggedContentCallback = callback;
  }

  relocateDraggedContent() {
    this.#draggedContentCallback && this.#draggedContentCallback();
    this.#draggedContent = undefined;
    this.#draggedContentCallback = undefined;
  }

  abortDraggedContent() {
    this.#draggedContent = undefined;
    this.#draggedContentCallback = undefined;
  }

  watch<K extends keyof BuilderState>(
    key: K,
    callback: (newVal: BuilderState[K]) => any
  ) {
    const internalCallback = () => callback(this[key]);
    this.#watcher.addEventListener(key, internalCallback);

    return () => this.#watcher.removeEventListener(key, internalCallback);
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

const state = new BuilderState();

export default state;
