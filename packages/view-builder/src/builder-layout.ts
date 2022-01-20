import BuilderLayoutItem from "./builder-layout-item";
import state from "./state";
import { ILayoutContent } from "./types";

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
      const forComponent: string = event.dataTransfer!.getData("for");
      if (!state.dragOverContent) {
        state.layout.content.push(
          state.draggedContent || {
            component: forComponent,
            predefined: false,
            classes: "",
            props: {},
            children: [],
          }
        );
        state.relocateDraggedContent();
        this.render(state.layout.content);
      }
      state.dragOverContent = undefined;
    });

    state.watch("layout", (newLayout) => {
      this.render(newLayout.content);
    });
  }

  render(content: ILayoutContent[]) {
    content.forEach((item, index) => {
      const otherChildren = this.children[index] as BuilderLayoutItem;
      if (otherChildren?.content === item) {
        return;
      }
      const el = document.createElement(
        "builder-layout-item"
      ) as BuilderLayoutItem;
      el.content = item;
      el.addEventListener("remove", () => {
        state.layout.content = content.filter(
          (content: ILayoutContent) => content !== item
        );
        el.remove();
      });
      if (otherChildren) {
        this.insertBefore(el, this.children[index]);
      } else {
        this.appendChild(el);
      }
    });
  }
}
