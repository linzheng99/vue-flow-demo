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
      stroke="#aaaaaa"
      :stroke-width="5"
      :d="path[0]"
    />
    
    <!-- Gas flow -->
    <path
      class="vue-flow__connection gas-flow"
      fill="none"
      stroke="#ffffff"
      :stroke-width="3"
      :d="path[0]"
      filter="url(#gasBlur)"
    />
    
    <!-- Gas particles -->
    <path
      class="vue-flow__connection gas-particles"
      fill="none"
      stroke="#ffffff"
      :stroke-width="1"
      :d="path[0]"
    />
    
    <!-- Filters -->
    <defs>
      <filter id="gasBlur" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="1" result="blur" />
        <feComposite operator="in" in="SourceGraphic" in2="blur" />
      </filter>
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

.gas-flow {
  stroke-dasharray: 20 10;
  stroke-dashoffset: 0;
  animation: gasFlow 3s linear infinite;
  opacity: 0.4;
}

.gas-particles {
  stroke-dasharray: 0.5 15;
  stroke-dashoffset: 0;
  animation: particleFlow 1.5s linear infinite;
  opacity: 0.7;
}

@keyframes gasFlow {
  to {
    stroke-dashoffset: -30;
  }
}

@keyframes particleFlow {
  to {
    stroke-dashoffset: -15.5;
  }
}

.edgebutton {
  width: 20px;
  height: 20px;
  background: #ffffff;
  border: 1px solid #aaaaaa;
  color: #aaaaaa;
  border-radius: 50%;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edgebutton:hover {
  background: #aaaaaa;
  color: white;
}
</style>
