import { getNewLayoutItem } from "../layout/layout-service";
import { IBuilderLayout, ILayoutContent, IPlugin } from "../types";
import builderStore from "./builder-store";

export interface IDraggedContent {
  content?: ILayoutContent;
  plugin?: IPlugin;
  callback?: () => any;
}

export enum DRAG_SERVICE_EVENT {
  CREATE_GAPS = "1",
}

const GAP_EL_TAG = "builder-layout-gap";

class DragDropStore {
  isDragging: boolean = false;

  #dragged?: IDraggedContent;

  #onDragOver(event: Event): void {
    event.preventDefault();
  }

  start(dragged?: IDraggedContent) {
    this.isDragging = true;
    this.#dragged = dragged;
    this.#createGaps();

    document.addEventListener("dragover", this.#onDragOver, false);

    document.addEventListener(
      "dragend",
      () => {
        setTimeout(() => this.stop(), 1);
      },
      { once: true }
    );
  }

  stop() {
    this.isDragging = false;
    this.#dragged = undefined;
    document.removeEventListener("dragover", this.#onDragOver);

    this.#removeGaps();
  }

  drop(gapEl: HTMLElement): void {
    const container = gapEl.closest(
      "builder-layout-item, builder-layout"
    ) as IBuilderLayout;

    const plugin = this.#dragged?.plugin;
    const content =
      this.#dragged?.content || (getNewLayoutItem(plugin) as ILayoutContent);
    const insertIndex = Number(gapEl.getAttribute("insert-index") || 0);
    container.addNewChild(content, plugin, insertIndex);

    this.#dragged?.callback && this.#dragged.callback();
    this.stop();
  }

  #createGapsForLayoutItem(element: IBuilderLayout) {
    if (!element.supportChildren) {
      return;
    }
    const contentEl = element.contentEl;
    const length = element.contentChildren.length;
    Array.from(contentEl.children).forEach((child, index) => {
      const gap = document.createElement(GAP_EL_TAG);
      gap.setAttribute("insert-index", index + "");
      contentEl.insertBefore(gap, child);
    });
    const lastGap = document.createElement(GAP_EL_TAG);
    lastGap.setAttribute("insert-index", length + "");
    contentEl.appendChild(lastGap);
  }

  #createGaps() {
    this.#createGapsForLayoutItem(builderStore.builderEl.layoutEl);

    builderStore.builderEl
      .querySelectorAll("builder-layout-item")
      .forEach((el: any) => this.#createGapsForLayoutItem(el));
  }

  #removeGaps() {
    builderStore.builderEl
      .querySelectorAll("builder-layout-gap")
      .forEach((el) => el.remove());
  }
}

const dragAndDropStore = new DragDropStore();

export default dragAndDropStore;
