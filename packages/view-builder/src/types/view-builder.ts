import { IBuilderLayout } from "./builder-layout";
import { ILayout, ILayoutContent } from "./layout";
import { IPlugin } from "./plugin";

export interface IViewBuilderElement extends HTMLElement {
  pluginsEl: HTMLElement;
  layoutEl: IBuilderLayout;

  plugins: IPlugin[];
  layout: ILayout;

  setContentDisplayCreator: (
    func: (context: {
      content: ILayoutContent;
      plugin?: IPlugin;
      target: HTMLElement;
    }) => HTMLElement | null
  ) => void;
}
