import { IBuilderLayout } from "./builder-layout";
import { ILayoutContent } from "./layout";
import { IPlugin } from "./plugin";

export interface IBuilderLayoutItem extends IBuilderLayout {
  content: ILayoutContent;
  plugin?: IPlugin;
  renderChildren: (content?: ILayoutContent[]) => void;
  render: () => void;
}
