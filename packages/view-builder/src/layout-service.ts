import state from "./state";
import { ILayoutContent, IBuilderLayoutItem, IPlugin } from "./types";

export function getNewLayoutItem(match: string): ILayoutContent | undefined {
  const plugin = state.pluginsMap.get(match);
  if (!plugin) return;

  return {
    component: plugin.component,
    predefined: false,
    classes: plugin.classes || "",
    props: {},
    children: plugin.supportChildren ? [] : undefined,
  };
}

export function handleLayoutItemHover(element: HTMLElement) {
  element.addEventListener("mouseenter", (e) => {
    e.stopImmediatePropagation();
    state.setHoverItem(element);
  });
  element.addEventListener("mouseleave", (e) => {
    e.stopImmediatePropagation();
    state.removeHoverItem();
  });
}

export function handleDraggableContent(element: IBuilderLayoutItem) {
  if (element.plugin?.supportChildren) {
    element.addEventListener("dragenter", (e) => {
      e.stopImmediatePropagation();
      state.dragOverContent = element.content;
      element.classList.add("drag-enter");
    });

    element.addEventListener("dragleave", (e) => {
      e.stopImmediatePropagation();

      if (state.dragOverContent === element.content) {
        state.dragOverContent = undefined;
      }
      element.classList.remove("drag-enter");
    });

    element.addEventListener("drop", (event: DragEvent) => {
      event.stopImmediatePropagation();

      element.classList.remove("drag-enter");

      if (state.draggedContent === element.content) {
        state.abortDraggedContent();
        return;
      }

      if (state.dragOverContent === element.content) {
        const match: string = event.dataTransfer!.getData("for");
        const newContentItem = state.draggedContent || getNewLayoutItem(match);
        if (newContentItem) {
          element.addNewChild(
            newContentItem,
            state.pluginsMap.get(match) as IPlugin
          );
          state.relocateDraggedContent();
        }
        state.dragOverContent = undefined;
      }
    });
  }
}
