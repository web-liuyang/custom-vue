import type { Context } from "../context";

/** 指令参数 */
export interface DirectiveOptions {
  /** node 节点 */
  node: Node;
  /** 获取表达式的返回值 */
  get: Function;
  /** 上下文 */
  ctx: Context;
  expression: any;
}

/**
 * 指令函数
 * @param options 指令参数
 */
export type Directive = (options: DirectiveOptions) => unknown;
