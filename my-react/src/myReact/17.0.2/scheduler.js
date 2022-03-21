// 不同的任务有不同的timeout
let deadline = 0;
// 随便写的时间
const slice = 5;

// 未过期的任务
const timerQueue = [];
// 过期的任务 来自timerQueue
const taskQueue = [];

export function scheduleCallback(callback) {
  // 源码中的newTask参数比较多，比如sortIndex
  const newTask = { callback };
  timerQueue.push(newTask);
  schedule(flushWork);
}

export function schedule(callback) {
  taskQueue.push(callback);
  postMessage();
}

const postMessage = () => {
  const { port1, port2 } = new MessageChannel();
  port1.onmessage = () => {
    let tem = taskQueue.splice(0, taskQueue.length);
    tem.forEach((c) => c());
  };
  port2.postMessage(null);
};

function flushWork() {
  //不同的任务应该有不同的deadline
  deadline = getCurrentTime() + slice;
  let currentTask = timerQueue[0];
  while (currentTask && !shouldYield()) {
    currentTask.callback();
    timerQueue.shift();
    currentTask = timerQueue[0];
  }
}

export function shouldYield() {
  return getCurrentTime() >= deadline;
}
export function getCurrentTime() {
  return performance.now();
}
