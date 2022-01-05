import { Context } from "./context";
import { processDirective, text as dirText } from "./direction";

/**
 * 模版编译
 */
export const templateCompiler = (node: Node, ctx: Context): ChildNode | null | void => {
  // debugger;
  const type = node.nodeType;
  /** 节点判断 */
  if (type === Node.ELEMENT_NODE) {
    /** 处理DOM节点 */
    const el = node as Element;
    templateCompilerChild(el, ctx);
  } else if (type === Node.TEXT_NODE) {
    /** 处理文本节点 */
    /** 文本 */
    const text = (node as Text).data;

    /** 先判断是否存在 {{ 符号，为了减少开销 */
    if (text.includes(ctx.delimiters[0])) {
      /** 内容碎片 */
      const fragments: string[] = [];
      /** 内容匹配到最后的下标 */
      let lastIndex: number = 0;
      /** 正则匹配到的值 */
      let match: RegExpExecArray;

      // 获取 模版中 {{}}的值
      while ((match = ctx.delimitersRE.exec(text))) {
        /** 匹配之前的文本 */
        const beforeText = text.slice(lastIndex, match.index);

        if (beforeText) {
          /**
           * 因为等下要渲染值
           * 非匹配到的值，要JSON包裹一下
           * 要不然要报错
           */
          fragments.push(JSON.stringify(beforeText));
        }
        /** 渲染文本 */
        const renderText = match[1];
        fragments.push(renderText);

        /** 把最后下标定位在 }} 后面 */
        lastIndex = match[0].length + match.index;
      }

      if (lastIndex < text.length) {
        const afterText = text.slice(lastIndex);
        /**
         * 因为等下要渲染值
         * 非匹配到的值，要JSON包裹一下
         * 要不然要报错
         */
        fragments.push(JSON.stringify(afterText));
      }

      /** 表达式 */
      const expression = fragments.join("+");

      /** 指令过程处理 */
      processDirective(node, dirText, expression, ctx);
    }
  }
};

/** 兄弟/子节点编译 */
export const templateCompilerChild = (node: Element, ctx: Context): void => {
  let child = node.firstChild;

  while (child) {
    // 子节点编译完成后 ， 进行兄弟节点编译
    child = templateCompiler(child, ctx) || child.nextSibling;
  }
};
