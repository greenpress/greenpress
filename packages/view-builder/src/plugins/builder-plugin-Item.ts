import store from "../store/builder-store";
import dragAndDropStore from "../store/drag-drop-store";
import { IPlugin } from "../types";

export default class BuilderPluginItem extends HTMLElement {
  static tag = "builder-plugin-item";

  #currentPlugin!: IPlugin;

  static get observedAttributes() {
    return ["for"];
  }

  attributeChangedCallback(_name: "for", _: string, match: string = "") {
    const plugin = store.pluginsMap.get(match);
    if (plugin) {
      this.#currentPlugin = plugin;
      this.render();
    }
  }

  constructor() {
    super();
    this.render();
    if (dragAndDropStore.isMobile) {
      this.addEventListener("click", () => {
        dragAndDropStore.start({
          plugin: this.#currentPlugin,
        });
      });
    } else {
      this.draggable = true;
      this.addEventListener("dragstart", (event) => {
        this.classList.add("dragged");
        event.dataTransfer!.effectAllowed = "copy";

        dragAndDropStore.start({
          plugin: this.#currentPlugin,
        });

        document.addEventListener(
          "dragend",
          () => {
            this.classList.remove("dragged");
          },
          { once: true }
        );
      });
    }
  }

  render() {
    if (this.#currentPlugin) {
      const { title, description } = this.#currentPlugin;
      this.innerHTML = `
      <h4>${title}</h4>
      <p>${description}</p>
    `;
    } else {
      this.innerHTML = "plugin data is missing";
    }
  }
}
