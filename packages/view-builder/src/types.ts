export interface ILayoutContent {
  component: string;
  predefined: boolean;
  classes: string;
  props: {
    [key: string]: any;
  };
  children?: ILayoutContent[];
}

export interface ILayout {
  connectedData: {
    kind: string;
    identifier: string;
    reference: string;
    context?: any;
  }[];
  content: ILayoutContent[];
  [key: string]: any;
}

export interface IPlugin {
  component: string;
  match: string;

  title: string;
  description: string;
  classes?: string;

  // element support having children (via <slot> or natively)? default: true
  supportChildren?: boolean;

  // should show children in viewer? default: true
  showChildren?: boolean;

  [key: string]: any;
}

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

export interface IOnEditEventDetail {
  target: IBuilderLayoutItem;
  plugin?: IPlugin;
  content: ILayoutContent;
  parent?: ILayoutContent;
}

export interface IOnEditEvent extends CustomEvent<{}>, Event {
  detail: IOnEditEventDetail;
}

export interface IBuilderLayoutItem extends HTMLElement {
  content: ILayoutContent;
  plugin?: IPlugin;
  renderChildren: (content?: ILayoutContent[]) => void;
  render: () => void;
  addNewChild(content: ILayoutContent, plugin?: IPlugin): void;
}
