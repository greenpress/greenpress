import "./style.css";
import ViewBuilderElement from "./view-builder";
const app = document.querySelector<HTMLDivElement>("#app")!;

await import("./index");

app.innerHTML = `
  <h1>This is a demo page to render the builder</h1>
  <view-builder id="builder"></view-builder>
`;

const builder = document.getElementById("builder") as ViewBuilderElement;
builder.layout = {
  content: [],
  connectedData: [],
};
builder.plugins = [
  {
    forComponent: "SearchBox",
    title: "search box",
    description: "wow!",
  },
  {
    forComponent: "PostsList",
    title: "posts list",
    description: "mew!",
    classes: "posts-list",
  },
];
