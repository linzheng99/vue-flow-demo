<script setup lang="ts">
import { EdgeLabelRenderer, getBezierPath, Position, useVueFlow } from '@vue-flow/core'
import { computed } from 'vue'

const props = defineProps<{
  id: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition: Position
  targetPosition: Position
  markerEnd?: string
}>()

const { removeEdges } = useVueFlow()

const path = computed(() => getBezierPath(props))
</script>

<template>
  <g>
    <!-- Base path -->
    <path
      class="vue-flow__connection base-path"
      fill="none"
      stroke="#dddddd"
      :stroke-width="3"
      :d="path[0]"
    />
    
    <!-- Data packets -->
    <path
      class="vue-flow__connection data-packets"
      fill="none"
      stroke="#22cc88"
      :stroke-width="3"
      :d="path[0]"
    />
    
    <!-- Data bits -->
    <path
      class="vue-flow__connection data-bits"
      fill="none"
      stroke="#22cc88"
      :stroke-width="2"
      :d="path[0]"
    />
  </g>

  <EdgeLabelRenderer>
    <div
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`
      }"
      class="nodrag nopan"
    >
      <button class="edgebutton" @click="removeEdges(id)">×</button>
    </div>
  </EdgeLabelRenderer>
</template>

<style scoped>
.base-path {
  stroke-linecap: round;
}

.data-packets {
  stroke-dasharray: 10 30;
  stroke-dashoffset: 0;
  animation: packetTransfer 2s linear infinite;
}

.data-bits {
  stroke-dasharray: 1 10;
  stroke-dashoffset: 0;
  animation: bitsTransfer 1s linear infinite;
  opacity: 0.7;
}

@keyframes packetTransfer {
  to {
    stroke-dashoffset: -40;
  }
}

@keyframes bitsTransfer {
  to {
    stroke-dashoffset: -11;
  }
}

.edgebutton {
  width: 20px;
  height: 20px;
  background: #ffffff;
  border: 1px solid #22cc88;
  color: #22cc88;
  border-radius: 50%;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edgebutton:hover {
  background: #22cc88;
  color: white;
}
</style>
