<script setup lang="ts">
import { markRaw, ref } from 'vue'
import { VueFlow, useVueFlow, type Edge, type Node } from '@vue-flow/core'
import EventNode from './nodes/nodeWithEvent/index.vue'
import LogicNode from './nodes/nodeWithLogic/index.vue'
import '@vue-flow/core/dist/style.css'

// 注册自定义节点类型
const nodeTypes = {
  eventNode: markRaw(EventNode),
  logicNode: markRaw(LogicNode)
}

// 初始节点数据
const initialNodes:Node[] = [
  {
    id: 'harmful-event',
    type: 'eventNode',
    position: { x: 0, y: 0 },
    data: {
      label: '有害事件_0',
      conditions: [
        { id: 'X', label: '条件X', result: 'B类结果', status: false },
        { id: 'Y', label: '条件Y', result: 'A类结果', status: true }
      ]
    }
  },
  {
    id: 'event-b',
    type: 'eventNode',
    position: { x: 0, y: 150 },
    data: {
      label: '事件B',
      inputs: ['输入1'],
      outputs: ['输出1', '输出2', '输出2']
    }
  },
  {
    id: 'logic-and',
    type: 'logicNode',
    position: { x: 250, y: 200 },
    data: {
      label: '逻辑AND',
      type: 'and',
      conditions: [
        { label: '时间条件', status: true },
        { label: '资源条件', status: true }
      ]
    }
  },
  {
    id: 'event-a',
    type: 'eventNode',
    position: { x: 500, y: 100 },
    data: {
      label: '事件A',
      inputs: ['输入1', '输入2', '输入3'],
      outputs: ['输出1']
    }
  },
  {
    id: 'logic-or',
    type: 'logicNode',
    position: { x: 750, y: 100 },
    data: {
      label: '逻辑_OR_0',
      type: 'or',
      conditions: [
        { label: '质量', status: true },
        { label: '结果', result: 'A类结果', status: false }
      ]
    }
  }
]

// 初始边数据
const initialEdges:Edge[] = [
  {
    id: 'e1-2',
    source: 'event-b',
    target: 'event-a',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#00ff00', strokeDasharray: '5 5' }
  },
  {
    id: 'e1-3',
    source: 'event-b',
    target: 'logic-and',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#00ff00', strokeDasharray: '5 5' }
  },
  {
    id: 'e2-3',
    source: 'logic-and',
    target: 'event-a',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ff0000' }
  },
  {
    id: 'e4-5',
    source: 'event-a',
    target: 'logic-or',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ffa500' }
  }
]

const { onConnect, addEdges } = useVueFlow()

const nodes = ref<Node[]>(initialNodes)
const edges = ref<Edge[]>(initialEdges)


// 处理节点连接
onConnect((params) => {
  addEdges([
    {
      ...params,
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#00ff00', strokeDasharray: '5 5' }
    }
  ])
})
</script>

<template>
  <div style="width: 100vw; height: 100vh; background-color: #1a1a1a">
    <VueFlow
      v-model="nodes"
      :edges="edges"
      :node-types="nodeTypes"
      :default-viewport="{ x: 0, y: 0, zoom: 1.5 }"
      :min-zoom="0.2"
      :max-zoom="4"
      fit-view-on-init
    >
      <Background pattern-color="#444" :gap="20" />
    </VueFlow>
  </div>
</template>

<style>
.vue-flow__node {
  border-radius: 8px;
  padding: 10px;
  color: #fff;
}

.vue-flow__handle {
  width: 8px;
  height: 8px;
  background-color: #fff;
}

.vue-flow__handle.connected {
  background-color: #00ff00;
}
</style>
