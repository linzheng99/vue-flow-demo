- [ ] 自定义节点
  - [x] 节点中的数据 通过onDrag传入schemas（定义Json）
  - [ ] node toolbar
  - [x] node可以拿到谁和自己连线，还有target和source（useNodeConnections hook）
- [ ] 节点数据
  - [x] 获取全部节点 {getNodes} = useFlow()
  - [x] 单个节点数据 @node-click="onNodeClick"
- edge (对于edge的修改需要存一个store)
  - Connection line
    - [x] 开始连线 @connect-start / onConnectStart
    - [x] 连线结束后/开始后确定edge type
  - 自定义 edge
    - [x] 4个连接点 (如果做目标点连接的话需要额外对edge的属性做处理比如sourceHandle: 'source-right', targetHandle: 'target-top')
    - [x] 添加edge时对edge的控制
    - [x] computed svg path (官网的path函数getSmoothStepPath)
    - [x] type: (straight,smoothstep,step)
    - [x] 自定义label (BaseEdge组件 + EdgeLabelRender组件) & path (getSmoothStepPath({ ...props, borderRadius: 8 }))
    - [x] 自定义edge + 自定义label
  - handle edge - (add,remove,update)
    - [x] 条件变换edge的svg color (使用id存color到一个对象)(edge也是一样)
  - [ ] edge marker
  - [x] 固定连线规则
- [x] 背景样式 Background
- [ ] 一个组的node（Nested Nodes）
- [ ] 点击出现弹窗
- [ ] 放大出现更多节点

# 设计
- 一个数据store
  - edge的color
- 自定义node
  - 数据结构
- 自定义edge
  - 数据结构
- 自定义svg
- 自定义connection line

# Demo
绘制出来一个nodes + edges，用json 导出来 做默认
- [ ] 实现node之上的交互
  - [x] 自定义2个node（node上要有开关，交互, 改变颜色等）
  - [x] 改变本node相关的edge属性(通过store去改变)

- [ ] 罗列普通的，罗列自定义的

- [ ] 点击出现弹窗
- [ ] 放大出现更多节点
