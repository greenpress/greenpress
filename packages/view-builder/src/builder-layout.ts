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

    this.addEventListener("drop", (event: DropEvent) => {
      this.classList.remove("drag-enter");
      const forComponent: string = event.dataTransfer.getData("for");
      console.log("plugin dropped", forComponent);

      state.layout.content.push({
        component: forComponent,
        predefined: false,
        classes: "",
        props: {},
        children: [],
      });

      this.render(state.layout.content);
    });

    state.watch("layout", (newLayout) => {
      this.render(newLayout.content);
    });
  }

  render(content: ILayoutContent) {
    content.forEach((item, index) => {
      const otherChildren = this.children[index] as BuilderLayoutItem;
      if (otherChildren?.content === item) {
        return;
      }
      const el = document.createElement(
        "builder-layout-item"
      ) as BuilderLayoutItem;
      el.content = item;
      if (otherChildren) {
        this.insertBefore(el, this.children[index]);
      } else {
        this.appendChild(el);
      }
    });
  }
}
