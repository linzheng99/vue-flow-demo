<!-- components/LogicNode.vue -->
<script setup lang="ts">
import { Handle, Position, type NodeProps } from '@vue-flow/core'

interface Props extends NodeProps {
  data: {
    label: string
    type: 'and' | 'or'
    conditions: Array<{
      label: string
      status: boolean
      result?: string
    }>
  }
}

defineProps<Props>()
</script>

<template>
  <div class="logic-node" :class="data.type">
    <div class="node-header">
      {{ data.label }}
    </div>
    
    <div class="conditions">
      <div v-for="(condition, index) in data.conditions" :key="index" class="condition">
        <div class="status-dot" :class="{ active: condition.status }" />
        <span>{{ condition.label }}</span>
        <span v-if="condition.result">{{ condition.result }}</span>
      </div>
    </div>
    
    <Handle
      type="target"
      :position="Position.Left"
      id="input"
    />
    <Handle
      type="source"
      :position="Position.Right"
      id="output"
    />
  </div>
</template>

<style scoped>
.logic-node {
  min-width: 150px;
}

.logic-node.and {
  background-color: #2a5a2a;
}

.logic-node.or {
  background-color: #333;
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
</style>
