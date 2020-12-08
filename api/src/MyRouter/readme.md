##  react-router
包含三个库，react-router、react-router-dom和react-router-native。  
react-router提供最基本的路由功能，实际使用我们不会直接安装react-router。而是根据运行环境安装后面两种，他们依赖react-router。安装时会自动安装react-router。react-router-dom用于浏览器端，react-router-nativ用于rn中

##  基本使⽤用
react-router奉行一切皆组件的思想，路由器Router、链接Link、独占Switch、重定向Redirect都是以组件的形似存在  
routerPage页面有对应的demo

##  Router的三种渲染方式
children>component>render  
三者都能接受同样的router props，包括match、location、history，但是当不匹配的时候children的match为null
这三种方式互斥

children和render是函数  
区别在于children不管location是否匹配，都会渲染，其他一样  

component顾名思义组件的形式，只在当location匹配的时候渲染。  
component渲染的时候调用的React.createElementruguo使用匿名函数的形式调用，每次都会是一个新的的匿名组件，导致生成的type总是不相同，这个时候会产生重复的卸载和挂载。因此，当⽤用到内联函数的内联渲染
时，请使⽤用render或者children。

##  动态路由
使⽤用:id的形式定义动态路路由  
定义路路由:
```
<Route path="/video/:id" component={Video} />
```
添加导航链接:
```
<Link to={"/video/123"}>小苹果</Link>
```
获取参数
```
function Video({location, match}) {
    console.log("match", match); 
    const {id} = match.params;
    return <h1>Video-{id}</h1>;
}
```

##  嵌套路路由
Route组件嵌套在其他页面组件中就产生了嵌套关系，就像组件套组件一样


##  MyRouter文件夹简化版的实现相关api
原理在对应的文件内

Context.js-->跨层级数据传递

Router.js-->最顶层，作用就是传递通用的属性信息

BrowserRouter.js-->将history传递给Router  
<BrowserRouter> 使⽤用 HTML5 提供的 history API ( pushState ,  replaceState 和  popstate 事
件) 来保持 UI 和 URL 的同步
<HashRouter> 使⽤用 URL 的  hash 部分（即  window.location.hash ）来保持 UI 和 URL 的同步。
basename: string  
所有URL的base值。如果你的应⽤用程序部署在服务器器的⼦子⽬目录，则需要将其设置为⼦子⽬目录。 basename  
的格式是前⾯面有⼀个/，尾部没有/。

Link.js-->跳转的组件，本质是一个a标签  
Route.js-->匹配path值渲染对应的组件  

hooks.js-->解决函数组件读取路由信息的问题，提供了useHistory，useRouteMatch，useLocation，useParams  
withRouter.js-->解决类组件获取路由信息的问题  
例如：render={() => <Product />这样如果不通过hooks或者withRouter实现的方法，Product就获取不到相关的信息  
hooks，withRouter都是通过的context的跨组件通信的方式实现的

Switch.js-->独占路由，这个相对上面的api要复杂点，只能接收两种子组件Route，Redirect。渲染匹配到的路由

Redirect.js-->重定向
to: string  
要重定向到的 URL，可以是 path-to-regexp 能够理解的任何有效的 URL 路径。所有要使⽤的 URL 参数
必须由 from 提供。  
to: object  
要重定向到的位置，其中 pathname 可以是 path-to-regexp 能够理解的任何有效的 URL 路径。
push: bool  
当 true 时，重定向会将新地址推入 history 中，而不是替换当前地址。  

Prompt.js-->用于在用户离开页面之前及时提示用户。当你的应用程序进入应阻止用户离开的状态时（比如一个表格被填满了一半），渲染一个 <Prompt> 。  
message: string  
当用户试图离开时提示用户的消息。  
message: func  
将用户试图前往到的下一个 Location 和 action 调用。返回一个字符串以向用户显示提示符，或返回 true 以允许转换。  
when: bool  
你可以一直渲染而不是在警示框出现之后才渲染一个 <Prompt> ，但是可以通过 when={true} 或 when={false} 来阻止或允许相应的导航。