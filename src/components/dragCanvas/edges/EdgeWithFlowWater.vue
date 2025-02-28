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
    <!-- Base pipe -->
    <path
      class="vue-flow__connection pipe"
      fill="none"
      stroke="#2c3e50"
      :stroke-width="6"
      :d="path[0]"
    />
    
    <!-- Water flow -->
    <path
      class="vue-flow__connection water-flow"
      fill="none"
      stroke="url(#waterGradient)"
      :stroke-width="4"
      :d="path[0]"
    />
    
    <!-- Water droplets -->
    <path
      class="vue-flow__connection droplets"
      fill="none"
      stroke="#a8d5ff"
      :stroke-width="2"
      :d="path[0]"
    />
    
    <!-- Gradients and patterns -->
    <defs>
      <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#a8d5ff">
          <animate attributeName="offset" values="0;1" dur="2s" repeatCount="indefinite" />
        </stop>
        <stop offset="20%" stop-color="#0088ff">
          <animate attributeName="offset" values="0.2;1.2" dur="2s" repeatCount="indefinite" />
        </stop>
        <stop offset="40%" stop-color="#a8d5ff">
          <animate attributeName="offset" values="0.4;1.4" dur="2s" repeatCount="indefinite" />
        </stop>
        <stop offset="60%" stop-color="#0088ff">
          <animate attributeName="offset" values="0.6;1.6" dur="2s" repeatCount="indefinite" />
        </stop>
        <stop offset="80%" stop-color="#a8d5ff">
          <animate attributeName="offset" values="0.8;1.8" dur="2s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" stop-color="#0088ff">
          <animate attributeName="offset" values="1;2" dur="2s" repeatCount="indefinite" />
        </stop>
      </linearGradient>
    </defs>
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
.pipe {
  stroke-linecap: round;
}

.water-flow {
  stroke-linecap: round;
}

.droplets {
  stroke-dasharray: 0.1 30;
  stroke-dashoffset: 0;
  animation: dropletFlow 3s linear infinite;
  opacity: 0.7;
}

@keyframes dropletFlow {
  to {
    stroke-dashoffset: -30;
  }
}

.edgebutton {
  width: 20px;
  height: 20px;
  background: #ffffff;
  border: 1px solid #0088ff;
  color: #0088ff;
  border-radius: 50%;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edgebutton:hover {
  background: #0088ff;
  color: white;
}
</style>
