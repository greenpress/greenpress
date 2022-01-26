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
