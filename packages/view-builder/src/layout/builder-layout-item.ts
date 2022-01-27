import { handleLayoutItemHover } from "./layout-service";
import store from "../store/builder-store";
import {
  ILayoutContent,
  IPlugin,
  IOnEditEventDetail,
  IOnEditEvent,
  IBuilderLayoutItem,
  IOnCreateEventDetail,
  IOnCreateEvent,
} from "../types";
import dragAndDropStore from "../store/drag-drop-store";
import builderStore from '../store/builder-store';

export default class BuilderLayoutItem
  extends HTMLElement
  implements IBuilderLayoutItem
{
  static tag = "builder-layout-item";

  #content!: ILayoutContent;
  #relatedPlugin?: IPlugin;

  contentEl!: HTMLElement;

  #remove() {
    this.dispatchEvent(
      new CustomEvent("remove", { detail: { content: this.content } })
    );
  }

  #edit() {
    const editEventDetail: IOnEditEventDetail = {
      target: this,
      plugin: this.plugin,
      content: this.content,
      parent: (this.parentElement?.parentElement as BuilderLayoutItem)?.content,
    };
    store.emitAsBuilder(
      new CustomEvent("edit", { detail: editEventDetail }) as IOnEditEvent
    );
  }

  addNewChild(
    content: ILayoutContent,
    plugin?: IPlugin,
    insertIndex: number = this.contentChildren.length
  ) {
    const cloneContent = { ...content };

    const el = this.#createNewChildElement(cloneContent);
    if (insertIndex >= this.contentChildren.length) {
      insertIndex = this.contentChildren.length;
      this.contentEl.appendChild(el);
      this.contentChildren.push(cloneContent);
    } else {
      const beforeEl = (
        Array.from(this.contentEl.children) as BuilderLayoutItem[]
      ).find((el) => el.content === this.contentChildren[insertIndex]);
      if (beforeEl) {
        this.contentEl.insertBefore(el, beforeEl);
        this.content.children = this.contentChildren
          .slice(0, insertIndex)
          .concat([cloneContent, ...this.contentChildren.slice(insertIndex)]);
      } else {
        insertIndex = this.contentChildren.length;
        this.contentEl.appendChild(el);
        this.contentChildren.push(cloneContent);
      }
    }

    const createEventDetail: IOnCreateEventDetail = {
      target: el,
      plugin,
      content: cloneContent,
      insertIndex: (this.content.children?.length || 1) - 1,
      parent: this.content,
    };
    store.emitAsBuilder(
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
      builderStore.emitLayoutChanged();
    });

    return el;
  }

  get content() {
    return this.#content;
  }
  set content(content: ILayoutContent) {
    this.#content = content;
    this.contentEl = document.createElement(content.component);
    this.contentEl.setAttribute("class", content.classes);
    this.contentEl.setAttribute("data-actual-item", "");
    Object.keys(content.props || {}).forEach((key) =>
      this.contentEl.setAttribute(key, content.props[key])
    );
    this.render();
  }

  get supportChildren() {
    return !!this.plugin?.supportChildren;
  }
  get contentChildren() {
    return this.content.children || [];
  }

  get plugin(): IPlugin | undefined {
    if (this.#relatedPlugin) {
      return this.#relatedPlugin;
    }
    this.#relatedPlugin = store.matchPlugin(this.contentEl);
    return this.#relatedPlugin;
  }

  constructor() {
    super();

    this.addEventListener("dragstart", (event) => {
      event.stopImmediatePropagation();
      this.classList.add("dragged");
      event.dataTransfer!.effectAllowed = "copy";
      dragAndDropStore.start({
        content: this.content,
        plugin: this.plugin,
        callback: () => {
          this.#remove();
        },
      });

      document.addEventListener(
        "dragend",
        () => {
          this.classList.remove("dragged");
        },
        { once: true }
      );
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
    this.appendChild(this.contentEl);
    const displayEl = store.getDisplayElementForItem({
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
      const otherChildren = this.contentEl.children[i] as BuilderLayoutItem;
      if (otherChildren?.content === item) {
        return;
      }
      const el = this.#createNewChildElement(item);
      if (otherChildren) {
        this.contentEl.insertBefore(el, this.contentEl.children[i]);
      } else {
        this.contentEl.appendChild(el);
      }
    });
  }
}
