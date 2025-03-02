<template>
  <div class="dnd-flow" @drop="onDrop">
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      :nodeTypes="nodeTypes"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @node-click="clickNode"
      @edge-click="clickEdge"
      fit-view-on-init
    >
      <DropzoneBackground
        :style="{
          backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
          transition: 'background-color 0.2s ease'
        }"
      >
        <p v-if="isDragOver">Drop here</p>
      </DropzoneBackground>
      <Panel position="top-right">
        <div
          class="border-1 border-solid border-gray-300 p-2.5 rounded-md flex flex-col gap-2 w-600px max-h-300px overflow-y-auto uppercase text-sm"
        >
          <div>
            <button @click="changeEdge">Update Edge</button>
          </div>
          <div class="flex flex-col gap-2">
            <div>
              <span class="text-blue-500">当前选择的node: </span>
              <span class="text-red-500">{{ selectedNode }}</span>
            </div>
            <div>
              <span class="text-blue-500">当前选择的edge: </span>
              <span class="text-red-500">{{ selectedEdge }}</span>
            </div>
          </div>
        </div>
      </Panel>
      <template #node-custom="customNodeProps">
        <CustomNode v-bind="customNodeProps" />
      </template>
      <template #node-toggle="toggleNodeProps">
        <NodeWithToggle v-bind="toggleNodeProps" />
      </template>
      <template #node-image="imageNodeProps">
        <NodeWithImage v-bind="imageNodeProps" />
      </template>
      <template #node-interface="interfaceNodeProps">
        <NodeWithInterface v-bind="interfaceNodeProps" />
      </template>
      <template #node-condition="conditionNodeProps">
        <NodeWithCondition v-bind="conditionNodeProps" />
      </template>
      <template #node-logic="logicNodeProps">
        <NodeWithLogic v-bind="logicNodeProps" />
      </template>
      <template #node-event="eventNodeProps">
        <NodeWithEvent v-bind="eventNodeProps" />
      </template>
      <template #edge-button="buttonEdgeProps">
        <EdgeWithButton
          :id="buttonEdgeProps.id"
          :source-x="buttonEdgeProps.sourceX"
          :source-y="buttonEdgeProps.sourceY"
          :target-x="buttonEdgeProps.targetX"
          :target-y="buttonEdgeProps.targetY"
          :source-position="buttonEdgeProps.sourcePosition"
          :target-position="buttonEdgeProps.targetPosition"
          :marker-end="buttonEdgeProps.markerEnd"
          :color="edgeColors[buttonEdgeProps.id]"
          :path-type="edgePathType[buttonEdgeProps.id]"
        />
      </template>
      <template #edge-flow-animated="flowAnimatedEdgeProps">
        <EdgeWithFlowAnimated v-bind="flowAnimatedEdgeProps" />
      </template>
      <template #edge-flow-voltage="flowVoltageEdgeProps">
        <EdgeWithFlowVoltage v-bind="flowVoltageEdgeProps" />
      </template>
      <template #edge-flow-water="flowWaterEdgeProps">
        <EdgeWithFlowWater v-bind="flowWaterEdgeProps" />
      </template>
      <template #edge-data-transfer="dataTransferEdgeProps">
        <EdgeWithDataTransfer v-bind="dataTransferEdgeProps" />
      </template>
      <template #edge-air="airEdgeProps">
        <EdgeWithAir v-bind="airEdgeProps" />
      </template>
      <template #edge-heat="heatEdgeProps">
        <EdgeWithHeat v-bind="heatEdgeProps" />
      </template>
    </VueFlow>

    <Sidebar />
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'
import {VueFlow, useVueFlow, Panel, type NodeMouseEvent, type EdgeMouseEvent} from '@vue-flow/core'
import DropzoneBackground from './DropzoneBackground.vue'
import Sidebar from './Sidebar.vue'
import useDragAndDrop from './hooks/useDnD.ts'
import CustomNode from './nodes/CustomNode.vue'
import EdgeWithButton from './edges/EdgeWithButton.vue'
import NodeWithLogic from './nodes/nodeWithLogic/index.vue'
import NodeWithEvent from './nodes/nodeWithEvent/index.vue'
import NodeWithToggle from './nodes/nodeWithToggle/index.vue'
import NodeWithImage from './nodes/nodeWithImage/index.vue'
import NodeWithInterface from './nodes/nodeWithInterface/index.vue'
import NodeWithCondition from './nodes/nodeWithCondition/index.vue'
import EdgeWithFlowAnimated from './edges/EdgeWithFlowAnimated.vue'
import EdgeWithFlowVoltage from './edges/EdgeWithFlowVoltage.vue'
import EdgeWithFlowWater from './edges/EdgeWithFlowWater.vue'
import EdgeWithDataTransfer from './edges/EdgeWithDataTransfer.vue'
import EdgeWithAir from './edges/EdgeWithAir.vue'
import EdgeWithHeat from './edges/EdgeWithHeat.vue'
import { commonNodes, commonEdges } from './common'
import { type Edge, type Node } from '@vue-flow/core'

const { onConnect, addEdges, setEdges, getEdges } = useVueFlow()

const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop()

// const nodes = ref(commonNodes)
// const edges = ref(commonEdges)
const nodes = ref<Node[]>([])
const edges = ref<Edge[]>([])
const edgeColors = ref<Record<string, string>>({})
const edgePathType = ref<Record<string, string>>({})
const selectedNode = ref<Node | null>(null)
const selectedEdge = ref<Edge | null>(null)

function clickNode(nodeMouseEvent: NodeMouseEvent) {
  selectedNode.value = nodeMouseEvent.node
}

function clickEdge(edgeMouseEvent: EdgeMouseEvent) {
  selectedEdge.value = edgeMouseEvent.edge
}

function setDefaultEdges() {
  addEdges([
    { id: 'e1-2', source: 'dndnode_0', target: 'dndnode_1', type: 'button'},
    { id: 'e1-3', source: 'dndnode_0', target: 'dndnode_2', type: 'default'}
  ])
  edgeColors.value['e1-2'] = '#6f3381'
  edgeColors.value['e1-3'] = '#6f3381'
  edgePathType.value['e1-2'] = 'smoothstep'
  edgePathType.value['e1-3'] = 'smoothstep'
}

const nodeTypes = {
  custom: markRaw(CustomNode)
}

function changeEdge() {
  edgeColors.value['e1-2'] = 'red'
  const updateEdge = getEdges.value.map((edge) => {
    if (edge.id === 'e1-3') {
      edgePathType.value['e1-3'] = 'bezier'
      return { ...edge, type: 'button'}
    }
    return edge
  })
  setEdges(updateEdge)
}

function changeEdge2() {
  edgeColors.value['e1-3'] = 'red'
}

function changeNode(nodeMouseEvent: NodeMouseEvent) {
  console.log(nodeMouseEvent)
}

onConnect((params) => {
  return addEdges({
    ...params,
    type: 'smoothstep'
  })
})
</script>
