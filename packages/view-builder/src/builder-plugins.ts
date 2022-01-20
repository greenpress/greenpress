import state from "./state";
import { IPlugin } from "./types";

export default class BuilderPlugins extends HTMLElement {
  static tag = "builder-plugins";

  constructor() {
    super();

    state.watch("plugins", (plugins: IPlugin[]) => {
      this.innerHTML = plugins
        .map(
          ({ match }) =>
            `<builder-plugin-item for="${match}"></builder-plugin-item>`
        )
        .join("");
    });
  }
}
