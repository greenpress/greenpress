import store from "../store/builder-store";
import { IPlugin } from "../types";

export default class BuilderPlugins extends HTMLElement {
  static tag = "builder-plugins";

  constructor() {
    super();

    store.watch("plugins", (plugins: IPlugin[]) => {
      this.innerHTML = plugins
        .map(
          ({ match }) =>
            `<builder-plugin-item for="${match}"></builder-plugin-item>`
        )
        .join("");
    });
  }
}
