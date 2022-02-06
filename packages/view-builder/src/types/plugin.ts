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

  // is that component predefined in your own system and needs to be loaded before usage? if so, set as true.
  predefined?: boolean;

  [key: string]: any;
}
