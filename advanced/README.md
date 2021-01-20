## Generator
**Generator**是es6提供的一种异步编程解决方案，语法行为与传统函数完全不同
- function关键字与函数名之间有一个*
- 函数体内部使用**yield**表达式，定义不同的状态
- **yield**只能在**Generator**函数内部使用
- **yield**表达式后面的表达式，只有调用**next**方法，内部指针指向该语句的时候才会执行
- **Generator**函数返回的是一个遍历器对象，只有调用**next**方法才会遍历下一个内部状态。
- 其实就是一种可以暂停执行的函数，yield就是暂停标识
- 每次调用**next**方法后，会返回一个有着**value**和**done**两个属性的对象。
  - **value**标识当前内部的状态值，就是**yield**后面表达式的值
  - **done**是一个布尔值，表示是否遍历结束
```
function* helloWorld() {
 yield 'hello';
 yield 'world';
 return 'ending';
}
var hw = helloWorld();
//执行
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
```

## 路由守卫-PrivateRoute
思路：创建高阶组件包装Route使其具有权限判断功能


## redux-saga
- **effects**是一个js对象，里面包含描述副作用的信息，通过yield传达给sagaMiddleware执行。为了保证代码的易测性，所有的yield后面只能跟effect
- **put**作用和redux中的dispatch相同``yield put({ type: LOGIN_SUCCESS})``
- **call**与**fork**：阻塞与无阻塞调用
- **take**等待redux dispatch匹配某个pattern的action
- **takeEvery**``takeEvery(pattern, saga, ...args)``可以让多个saga任务被**fork**执行