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