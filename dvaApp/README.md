## 安装[dva](https://dvajs.com/)
``npm install dva-cli -g``  

## 使用antd
``npm install antd babel-plugin-import --save``
**babel-plugin-import**是用来按需加载antd的，需要配置``.webpackrc``
```
{
  "extraBabelPlugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
  ]
}
```

## 定义路由
路由页面定义在``src/routes``内，然后在``router.js``中配置路由表

## 公用的ui组件
可复用的组件放在``src/components``内

## 定义Model
dva通过model的概念把一个领域的模型管理起来，包含同步更新state的reducers，处理异步逻辑的effcts，订阅数据源的subscriptions。  
使用方法就是``react-redux``的``connect``  
最后在入口``index.js``导入``app.model(require('./models/products').default);``  
如果需要有初始化的数据可以在运行dva函数的时候注入
```
const app = dva({
    initialState: {
        products: [
            { name: 'dva', id: 1 },
            { name: 'antd', id: 2 },
        ],
    },
})
```

## mock
- 自定义的mock数据，在``mock``问价下定义**api**，
- 在``.roadhogrc.mock.js``配置**mock**
- 在services下配置请求接口业务逻辑


## [报错解决](https://github.com/dvajs/dva/issues/2115)
```
Warning: Please use `require("history").createHashHistory` instead of `require("history/createHashHistory")`. Support for the latter will be removed in the next major release.
```
- 打开node_modules/dva/lib/index/js：
- 找到(22行)``var _createHashHistory =_interopRequireDefault(require("history/createHashHistory"));``
- 改成：``var _createHashHistory =_interopRequireDefault(require("history").createHashHistory);``

## dynamic
如果有多个model，都在入口页面加载，项目大了model多了可能会影响速度，很多model初始化就加载，只需要在对应模块组件页面加载的时候一起加载就可以了。dynamic就可以处理这个问题。
- 首先需要把入口的app单独抽离出来
  - 本示例中为``app.js``
  - 然后原来的入口页面直接导入即可。不需要默认的初始化了
- 新增dynamic文件夹
  - 新增对应的动态加载的模块
  - 本示例中为``UserPage``
  - 接受三个参数
    - 抽离的app实例
    - 关联的models可以有多个
    - 对应的component
  - 最后导出
- 修改路由配置
  - 原来是默认直接导入配置
  - 现在需要替换为生面导出的dynamic组件