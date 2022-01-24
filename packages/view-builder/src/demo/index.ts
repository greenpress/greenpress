import "./style.css";
import { IOnEditEventDetail, IOnCreateEventDetail } from "../types";
import ViewBuilderElement from "../view-builder";
const app = document.querySelector<HTMLDivElement>("#app")!;

await import("../index");

app.innerHTML = `
  <h1>This is a demo page to render the builder</h1>
  <view-builder id="my-builder"></view-builder>
`;

const builder = document.getElementById("my-builder") as ViewBuilderElement;
builder.layout = {
  content: [],
  connectedData: [],
};
builder.plugins = [
  {
    match: "SearchBox",
    component: "SearchBox",
    title: "search box",
    description: "wow!",
    supportChildren: false,
  },
  {
    match: "img",
    component: "img",
    title: "Image",
    description: "free image",
    supportChildren: false,
  },
  {
    match: "BlockBox",
    component: "BlockBox",
    title: "Block Box",
    description: "free text",
    supportChildren: false,
  },
  {
    match: "PostsList",
    component: "PostsList",
    title: "posts list",
    description: "mew!",
    classes: "posts-list",
  },
  {
    match: "div.flex-row",
    component: "div",
    title: "row",
    description: "wow!",
    classes: "flex-row",
  },
  {
    match: "div.blue",
    component: "div",
    title: "Blue",
    description: "blue container",
    classes: "blue",
  },
];

builder.setContentDisplayCreator(({ content, plugin }) => {
  const div = document.createElement("div");

  if (content.component === "BlockBox") {
    console.log(content);
    console.log(plugin);
    div.innerHTML = "block id: " + content.props.block;
    return div;
  }

  return null;
});

builder.addEventListener("edit", (e: any) => {
  const detail: IOnEditEventDetail = e.detail;
  console.log("edit data", detail);

  if (detail.plugin?.component === "img") {
    detail.content.props.src = prompt("image url?", detail.content.props.src);
    detail.content.props.style = "max-width: 100%;max-height: 400px;";
    detail.target.content = detail.content;
  }
});

builder.addEventListener("create", (e: any) => {
  const detail: IOnCreateEventDetail = e.detail;
  console.log("create data", detail);

  const componentName = detail.plugin?.component;

  if (componentName === "img") {
    detail.content.props.src = prompt("image url?", detail.content.props.src);
    detail.content.props.style = "max-width: 100%;max-height: 400px;";
    detail.target.content = detail.content;
  } else if (componentName === "BlockBox") {
    const blockRef = "$block";
    const existingBlock = builder.layout.connectedData.find(
      ({ reference }) => reference === blockRef
    );
    if (existingBlock) {
      alert("using existing block : " + existingBlock.identifier);
    } else {
      builder.layout.connectedData.push({
        kind: "block",
        identifier: prompt("block id?") || "",
        reference: blockRef,
      });
    }
    detail.content.props.block = blockRef;
    detail.target.render();
  }
});
