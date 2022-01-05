import { Context } from "./context";
import { scheduleQueue } from "./scheduler";

/** 创建响应式对象 */
export const reactive = <T extends object>(obj: T, ctx?: Context): T => {
  // 在这个对象的时候我就要知道 需要触发更新的函数是什么
  const newObj = new Proxy(obj, {
    get(target: T, p: string | symbol, receiver: any) {
      const value = Reflect.get(target, p, receiver);

      return value;
    },
    set(target: T, p: string, value: any, receiver: any) {
      const success = Reflect.set(target, p, value, receiver);

      // console.log(map.get(p).updater);

      /** 调度 */
      success && scheduleQueue.scheduler(p);

      return success;
    },
  });

  return newObj;
};
