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
  markerEnd?:string
}>()

const { removeEdges } = useVueFlow()

const path = computed(() => getBezierPath(props))
</script>

<template>
  <g>
    <!-- Base path -->
    <path
      class="vue-flow__connection"
      fill="none"
      stroke="#0066cc"
      :stroke-width="2"
      :d="path[0]"
    />

    <!-- Electricity effect -->
    <path
      class="vue-flow__connection electricity-effect"
      fill="none"
      stroke="#00ccff"
      :stroke-width="3"
      :d="path[0]"
      filter="url(#electricity)"
    />

    <!-- Sparks -->
    <path
      class="vue-flow__connection sparks"
      fill="none"
      stroke="#ffffff"
      :stroke-width="1.5"
      :d="path[0]"
    />

    <!-- SVG Filters -->
    <defs>
      <filter id="electricity" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
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
.electricity-effect {
  stroke-dasharray: 10 15;
  animation: electricityFlow 0.5s linear infinite;
  opacity: 0.7;
}

.sparks {
  stroke-dasharray: 0.1 20;
  stroke-dashoffset: 0;
  animation: sparkle 0.3s linear infinite;
}

@keyframes electricityFlow {
  to {
    stroke-dashoffset: -25;
  }
}

@keyframes sparkle {
  0% {
    stroke-dashoffset: 0;
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: -20;
    opacity: 0.2;
  }
}

.edgebutton {
  width: 20px;
  height: 20px;
  background: #ffffff;
  border: 1px solid #0066cc;
  color: #0066cc;
  border-radius: 50%;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edgebutton:hover {
  background: #0066cc;
  color: white;
}
</style>
