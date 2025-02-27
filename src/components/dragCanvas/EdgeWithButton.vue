<script setup lang="ts">
import { EdgeLabelRenderer, getBezierPath, getSmoothStepPath, useVueFlow } from '@vue-flow/core'
import { computed, ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  sourceX: {
    type: Number,
    required: true
  },
  sourceY: {
    type: Number,
    required: true
  },
  targetX: {
    type: Number,
    required: true
  },
  targetY: {
    type: Number,
    required: true
  },
  sourcePosition: {
    type: String,
    required: true
  },
  targetPosition: {
    type: String,
    required: true
  },
  markerEnd: {
    type: String,
    required: false
  },
  style: {
    type: Object,
    required: false
  },
  color: {
    type: String,
    required: '#6f3381'
  },
  pathType: {
    type: String,
    required: 'smoothstep'
  }
})

function changeEdge(id: string) {
  console.log(id)
}

const path = computed(() => {
  if (props.pathType === 'smoothstep') {
    return getSmoothStepPath(props)
  }
  return getBezierPath(props)
})
</script>

<template>
  <g>
    <path
      class="vue-flow__connection animated"
      fill="none"
      :stroke="color"
      :stroke-width="2.5"
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
      <button class="edgebutton" @click="changeEdge(id)">×</button>
    </div>
  </EdgeLabelRenderer>
</template>

<style scoped>
.animated {
  stroke-dasharray: 5;
  animation: flowAnimation 1s linear infinite;
}

@keyframes flowAnimation {
  to {
    stroke-dashoffset: -10;
  }
}

.edgebutton {
  width: 20px;
  height: 20px;
  background: #ffffff;
  border: 1px solid #6f3381;
  color: #6f3381;
  border-radius: 50%;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edgebutton:hover {
  background: #6f3381;
  color: white;
}
</style>
