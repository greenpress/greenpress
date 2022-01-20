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
      event.stopImmediatePropagation();
      this.classList.add("dragged");
      event.dataTransfer!.effectAllowed = "copy";
      event.dataTransfer!.setData("for", this.plugin.forComponent || "");
      state.setDraggedContent(this.#content, () => {
        this.dispatchEvent(
          new CustomEvent("remove", { detail: { content: this.#content } })
        );
      });

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
      event.stopImmediatePropagation();

      this.classList.remove("drag-enter");

      if (state.draggedContent === this.#content) {
        console.log("drag on itself");
        state.abortDraggedContent();
        return;
      }

      if (state.dragOverContent === this.#content) {
        const forComponent: string = event.dataTransfer!.getData("for");
        this.#content.children!.push(
          state.draggedContent || {
            component: forComponent,
            predefined: false,
            classes: "",
            props: {},
            children: [],
          }
        );
        state.relocateDraggedContent();
        this.renderChildren(this.#content.children);
        state.dragOverContent = undefined;
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
      el.addEventListener("remove", () => {
        this.#content.children = this.#content.children!.filter(
          (content) => content !== item
        );
        el.remove();
      });
      if (otherChildren) {
        this.#childrenEl.insertBefore(el, this.#childrenEl.children[index]);
      } else {
        this.#childrenEl.appendChild(el);
      }
    });
  }
}
