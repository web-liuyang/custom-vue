import type { Context } from "../context";
import { execute } from "../execution";
export { text } from "./text";

/**
 * 指令处理
 * @param node node节点
 * @param dir 指令
 * @param expression 表达式
 * @param ctx 上下文
 */
export const processDirective = (node: Node, dir: Function, expression: string, ctx: Context) => {
  const get = () => execute(node, expression, ctx);

  /** 执行指令 */
  dir({ node, get, ctx, expression });
};
