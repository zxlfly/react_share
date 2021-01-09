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
export default {render}