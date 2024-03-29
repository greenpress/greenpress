import dragAndDropStore from "../store/drag-drop-store";

export default class BuilderLayoutGap extends HTMLElement {
  static tag = "builder-layout-gap";

  dragArea = document.createElement("div");

  constructor() {
    super();
    this.dragArea.setAttribute("class", "drag-area");
    if(dragAndDropStore.isMobile) {
      this.dragArea.addEventListener("click", () => {
        dragAndDropStore.drop(this);
      });
    } else {
      this.dragArea.addEventListener("dragenter", () => {});
      this.dragArea.addEventListener("dragleave", () => {});
      this.dragArea.addEventListener("drop", () => {
        dragAndDropStore.drop(this);
      });

    }

    setTimeout(() => {
      this.setAttribute("shown", "");
      this.appendChild(this.dragArea);
    }, 10);
  }
}
