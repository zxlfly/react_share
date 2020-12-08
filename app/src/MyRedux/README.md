##  什么是reducer
reducer就是一个纯函数，接受旧的state和action，返回新的state
（不要在纯函数里面修改传入参数，执行有副作用的操作，调用非纯函数）reduce的回调所以叫这个名字
##  什么是reduce
一个数组api，用于聚合操作
```
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;
// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10
// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
```
##  reducer 函数接收4个参数:arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
callback  
执行数组中每个值 (如果没有提供 initialValue则第一个值除外)的函数，包含四个参数：
accumulator  
累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue

currentValue  
数组中正在处理的元素。  
index 可选  
数组中正在处理的当前元素的索引。 如果提供了initialValue，则起始索引号为0，否则从索引1起始。  
array可选  
调用reduce()的数组  
initialValue可选  
作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。  

##  reduce不仅可以做简单的算数操作，还可以用来实现函数聚合compose
```
function f1(arg) {
    console.log("f1", arg);
    return arg;
}
function f2(arg) {
    console.log("f2", arg);
    return arg;
}
function f3(arg) {
    console.log("f3", arg);
    return arg;
}

function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg
    }
    if (funcs.length === 1) {
        return funcs[0]
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
console.log(compose(f1, f2, f3)("omg"));
```

##  原理
redux文件夹下分为多步，手写一个redux  
readme有注解
