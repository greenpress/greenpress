import state from "./state";
import { ILayoutContent, IPlugin } from "./types";

export default class BuilderLayoutItem extends HTMLElement {
  static tag = "builder-layout-item";

  #content!: ILayoutContent;

  #childrenEl = document.createElement("div");

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

    this.addEventListener("dragenter", (e) => {
      e.stopImmediatePropagation();
      console.log("over me", this.#content);
      state.dragOverContent = this.#content;
      this.classList.add("drag-enter");
    });

    this.addEventListener("dragleave", (e) => {
      e.stopImmediatePropagation();

      if (state.dragOverContent === this.#content) {
        state.dragOverContent = undefined;
      }
      this.classList.remove("drag-enter");
    });

    this.addEventListener("drop", (event: DragEvent) => {
      this.classList.remove("drag-enter");
      const forComponent: string = event.dataTransfer!.getData("for");
      if (state.dragOverContent === this.#content) {
        this.#content.children!.push({
          component: forComponent,
          predefined: false,
          classes: "",
          props: {},
          children: [],
        });
        this.renderChildren(this.#content.children);
      }
    });
  }

  render() {
    this.innerHTML = `${this.#content?.component}!!`;
    this.appendChild(this.#childrenEl);
    this.renderChildren(this.#content?.children);
    this.draggable = true;
  }

  renderChildren(content: ILayoutContent[] = []) {
    content.forEach((item, index) => {
      const otherChildren = this.#childrenEl.children[
        index
      ] as BuilderLayoutItem;
      if (otherChildren?.content === item) {
        return;
      }
      const el = document.createElement(
        "builder-layout-item"
      ) as BuilderLayoutItem;
      el.content = item;
      if (otherChildren) {
        this.#childrenEl.insertBefore(el, this.#childrenEl.children[index]);
      } else {
        this.#childrenEl.appendChild(el);
      }
    });
  }
}
