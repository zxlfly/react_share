// 下一个任务
let nextUnitOfWork=null
// 当前执行的任务（父节点）
let wipRoot = null
// fiber结构
/**
 * type 类型
 * key 当前层级唯一性
 * props 属性
 * base 上一次更新的fiber节点
 * child 第一个子节点
 * sibling 下一个兄弟节点
 * return 父节点
 * stateNode 真实dom节点，函数组件，类组件，context等是没有的
 * 
 */
// vnode--虚拟dom  container宿主原素
function render(vnode,container){
    console.log('vnode',vnode);
    // // 1.vnode转换成node
    // const node = createNode(vnode)
    // // 2.更新dom
    // container.appendChild(node)
    wipRoot ={
        stateNode : container,
        props:{
            children:[vnode]
        }
    }
    nextUnitOfWork = wipRoot
}
// 创建真是的dom节点
function createNode(fiber){
    let node
    const {type,props}=fiber
    if(type=='TEXT'){
        node=document.createTextNode("")
    }else if(typeof type =='string'){
        node = document.createElement(type)
    }
    // else if(typeof type =='function'){
    //     node = type.prototype.isReactComponent
    //     ?updateClassComponent(fiber)
    //     :updateFunctionComponent(fiber)
    // }else{
    //     // 源码中没有这么做，是直接协调的子节点
    //     node =document.createDocumentFragment()
    // }
    // 处理子节点
    // reconcileChildren(props.children,node)
    // 属性处理
    updateNode(node,props)
    return node
}

function updateNode(node,props){
    // 文本内容我们放到了node属性上（nodeValue） 所以直接按照节点属性处理就好了 
    Object.keys(props).filter(k=>k!=="children").forEach(k=>{
        node[k]=props[k]
    })
}
function reconcileChildren(work,children){
    console.log('children',children);
    let prevFiber
    for(let i=0;i<children.length;i++){
        let child =children[i]
        // 只是新增
        let newFiber = {
            type:child.type,
            props:child.props,
            child:null,
            stateNode:null,
            sibling:null,
            base:null,
            return:work
        }
        if(i===0){
            work.child=newFiber
        }else{
            prevFiber.sibling=newFiber
        }
        prevFiber = newFiber
    }
}
function commitRoot(){
    commitWorker(wipRoot.child);
    console.log(wipRoot);
    wipRoot = null;
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
    if(fiber.stateNode){
        parentNode.appendChild(fiber.stateNode)
    }
    commitWorker(fiber.child)
    commitWorker(fiber.sibling)
}
// 原生节点
function updateHostComponent(fiber){
    // 判断是否有stateNode是否存在，不存在就创建
    if(!fiber.stateNode){
        fiber.stateNode=createNode(fiber)
    }
    // 然后协调子节点
    reconcileChildren(fiber,fiber.props.children)
}
// 类组件处理
function updateClassComponent(fiber){
    const {type,props}=fiber
    let children = [new type(props).render()]
    // 然后协调子节点
    reconcileChildren(fiber,children)
}
// 函数组件处理
function updateFunctionComponent(fiber){
    const {type,props}=fiber
    let children = [type(props)];
    // 然后协调子节点
    reconcileChildren(fiber,children)
}
function updateFragmentComponent(fiber){
    let children = fiber.props.children
    reconcileChildren(fiber,children)
}
function perforunitOfWork(fiber){
    // 执行当前的任务，根据节点类型处理
    const {type} =fiber
    // 因为根没有type值原生标签的处理直接放入else逻辑中
    if (typeof type === "function") {
        type.prototype.isReactComponent
          ? updateClassComponent(fiber)
          : updateFunctionComponent(fiber);
      } else if(type===undefined){
        updateFragmentComponent(fiber)
      }else if(typeof type === "string"){
        updateHostComponent(fiber);
    }
    // 返回下一个任务
    if(fiber.child){
        return fiber.child
    }
    let nextFiber = fiber
    while(nextFiber){
        if(nextFiber.sibling){
            return nextFiber.sibling
        }
        nextFiber = nextFiber.return
    }
}
function workLoop(idledeadline){
    // 当前有需要更新的fiber，并且浏览器有空闲时间
    while(nextUnitOfWork&&idledeadline.timeRemaining()>1){
        // 执行任务
        nextUnitOfWork = perforunitOfWork(nextUnitOfWork)
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
export default {render}