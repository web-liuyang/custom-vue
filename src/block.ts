import type { Context } from "./context";
import { templateCompiler } from "./templateCompiler";

/** 创建DOM节点外层 */
export class Block {
  private template: Element;
  private ctx: Context;

  constructor(template: Element, ctx: Context, isRoot) {
    this.template = template;

    /** 模板编译 */
    templateCompiler(template, ctx);
  }
}
