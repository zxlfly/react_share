import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";

let currentlyRenderingFiber = null;
let workInProgressHook = null;

export function renderHooks(wip) {
  currentlyRenderingFiber = wip;
  currentlyRenderingFiber.memorizedState = null; //hook0设置为null
  workInProgressHook = null;
}

//获取当前hook , 也是构建fibe上hook链表的过程
function updateWorkProgressHook() {
  let hook = null;
  const current = currentlyRenderingFiber.alternate;
  // 初次渲染还是更新
  if (current) {
    // 更新
    // 更新就是在老的基础上更新
    currentlyRenderingFiber.memorizedState = current.memorizedState;
    if (workInProgressHook) {
      // not head
      hook = workInProgressHook = workInProgressHook.next;
    } else {
      // head hook
      hook = workInProgressHook = current.memorizedState;
    }
  } else {
    // 初次渲染
    hook = { memorizedState: null, next: null };
    if (workInProgressHook) {
      // not head
      workInProgressHook = workInProgressHook.next = hook;
    } else {
      // head hook
      workInProgressHook = currentlyRenderingFiber.memorizedState = hook;
    }
  }

  return hook;
}
// hook {memorizedState状态值，next指向下一个hook }
export function useReducer(reducer, initialState) {
  // 获取到当前useReducer对应的hook
  const hook = updateWorkProgressHook();

  if (!currentlyRenderingFiber.alternate) {
    // 初次渲染

    hook.memorizedState = initialState;
  }
  // 这里没有像源码中bind，如果出现多个函数组件，可能存在fiber指向错误问题。
  const dispatch = (action) => {
    hook.memorizedState = reducer(hook.memorizedState, action);
    //从函数开始更新，也就是得拿到函数组件的fiber
    scheduleUpdateOnFiber(currentlyRenderingFiber);
  };
  // todo
  return [hook.memorizedState, dispatch];
}
