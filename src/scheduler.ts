/** 响应式对象合集 */
export const reactiveObjs = [];

/** 调度队列 */
class ScheduleQueue {
  /** Map队列 */
  _queueMap: Map<string, Function> = new Map();

  /**
   * 获取Key
   * @param key key
   * @returns
   */
  getKeys(key: string) {
    const keys = key.split("+").map(item => item.trim());
    return keys;
  }

  /**
   * 设置队列
   * @param fn 触发的函数
   */
  set(fn: Function) {
    const key = fn();
    this._queueMap.set(key, fn);
  }
  /**
   * 调度 更新视图
   * @param p 属性值
   */
  scheduler(p: string) {
    for (const [key, fn] of this._queueMap) {
      const keys = this.getKeys(key);
      if (keys.includes(p)) {
        fn();
      }
    }
  }
}

export const scheduleQueue = new ScheduleQueue();
