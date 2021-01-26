# 创建项目
- ``mkdir myapp && cd myapp``
- ``yarn create @umijs/umi-app``或者``npx @umijs/create-umi-app``
- 安装依赖

## 路由
#### 创建路由
- ⼿动创建或者使⽤下⾯的命令。
  - 建⽴⽂件夹more(默认是js和css)：
  - 使用命令``umi g page more/more --typescript --less``
  - 如果使用的``npx``创建的项目，需要在命令前面加上npx，全局安装的不需要

#### 配置路由
默认配置都在``.umirc.ts``routes，可以单独抽离成一个文件。
基本参数：
- ``path``string类型
- ``component``string类型
  - 配置 location 和 path 匹配后用于渲染的 React 组件路径。
  - 可以是绝对路径，也可以是相对路径，
  - 如果是相对路径，会从 src/pages 开始找起。
- ``exact``boolean类型默认为true
  - 表示是否严格匹配
- ``routes``配置子路由
- ``redirect``string类型，重定向
- ``title``string类型，配置路由标题
- ``wrappers``string[]类型
  - 配置路由的高阶组件封装
  - 可以用来做权限控制
  ```
  export default {
    routes: [
      { path: '/user', component: 'user',
        wrappers: [
          '@/wrappers/auth',
        ],
      },
      { path: '/login', component: 'login' },
    ]
  }


  import { Redirect } from 'umi'
  export default (props) => {
    const { isLogin } = useAuth();
    if (isLogin) {
      return <div>{ props.children }</div>;
    } else {
      return <Redirect to="/login" />;
    }
  }
  ```
- 路由可以嵌套
- 路由组件参数，可通过props获取
  - ``match``当前路由和url match后的对象，包含``params``、 ``path``、``url``和``isExact``属性
  - ``location``表示当前处于哪个位置，包含``pathname``、``search``、``query``等属性
  - ``history``同api
  - ``route``当前路由配置，包含``path``、``exact``、``component``、``routes``等
  - ``routes``全部路由信息
- 传递参数给子路由
  - 通过cloneElement
  ```
  import React from 'react';
  export default function Layout(props) {
    return React.Children.map(props.children, child => {
      return React.cloneElement(child, { foo: 'bar' });
    });
  }
  ```

#### 约定式路由
除了配置式路由外，也支持约定式路由。不需要手写配置，通过目录和文件及其命名分析出路由配置。  
在没有routes配置时，会进入约定式路由模式。  
该模式下匹配有相应的规则，详情可查看文档。

#### 动态路由
约定``[]``包裹的文件或者文件夹为动态路由。  
例如：
- ``src/pages/users/[id].tsx`` 会成为 ``/users/:id``
- ``src/pages/users/[id]/settings.tsx`` 会成为 ``/users/:id/settings``

#### 动态可选路由
约定``[ $]``包裹的文件或者文件夹为动态路由。  
例如：
- ``src/pages/users/[id$].tsx`` 会成为 ``/users/:id?``
- ``src/pages/users/[id$]/settings.tsx`` 会成为 ``/users/:id?/settings``

#### 扩展路由属性
支持在代码层通过导出静态属性的方式扩展路由。
例如：
```
function HomePage() {
  return <h1>Home Page</h1>;
}
HomePage.title = 'Home Page';
export default HomePage;
```
其中的``title``会附加到路由配置中。

## 运行时配置