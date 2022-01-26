import { IBuilderLayoutItem } from "./builder-layout-item";
import { ILayoutContent } from "./layout";
import { IPlugin } from "./plugin";

export interface IOnCreateEventDetail {
  target: IBuilderLayoutItem;
  plugin?: IPlugin;
  content: ILayoutContent;
  parent?: ILayoutContent;
  insertIndex: number;
}

export interface IOnCreateEvent extends CustomEvent<{}>, Event {
  detail: IOnCreateEventDetail;
}
