import BuilderLayoutItem from "./builder-layout-item";
import { getNewLayoutItem } from "./layout-service";
import state from "../state";
import {
  ILayoutContent,
  IOnCreateEventDetail,
  IPlugin,
  IOnCreateEvent,
} from "../types";

export default class BuilderLayout extends HTMLElement {
  static tag = "builder-layout";

  constructor() {
    super();

    this.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    this.addEventListener("dragenter", () => {
      this.classList.add("drag-enter");
    });

    this.addEventListener("dragleave", () => {
      this.classList.remove("drag-enter");
    });

    this.addEventListener("drop", (event: DragEvent) => {
      this.classList.remove("drag-enter");
      if (!state.dragOverContent) {
        const match: string = event.dataTransfer!.getData("for");

        const newContentItem = state.draggedContent || getNewLayoutItem(match);
        if (newContentItem) {
          this.addNewChild(newContentItem, state.pluginsMap.get(match));
          state.relocateDraggedContent();
        }
      }
      state.dragOverContent = undefined;
    });

    state.watch("layout", (newLayout) => {
      this.render(newLayout.content);
    });
  }

  #createNewChildElement(item: ILayoutContent): BuilderLayoutItem {
    const el = document.createElement(
      "builder-layout-item"
    ) as BuilderLayoutItem;
    el.content = item;
    el.addEventListener("remove", (e) => {
      e.stopImmediatePropagation();
      state.layout.content = state.layout.content.filter(
        (content) => content !== item
      );
      el.remove();
    });

    return el;
  }

  addNewChild(content: ILayoutContent, plugin?: IPlugin) {
    const el = this.#createNewChildElement(content);
    state.layout.content.push(content);
    this.appendChild(el);
    const createEventDetail: IOnCreateEventDetail = {
      target: el,
      plugin,
      content,
      insertIndex: state.layout.content.length - 1,
      parent: undefined,
    };
    state.emitAsBuilder(
      new CustomEvent("create", { detail: createEventDetail }) as IOnCreateEvent
    );
  }

  render(content: ILayoutContent[]) {
    content.forEach((item, i) => {
      const otherChildren = this.children[i] as BuilderLayoutItem;
      if (otherChildren?.content === item) {
        return;
      }
      const el = this.#createNewChildElement(item);
      if (otherChildren) {
        this.insertBefore(el, this.children[i]);
      } else {
        this.appendChild(el);
      }
    });
  }
}
