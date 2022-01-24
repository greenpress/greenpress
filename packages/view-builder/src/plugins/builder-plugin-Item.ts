import state from "../state";
import { IPlugin } from "../types";

export default class BuilderPluginItem extends HTMLElement {
  static tag = "builder-plugin-item";

  #currentPlugin!: IPlugin;

  static get observedAttributes() {
    return ["for"];
  }

  attributeChangedCallback(_name: "for", _: string, match: string = "") {
    const plugin = state.pluginsMap.get(match);
    if (plugin) {
      this.#currentPlugin = plugin;
      this.render();
    }
  }

  constructor() {
    super();
    this.render();
    this.draggable = true;
    this.addEventListener("dragstart", (event) => {
      this.classList.add("dragged");
      event.dataTransfer!.effectAllowed = "copy";
      event.dataTransfer!.setData("for", this.#currentPlugin.match || "");

      document.addEventListener(
        "dragend",
        () => {
          this.classList.remove("dragged");
        },
        { once: true }
      );
    });
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
