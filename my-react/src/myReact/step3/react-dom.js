// 下一个任务
let nextUnitOfWork = null;
// 当前执行的任务（父节点）
let wipRoot = null;
// 当前的根节点 用于添加任务使用
let currentRoot = null;
// 当前进行中的fiber
let wipFiber = null;
// 待删除的队列
let deletions = null;
// fiber结构
/**
 * type 类型
 * key 当前层级唯一性
 * props 属性
 * base 上一次更新的fiber节点
 * child 第一个子节点
 * sibling 下一个兄弟节点
 * return 父节点
 * stateNode 真实dom节点
 * effectTag 标识操作类型
 */
// vnode--虚拟dom  container宿主原素
function render(vnode, container) {
    // console.log(vnode);
    // // 1.vnode转换成node
    // const node = createNode(vnode)
    // // 2.更新dom
    // container.appendChild(node)
    wipRoot = {
        stateNode: container,
        props: {
          children: [vnode]
        }
      };
    nextUnitOfWork = wipRoot;
    deletions = [];
}
// 创建真实的dom节点
function createNode(fiber){
    let node;
    const {type, props} = fiber
    if (type === 'TEXT') {
        node = document.createTextNode("");
    } else if (typeof type === "string") {
        node = document.createElement(type);
    }else if(type ==undefined){
        // 源码中没有这么做，是直接协调的子节点
        node =document.createDocumentFragment()
    }
    // 处理子节点
    // reconcileChildren(props.children,node)
    // 属性处理 新增配有prevProps
    updateNode(node, {}, props);
    return node;
}

function updateNode(node, prevVal, nextVal) {
    Object.keys(prevVal)
    .filter(k => k !== "children")
    .forEach(k => {
        // 源码中不是这样处理的，挂在了document上，事件代理
        // 17版本挂在了container上
        if (k.slice(0, 2) === "on") {
            let eventName = k.slice(2).toLowerCase();
            node.removeEventListener(eventName, prevVal[k]);
        } else {
            if (!(k in nextVal)) {
              node[k] = "";
            }
        }
    })
    // 文本内容我们放到了node属性上（nodeValue） 所以直接按照节点属性处理就好了 
    Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
        // 源码中不是这样处理的，挂在了document上，事件代理
        // 17版本挂在了container上
        if (k.slice(0, 2) === "on") {
            let eventName = k.slice(2).toLowerCase();
            node.addEventListener(eventName, nextVal[k]);
        } else {
            node[k] = nextVal[k];
        }
    })
}
// 函数组件处理
function updateFunctionComponent(fiber){
    wipFiber = fiber;
    wipFiber.hooks = [];
    wipFiber.hookIndex = 0;
    const {type,props}=fiber
    let children = [type(props)];
    // 然后协调子节点
    reconcileChildren(fiber, children);
}
// 类组件处理
function updateClassComponent(fiber){
    const {type,props}=fiber
    let children = [new type(props).render()]
    // 然后协调子节点
    reconcileChildren(fiber,children)
}
// 原生节点
function updateHostComponent(fiber){
    // 判断是否有stateNode是否存在，不存在就创建
    if (!fiber.stateNode) {
        fiber.stateNode = createNode(fiber);
    }
    // 然后协调子节点
    const {children} = fiber.props;
    reconcileChildren(fiber, children);
}
function reconcileChildren(work,children){
    // console.log('children',children);
    let prevFiber=null
    let oldFiber = work.base&&work.base.child
    for(let i=0;i<children.length;i++){
        let child =children[i]
        // console.log(oldFiber);
        // console.log(child);
        // 判断是否能复用，这里没有考虑key
        // 以下判断为终极简化版本
        let same =child&& oldFiber&&oldFiber.type===child.type
        let newFiber
        if(same){
            // 更新
            newFiber = {
                type:child.type,
                props:child.props,
                stateNode:oldFiber.stateNode,
                base:oldFiber,
                return:work,
                effectTag:'UPDATE'
            }
        }
        else if(!same && child){
            // 新增插入
            newFiber = {
                type:child.type,
                props:child.props,
                stateNode:null,
                base:null,
                return:work,
                effectTag:'PLACEMENT'
            }
        }
        
        if (!same && oldFiber) {
            // 删除
            oldFiber.effectTag = 'DELETION';
            deletions.push(oldFiber);
        }
        if(i===0){
            work.child=newFiber
        }else{
            prevFiber.sibling=newFiber
        }
        prevFiber = newFiber
        if(oldFiber){
            oldFiber=oldFiber.sibling
        }
    }
}
function performUnitOfWork(fiber){
    // 执行当前的任务，根据节点类型处理
    const {type} = fiber
    // 因为根没有type值原生标签的处理直接放入else逻辑中
    if (typeof type === "function") {
        type.prototype.isReactComponent
          ? updateClassComponent(fiber)
          : updateFunctionComponent(fiber);
      } else {
        updateHostComponent(fiber);
    }
    // 返回下一个任务
    if (fiber.child) {
        return fiber.child;
      }
    let nextFiber = fiber;
    while (nextFiber) {
        if (nextFiber.sibling) {
          return nextFiber.sibling;
        }
        nextFiber = nextFiber.return;
    }
}
function workLoop(idledeadline){
    // 当前有需要更新的fiber，并且浏览器有空闲时间
    while(nextUnitOfWork&&idledeadline.timeRemaining()>1){
        // 执行任务
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }
    // 判断是否还有任务待执行，是否有父节点
    if(!nextUnitOfWork&&wipRoot){
        // 提交更新
        commitRoot()
    }
    // 有任务就要循环执行
    requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)
