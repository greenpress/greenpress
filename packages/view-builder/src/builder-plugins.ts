import state from "./state";

export default class BuilderPlugins extends HTMLElement {
  static tag = "builder-plugins";

  constructor() {
    super();

    state.watch("plugins", (plugins) => {
      this.innerHTML = plugins
        .map(
          ({ forComponent }) =>
            `<builder-plugin-item for="${forComponent}"></builder-plugin-item>`
        )
        .join("");
    });
  }
}
