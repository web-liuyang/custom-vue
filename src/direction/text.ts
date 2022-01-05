import type { Directive } from "./types";

/**
 *  Text 编译
 */
export const text: Directive = ({ node, get, ctx, expression }) => {
  try {
    /** 存储 副作用更新 */
    // ctx.effects.set(node, dir.bind(null, { node, get, ctx }));
    ctx.effect(() => {
      node.textContent = get(ctx.scope, node);
      return expression;
    });
  } catch (e) {
    console.error(e);
  }
};
