<script setup lang="ts">
import { Handle, Position, type NodeProps } from '@vue-flow/core'

interface Props extends NodeProps {
  data: {
    label: string
    conditions?: Array<{
      id: string
      label: string
      result: string
      status: boolean
    }>
    inputs?: string[]
    outputs?: string[]
  }
}

defineProps<Props>()
</script>

<template>
  <div class="event-node">
    <div class="node-header">
      {{ data.label }}
    </div>
    
    <div v-if="data.conditions" class="conditions">
      <div v-for="condition in data.conditions" :key="condition.id" class="condition">
        <div class="status-dot" :class="{ active: condition.status }" />
        <span>{{ condition.label }}</span>
        <span>{{ condition.result }}</span>
      </div>
    </div>
    
    <div v-if="data.inputs" class="ports inputs">
      <div v-for="(input, index) in data.inputs" :key="index" class="port">
        <Handle
          type="target"
          :position="Position.Left"
          :id="`input-${index}`"
        />
        <span>{{ input }}</span>
      </div>
    </div>
    
    <div v-if="data.outputs" class="ports outputs">
      <div v-for="(output, index) in data.outputs" :key="index" class="port">
        <span>{{ output }}</span>
        <Handle
          type="source"
          :position="Position.Right"
          :id="`output-${index}`"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-node {
  background-color: #333;
  min-width: 150px;
}

.node-header {
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.conditions {
  padding: 8px;
}

.condition {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #666;
}

.status-dot.active {
  background-color: #00ff00;
}

.ports {
  padding: 8px;
}

.port {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0;
}
</style>
