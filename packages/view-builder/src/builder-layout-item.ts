import state from "./state";
import { ILayoutContent, IPlugin } from "./types";

export default class BuilderLayoutItem extends HTMLElement {
  static tag = "builder-layout-item";

  #content!: ILayoutContent;

  get content() {
    return this.#content;
  }
  set content(content: ILayoutContent) {
    this.#content = content;
    this.render();
  }

  get plugin(): IPlugin {
    return state.pluginsMap.get(this.#content.component) as IPlugin;
  }

  constructor() {
    super();

    this.addEventListener("dragstart", (event) => {
      this.classList.add("dragged");
      event.dataTransfer!.effectAllowed = "copy";
      event.dataTransfer!.setData("for", this.plugin.forComponent || "");

      document.addEventListener(
        "dragend",
        () => {
          this.classList.remove("dragged");
        },
        { once: true }
      );
    });

    this.addEventListener("dragover", (e) => {
      if (this.plugin.showChildren) {
        e.preventDefault();
      }
    });

    this.addEventListener("dragenter", () => {
      this.classList.add("drag-enter");
    });

    this.addEventListener("dragleave", () => {
      this.classList.remove("drag-enter");
    });

    this.addEventListener("drop", (event: DropEvent) => {
      this.classList.remove("drag-enter");
      const forComponent: string = event.dataTransfer.getData("for");
      console.log("plugin dropped", forComponent);

      this.#content.children!.push({
        component: forComponent,
        predefined: false,
        classes: "",
        props: {},
        children: [],
      });
    });
  }

  render() {
    this.innerHTML = `${this.#content?.component}!!`;
    this.draggable = true;
  }
}
