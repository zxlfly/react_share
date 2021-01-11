// 下一个任务
let nextUnitOfWork=null
// 当前执行的任务（父节点）
let workInProgress = null
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
 * 
 */
// vnode--虚拟dom  container宿主原素
function render(vnode,container){
    // console.log(vnode);
    // 1.vnode转换成node
    const node = createNode(vnode)
    // 2.更新dom
    container.appendChild(node)
}
// 创建真是的dom节点
function createNode(vnode){
    let node
    const {type,props}=vnode
    if(type=='TEXT'){
        node=document.createTextNode("")
    }else if(typeof type =='string'){
        node = document.createElement(type)
    }else if(typeof type =='function'){
        node = type.prototype.isReactComponent
        ?updateClassComponent(vnode)
        :updateFunctionComponent(vnode)
    }else{
        // 源码中没有这么做，是直接协调的子节点
        node =document.createDocumentFragment()
    }
    // 处理子节点
    reconcileChildren(props.children,node)
    // 属性处理
    updateNode(node,props)
    return node
}
// 类组件处理
function updateClassComponent(vnode){
    const {type,props}=vnode
    let classVnode = new type(props).render()
    return createNode(classVnode)
}
// 函数组件处理
function updateFunctionComponent(vnode){
    const {type,props}=vnode
    let fnVnode = type(props)
    return createNode(fnVnode)
}
function updateNode(node,props){
    // 文本内容我们放到了node属性上（nodeValue） 所以直接按照节点属性处理就好了 
    Object.keys(props).filter(k=>k!=="children").forEach(k=>{
        node[k]=props[k]
    })
}
function reconcileChildren(children,node){
    // 遍历vnode 处理
    for(let i=0;i<children.length;i++){
        render(children[i],node)
    }
}
function commitRoot(){

}
// 原生节点
function updateHostComponent(fiber){
    // 判断是否有stateNode是否存在，不存在就创建，否则更新
    // 然后协调子节点
}
function perforunitOfWork(fiber){
    // 执行当前的任务，根据节点类型处理

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
    if(nextUnitOfWork&&idledeadline.timeRemaining()>1){
        // 执行任务
        nextUnitOfWork = perforunitOfWork(nextUnitOfWork)
    }
    // 判断是否还有任务待执行，是否有父节点
    if(!nextUnitOfWork&&workInProgress){
        // 提交更新
        commitRoot()
    }
    // 有任务就要循环执行
    requestIdleCallback(workLoop)
}
window.requestIdleCallback(workLoop)
export default {render}