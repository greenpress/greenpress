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
  alert("edit mode");
  console.log("edit data", e.detail as IOnEditEventDetail);
});
