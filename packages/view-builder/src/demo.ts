import "./style.css";
import { IOnEditEventDetail } from "./types";
import ViewBuilderElement from "./view-builder";
const app = document.querySelector<HTMLDivElement>("#app")!;

await import("./index");

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

builder.addEventListener("edit", (e) => {
  const detail: IOnEditEventDetail = e.detail;
  console.log("edit data", detail);

  if (detail.plugin?.component === "img") {
    detail.content.props.src = prompt("image url?");
    detail.content.props.style = "max-width: 100%;max-height: 400px;";
    detail.target.content = detail.content;
  }
});
