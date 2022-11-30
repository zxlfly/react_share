##  实现react-redux
- 使用react自带api优化redux的使用体验。
- 通过React.createContext创建一个Context对象实现Provider。
- 当触发更新时，React 会遍历这个 Provider 内部所有的 fiber 节点，找出订阅了这个 Provider 的 context 的 fiber 节点。如果页面很复杂，组件层级很深数量庞大，这个开销也是很大的。所以非必要的数据不要放里面。