import { Block } from "./block";
import { bindContextMehods, createContext } from "./context";
import { reactive } from "./proxy";

/** 初始化 */
export const createApp = (init?: any) => {
  /** 创建上下文 */
  const ctx = createContext();

  if (init) {
    ctx.scope = reactive(init, ctx);

    // 目前为止不绑定this指向也没发现什么问题
    bindContextMehods(ctx.scope);
  }

  // ctx.$s = Object.toString;

  /** 根结点块集合 */
  let rootBlocks = [];

  return {
    mount(el?: Element | string | null) {
      if (el) {
        if (typeof el === "string") {
          el = document.querySelector(el);
        }
      }

      el = (el || document.documentElement) as Element;

      let roots: Element[] = [];

      roots = [el];

      rootBlocks = roots.map(item => new Block(item, ctx, true));

      // @ts-ignore
      window.ctx = ctx;

      return this;
    },
  };
};
