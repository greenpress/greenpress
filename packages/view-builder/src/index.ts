import BuilderPluginItem from "./plugins/builder-plugin-Item";
import BuilderPlugins from "./plugins/builder-plugins";
import BuilderLayout from "./layout/builder-layout";
import ViewBuilderElement from "./view-builder";
import BuilderLayoutItem from "./layout/builder-layout-item";
import BuilderLayoutGap from "./layout/builder-layout-gap";

export * from "./types";

customElements.define(ViewBuilderElement.tag, ViewBuilderElement);
customElements.define(BuilderPlugins.tag, BuilderPlugins);
customElements.define(BuilderPluginItem.tag, BuilderPluginItem);
customElements.define(BuilderLayout.tag, BuilderLayout);
customElements.define(BuilderLayoutItem.tag, BuilderLayoutItem);
customElements.define(BuilderLayoutGap.tag, BuilderLayoutGap);
