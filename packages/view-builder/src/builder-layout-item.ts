import {
  handleDraggableContent,
  handleLayoutItemHover,
} from "./layout-service";
import state from "./state";
import {
  ILayoutContent,
  IPlugin,
  IOnEditEventDetail,
  IOnEditEvent,
  IBuilderLayoutItem,
  IOnCreateEventDetail,
  IOnCreateEvent,
} from "./types";

export default class BuilderLayoutItem
  extends HTMLElement
  implements IBuilderLayoutItem
{
  static tag = "builder-layout-item";

  #content!: ILayoutContent;
  #relatedPlugin?: IPlugin;

  #contentEl!: HTMLElement;

  #remove() {
    this.dispatchEvent(
      new CustomEvent("remove", { detail: { content: this.#content } })
    );
  }

  #edit() {
    const editEventDetail: IOnEditEventDetail = {
      target: this,
      plugin: this.plugin,
      content: this.content,
      parent: (this.parentElement?.parentElement as BuilderLayoutItem)?.content,
    };
    state.emitAsBuilder(
      new CustomEvent("edit", { detail: editEventDetail }) as IOnEditEvent
    );
  }

  addNewChild(content: ILayoutContent, plugin?: IPlugin) {
    const el = this.#createNewChildElement(content);
    this.content.children?.push(content);
    this.#contentEl.appendChild(el);
    const createEventDetail: IOnCreateEventDetail = {
      target: el,
      plugin,
      content,
      insertIndex: (this.content.children?.length || 1) - 1,
      parent: this.content,
    };
    state.emitAsBuilder(
      new CustomEvent("create", { detail: createEventDetail }) as IOnCreateEvent
    );
  }

  #createNewChildElement(item: ILayoutContent): BuilderLayoutItem {
    const el = document.createElement(
      "builder-layout-item"
    ) as BuilderLayoutItem;
    el.content = item;
    el.addEventListener("remove", (e) => {
      e.stopImmediatePropagation();
      this.content.children = this.content.children!.filter(
        (content) => content !== item
      );
      el.remove();
    });

    return el;
  }

  #handleDraggableContent() {
    setTimeout(() => handleDraggableContent(this), 1);
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

    this.#handleDraggableContent();

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

    handleLayoutItemHover(this);
  }

  render() {
    this.innerHTML = `
    <h4>${this.plugin?.title || this.content.component}</h4>
    <div class="layout-item-actions">
      <a href="#" class="remove" title="remove">🗑️</a>
      <a href="#" class="edit" title="edit">📝</a>
    </div>
    `;
    this.querySelector(".layout-item-actions .remove")!.addEventListener(
      "click",
      () => this.#remove()
    );
    this.querySelector(".layout-item-actions .edit")!.addEventListener(
      "click",
      () => this.#edit()
    );
    this.appendChild(this.#contentEl);
    const displayEl = state.getDisplayElementForItem({
      content: this.content,
      plugin: this.plugin,
      target: this,
    });
    displayEl && this.appendChild(displayEl);
    this.renderChildren(this.content?.children);
    this.draggable = true;
    setTimeout(() => this.setAttribute("shown", ""), 1);
  }

  renderChildren(content: ILayoutContent[] = []) {
    content.forEach((item, i) => {
      const otherChildren = this.#contentEl.children[i] as BuilderLayoutItem;
      if (otherChildren?.content === item) {
        return;
      }
      const el = this.#createNewChildElement(item);
      if (otherChildren) {
        this.#contentEl.insertBefore(el, this.#contentEl.children[i]);
      } else {
        this.#contentEl.appendChild(el);
      }
    });
  }
}
