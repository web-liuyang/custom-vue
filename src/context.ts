import { reactive } from "./proxy";
import { scheduleQueue } from "./scheduler";

export interface Context {
  [key: string]: any;
  scope: Record<string, any>;
  delimiters: [string, string];
  delimitersRE: RegExp;
  effect: (fn: Function) => void;
  effects: WeakMap<Node, Function>;
}

/** 创建上下文 */
export const createContext = (): Context => {
  return {
    scope: reactive({}),
    delimiters: ["{{", "}}"],
    delimitersRE: /\{\{([^]+?)\}\}/g,
    effects: new Map(),
    effect: fn => scheduleQueue.set(fn),
  };
};

/**
 * 绑定this指向
 * @param scope 绑定的对象
 * @returns
 */
export const bindContextMehods = (scope: Context["scope"]): Context["scope"] => {
  for (const key of Object.keys(scope)) {
    if (typeof scope[key] === "function") {
      scope[key] = scope[key].bind(scope);
    }
  }

  return scope;
};
