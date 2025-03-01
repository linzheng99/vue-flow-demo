<script setup lang="ts">
import { EdgeLabelRenderer, getStraightPath, Position, useVueFlow } from '@vue-flow/core'
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

const path = computed(() => getStraightPath(props))
</script>

<template>
  <g>
    <!-- Heat pipe -->
    <path
      class="vue-flow__connection heat-pipe"
      fill="none"
      stroke="#772211"
      :stroke-width="5"
      :d="path[0]"
    />

    <!-- Heat flow -->
    <path
      class="vue-flow__connection heat-flow"
      fill="none"
      stroke="url(#heatGradient)"
      :stroke-width="3"
      :d="path[0]"
      filter="url(#heatGlow)"
    />

    <!-- Heat waves -->
    <path
      class="vue-flow__connection heat-waves"
      fill="none"
      stroke="#ff9955"
      :stroke-width="1.5"
      :d="path[0]"
    />

    <!-- Gradients and filters -->
    <defs>
      <linearGradient id="heatGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ff3300">
          <animate
            attributeName="stop-color"
            values="#ff3300;#ffcc00;#ff3300"
            dur="2s"
            repeatCount="indefinite"
          />
        </stop>
        <stop offset="50%" stop-color="#ffcc00">
          <animate
            attributeName="stop-color"
            values="#ffcc00;#ff3300;#ffcc00"
            dur="2s"
            repeatCount="indefinite"
          />
        </stop>
        <stop offset="100%" stop-color="#ff3300">
          <animate
            attributeName="stop-color"
            values="#ff3300;#ffcc00;#ff3300"
            dur="2s"
            repeatCount="indefinite"
          />
        </stop>
      </linearGradient>

      <filter id="heatGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite operator="over" in="SourceGraphic" in2="blur" />
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
.heat-pipe {
  stroke-linecap: round;
}

.heat-flow {
  stroke-linecap: round;
  opacity: 0.8;
}

.heat-waves {
  stroke-dasharray: 5 10;
  stroke-dashoffset: 0;
  animation: heatWaves 1s linear infinite;
  opacity: 0.6;
}

@keyframes heatWaves {
  to {
    stroke-dashoffset: -15;
  }
}

.edgebutton {
  width: 20px;
  height: 20px;
  background: #ffffff;
  border: 1px solid #ff3300;
  color: #ff3300;
  border-radius: 50%;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edgebutton:hover {
  background: #ff3300;
  color: white;
}
</style>
