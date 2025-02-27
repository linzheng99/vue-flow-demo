<script setup lang="ts">
import { ref, markRaw } from 'vue'
import {VueFlow, useVueFlow, Panel, type NodeMouseEvent } from '@vue-flow/core'
import DropzoneBackground from './DropzoneBackground.vue'
import Sidebar from './Sidebar.vue'
import useDragAndDrop from './useDnD.ts'
import CustomNode from './CustomNode.vue'
import EdgeWithButton from './EdgeWithButton.vue'

const { onConnect, addEdges, updateEdge, setEdges, getEdges } = useVueFlow()

const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop()

const nodes = ref([])
const edges = ref([])
const edgeColors = ref<Record<string, string>>({})
const edgePathType = ref<Record<string, string>>({})

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

onConnect(addEdges)
</script>

<template>
  <div class="dnd-flow" @drop="onDrop">
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      :nodeTypes="nodeTypes"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @nodeClick="changeNode"
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
        <button @click="setDefaultEdges">Set Edges</button>
        <button @click="changeEdge">Update Edge</button>
        <button @click="changeEdge2">Update Edge 2</button>
      </Panel>
      <template #node-custom="customNodeProps">
        <CustomNode v-bind="customNodeProps" />
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
          :style="buttonEdgeProps.style"
          :color="edgeColors[buttonEdgeProps.id]"
          :path-type="edgePathType[buttonEdgeProps.id]"
        />
      </template>
    </VueFlow>

    <Sidebar />
  </div>
</template>
