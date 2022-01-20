import { getNewLayoutItem } from "./layout-service";
import state from "./state";
import { ILayoutContent, IPlugin } from "./types";

export default class BuilderLayoutItem extends HTMLElement {
  static tag = "builder-layout-item";

  #content!: ILayoutContent;
  #relatedPlugin?: IPlugin;

  #contentEl!: HTMLElement;

  #remove() {
    this.dispatchEvent(
      new CustomEvent("remove", { detail: { content: this.#content } })
    );
  }

  get content() {
    return this.#content;
  }
  set content(content: ILayoutContent) {
    this.#content = content;
    this.#contentEl = document.createElement(content.component);
    this.#contentEl.setAttribute("class", content.classes);
    this.#contentEl.setAttribute("data-actual-item", "");
    Object.keys(content.props || {}).forEach((key) =>
      this.#contentEl.setAttribute(key, content.props[key])
    );
    this.render();
  }

  get plugin(): IPlugin | undefined {
    if (this.#relatedPlugin) {
      return this.#relatedPlugin;
    }
    this.#relatedPlugin = state.matchPlugin(this.#contentEl);
    return this.#relatedPlugin;
  }

  constructor() {
    super();

    this.addEventListener("dragstart", (event) => {
      event.stopImmediatePropagation();
      this.classList.add("dragged");
      event.dataTransfer!.effectAllowed = "copy";
      event.dataTransfer!.setData("for", this.plugin?.match || "");
      state.setDraggedContent(this.#content, () => {
        this.#remove();
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
      if (this.plugin?.showChildren) {
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
        state.abortDraggedContent();
        return;
      }

      if (state.dragOverContent === this.#content) {
        const match: string = event.dataTransfer!.getData("for");
        const newContentItem = state.draggedContent || getNewLayoutItem(match);
        if (newContentItem) {
          this.#content.children!.push(newContentItem);
          state.relocateDraggedContent();
          this.renderChildren(this.#content.children);
        }
        state.dragOverContent = undefined;
      }
    });
  }

  render() {
    this.innerHTML = `
    ${this.plugin?.title || this.content.component}!!
    <div class="layout-item-actions">
      <a href="#" class="remove" title="remove">🗑️</a>
      <a href="#" class="edit" title="edit">📝</a>
    </div>
    `;
    this.appendChild(this.#contentEl);
    this.renderChildren(this.#content?.children);
    this.draggable = true;
  }

  renderChildren(content: ILayoutContent[] = []) {
    content.forEach((item, index) => {
      const otherChildren = this.#contentEl.children[
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
        this.#contentEl.insertBefore(el, this.#contentEl.children[index]);
      } else {
        this.#contentEl.appendChild(el);
      }
    });
  }
}
