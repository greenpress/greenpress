import { IPlugin, ILayout } from "./types";

class BuilderState {
  #plugins: IPlugin[] = [];
  #layout!: ILayout;

  pluginsMap = new Map<string, IPlugin>();

  #watcher = document.createElement("div");

  #emit(key: keyof BuilderState) {
    this.#watcher.dispatchEvent(new CustomEvent(key));
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
    this.#plugins = plugins;
    this.pluginsMap.clear();
    this.plugins.forEach((plugin) =>
      this.pluginsMap.set(plugin.forComponent, plugin)
    );
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