function commitRoot(){
    deletions.forEach(commitWorker);
    commitWorker(wipRoot.child);
    currentRoot = wipRoot
    wipRoot = null;
}
function commitDeletios(fiber,parentNode){
    if (fiber.stateNode) {
        parentNode.removeChild(fiber.stateNode);
    } else {
        commitDeletios(fiber.child, parentNode);
    }
}
function commitWorker(fiber){
    if(!fiber){
        return
    }
    // 找到对应的父节点或者祖先节点
    // 为什么是祖先节点？
    // 不一定最近的层级就是可以挂在的dom节点，例如provider
    // 新增
    let parentNodeFiber = fiber.return
    while(!parentNodeFiber.stateNode){
        parentNodeFiber=parentNodeFiber.return
    }
    let parentNode = parentNodeFiber.stateNode
    // 新增
    if (fiber.effectTag === 'PLACEMENT' && fiber.stateNode) {
        parentNode.appendChild(fiber.stateNode);
    }else if (fiber.effectTag === 'UPDATE' && fiber.stateNode) {
        // 更新属性
        updateNode(fiber.stateNode, fiber.base.props, fiber.props);
    } else if (fiber.effectTag === 'DELETION' && fiber.stateNode) {
        // 删除
        commitDeletios(fiber, parentNode);
    }
    
    commitWorker(fiber.child);
    commitWorker(fiber.sibling);
}

export function useState(init){
    const oldHook = wipFiber.base && wipFiber.base.hooks[wipFiber.hookIndex];
    // 当前要返回的hook
    const hook = {
        // 状态值
        state: oldHook ? oldHook.state : init,
        // 更新队列  
        queue: oldHook ? oldHook.queue : []
    }
    // 后面的会覆盖前面的,这里简单的模拟下批量处理
    hook.queue.forEach(action => (hook.state = action))

    const setState=(action)=>{
        // 将操作入队列等待更新的时候重新执行useState
        hook.queue.push(action)
        wipRoot = {
            stateNode: currentRoot.stateNode,
            props: currentRoot.props,
            base: currentRoot
        }
        nextUnitOfWork = wipRoot
        deletions = [];
    }
    wipFiber.hooks.push(hook);
    wipFiber.hookIndex++;
    return [hook.state, setState]
}
export default {render}