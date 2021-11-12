import {Component} from 'vue';

export interface LayoutItem {
  component: string | Component,
  predefined?: boolean,
  classes?: string | string[]
  props?: any;
  children?: LayoutItem[];
}
