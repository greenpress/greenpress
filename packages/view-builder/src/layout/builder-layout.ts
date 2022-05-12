import BuilderLayoutItem from "./builder-layout-item";
import store from "../store/builder-store";
import {
  ILayoutContent,
  IOnCreateEventDetail,
  IPlugin,
  IOnCreateEvent,
  IBuilderLayout,
} from "../types";
import builderStore from '../store/builder-store';

export default class BuilderLayout
  extends HTMLElement
  implements IBuilderLayout
{
  static tag = "builder-layout";

  supportChildren = true;
  contentEl = this;

  constructor() {
    super();

    store.watch("layout", (newLayout) => {
      this.innerHTML =  '';
      this.render(newLayout.content);
    });
  }

  get contentChildren() {
    return store.layout.content;
  }

  #createNewChildElement(item: ILayoutContent): BuilderLayoutItem {
    const el = document.createElement(
      "builder-layout-item"
    ) as BuilderLayoutItem;
    el.content = item;
    el.addEventListener("remove", (e) => {
      e.stopImmediatePropagation();
      store.layout.content = store.layout.content.filter(
        (content) => content !== item
      );
      el.remove();
      builderStore.emitLayoutChanged();
    });

    return el;
  }

  addNewChild(
    content: ILayoutContent,
    plugin?: IPlugin,
    insertIndex: number = store.layout.content.length
  ) {
    const cloneContent = { ...content };

    const el = this.#createNewChildElement(cloneContent);
    if (insertIndex >= store.layout.content.length) {
      insertIndex = store.layout.content.length;
      this.appendChild(el);
      store.layout.content.push(cloneContent);
    } else {
      const beforeEl = (Array.from(this.children) as BuilderLayoutItem[]).find(
        (el) => el.content === store.layout.content[insertIndex]
      );
      if (beforeEl) {
        this.insertBefore(el, beforeEl);
        store.layout.content = store.layout.content
          .slice(0, insertIndex)
          .concat([cloneContent, ...store.layout.content.slice(insertIndex)])
          .filter((item) => item !== content);
      } else {
        insertIndex = 0;
        this.prepend(el);
        store.layout.content.unshift(cloneContent);
      }
    }
    const createEventDetail: IOnCreateEventDetail = {
      target: el,
      plugin,
      content: cloneContent,
      insertIndex,
      parent: undefined,
    };
    store.emitAsBuilder(
      new CustomEvent("create", { detail: createEventDetail }) as IOnCreateEvent
    );
  }

  render(content: ILayoutContent[]) {
    content.forEach((item, i) => {
      const otherChildren = this.children[i] as BuilderLayoutItem;
      if (otherChildren?.content === item) {
        return;
      }
      const el = this.#createNewChildElement(item);
      if (otherChildren) {
        this.insertBefore(el, this.children[i]);
      } else {
        this.appendChild(el);
      }
    });
  }
}
