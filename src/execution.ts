import { Context } from "./context";

/**
 * 执行表达式并返回
 * @param node 节点
 * @param exp 表达式
 * @param ctx 上下文
 * @returns
 */
export const execute = (node: Node, expression: string, ctx: Context): Function => {
  const exp = `return (${expression})`;
  const fn = funcExecute(exp);
  return fn(ctx.scope, node);
};

/**
 * 执行表达式函数
 * @param expression 表达式
 * @returns
 */
export const funcExecute = (expression: string): Function => {
  return new Function(
    "$data",
    "$el",
    `
    with($data){
      ${expression}
    }
  `
  );
};
