import { IBuilderLayoutItem } from "./builder-layout-item";
import { ILayoutContent } from "./layout";
import { IPlugin } from "./plugin";

export interface IOnEditEventDetail {
  target: IBuilderLayoutItem;
  plugin?: IPlugin;
  content: ILayoutContent;
  parent?: ILayoutContent;
}

export interface IOnEditEvent extends CustomEvent<{}>, Event {
  detail: IOnEditEventDetail;
}
