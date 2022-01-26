import { ILayoutContent } from "./layout";
import { IPlugin } from "./plugin";

export interface IBuilderLayout extends HTMLElement {
  contentEl: HTMLElement;
  supportChildren: boolean;
  contentChildren: ILayoutContent[];
  addNewChild(
    content: ILayoutContent,
    plugin?: IPlugin,
    insertIndex?: number
  ): void;
}
