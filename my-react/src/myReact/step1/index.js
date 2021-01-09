// 源码中不是...children的形式，这里是简化方便后面处理
// 原生标签type就是对应的标签名
// 函数组件就是对应的函数名
// 类组件就是对应的类名
// 文本节点这里特殊处理了，定义成了TEXT，内容放到了props.children的nodeValue上，后续当做属性处理。源码中不是这样的
function createElement(type,config,...children){
    // 清除没用的属性方便调试
    if(config){
        delete config._self
        delete config._source
    }
    const props={
        ...config,
        children:children.map(child=>typeof child ==='object'?child:CreateTxtNode(child)),
        as:999
    }
    return {
        type,
        props
    }
}
// 处理文本节点
function CreateTxtNode(text){
    return {
        type:'TEXT',
        props:{
            nodeValue:text,
            children:[]
        }
    }
}

function Component(props){
    this.props=props
}
Component.prototype.isReactComponent=true
export default {createElement,Component}