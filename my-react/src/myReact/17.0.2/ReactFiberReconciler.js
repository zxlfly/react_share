import {isArray, isStringOrNumber, Update, updateNode} from "./utils";
import createFiber from "./createFiber";
import {renderHooks} from "./hooks";

export function updateHostComponent(wip) {
  // 初次渲染 创建dom节点
  // 更新 不创建dom节点
  if (!wip.stateNode) {
    wip.stateNode = document.createElement(wip.type);
    updateNode(wip.stateNode, {}, wip.props);
  }

  // 协调子节点
  reconcileChildren(wip, wip.props.children);
}

export function updateFunctionComponent(wip) {
  renderHooks(wip);

  const {type, props} = wip;
  const children = type(props);
  reconcileChildren(wip, children);
}

export function updateFragmentComponent(wip) {
  const {props} = wip;
  reconcileChildren(wip, props.children);
}
// 1. 更新自己
// 2. 协调子节点

function reconcileChildren(returnFiber, children) {
  if (isStringOrNumber(children)) {
    return;
  }

  const newChildren = isArray(children) ? children : [children];

  let previousNewFiber = null;
  let oldFiber = returnFiber.alternate && returnFiber.alternate.child;
  // diff
  // 1 2 3 4
  // 2 3 4
  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i];
    const newFiber = createFiber(newChild, returnFiber);

    if (sameNode(newFiber, oldFiber)) {
      // 节点可以复用
      Object.assign(newFiber, {
        alternate: oldFiber,
        stateNode: oldFiber.stateNode,
        flags: Update,
      });
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    if (previousNewFiber === null) {
      returnFiber.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }

    previousNewFiber = newFiber;
  }
}

function sameNode(a, b) {
  return !!(a && b && a.key === b.key && a.type && b.type);
}
