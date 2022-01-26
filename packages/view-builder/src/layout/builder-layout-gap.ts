import dragAndDropStore from "../store/drag-drop-store";

export default class BuilderLayoutGap extends HTMLElement {
  static tag = "builder-layout-gap";

  dragArea = document.createElement("div");

  constructor() {
    super();
    this.dragArea.setAttribute("class", "drag-area");
    this.dragArea.addEventListener("dragenter", (e) => {
    });
    this.dragArea.addEventListener("dragleave", (e) => {
    });
    this.dragArea.addEventListener("drop", () => {
      dragAndDropStore.drop(this);
    });

    setTimeout(() => {
      this.setAttribute("shown", "");
      this.appendChild(this.dragArea);
    }, 10);
  }
}
