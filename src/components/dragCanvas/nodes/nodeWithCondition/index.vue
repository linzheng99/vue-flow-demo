<template>
  <div
    class="border-2 border-gray-500 rounded-md flex items-center justify-center bg-gray-300 flex-col gap-2 p-2"
  >
    <div class="border-2 border-gray-500 rounded-md flex items-center justify-center gap-2">
      <div class="text-sm"> 当两个target都被连接时，icon会变色 </div>
      <div
        class="border-2 border-gray-500 rounded-full border-dashed flex items-center justify-center"
      >
        <Icon icon="material-symbols:lightbulb" :class="nodeStatus === 'waiting' ? 'text-gray' : 'text-green'" />
      </div>
    </div>
    <div class="border-2 border-gray-500 rounded-md flex items-center justify-center gap-2">
      <div class="text-sm"> 当两个target和source都被连接时，icon会变绿 </div>
      <div
        class="border-2 border-gray-500 rounded-full border-dashed flex items-center justify-center"
      >
        <Icon icon="material-symbols:lightbulb" :class="`text-${iconColor}`" />
      </div>
    </div>
    <div>
      {{ targetConnectionsCount }}
      {{ isSourceConnected }}
      {{ nodeStatus }}
      {{ iconColor }}
    </div>
  </div>
  <Handle type="source" :position="Position.Bottom" />
  <Handle id="target-a" type="target" :position="Position.Top" style="left: 25%" />
  <Handle id="target-b" type="target" :position="Position.Top" style="left: 75%" />
</template>

<script setup lang="ts">
import { Position, Handle, type NodeProps, useNodeConnections } from '@vue-flow/core'
import { Icon } from '@iconify/vue'
import { computed } from 'vue';
const props = defineProps<NodeProps>()

const nodeConnections = useNodeConnections({ nodeId: props.id })


// 计算目标连接数量
const targetConnectionsCount = computed(() => {
  return nodeConnections.value.filter(conn => conn.target === props.id).length
})

// 计算源连接状态
const isSourceConnected = computed(() => {
  return nodeConnections.value.some(conn => conn.source === props.id)
})

// Compute the node status based on connections
const nodeStatus = computed(() => {
  if (targetConnectionsCount.value >= 2 && isSourceConnected.value) {
    return 'complete'
  } else if (targetConnectionsCount.value >= 2) {
    return 'ready'
  } else {
    return 'waiting'
  }
})

// Compute the icon color based on node status
const iconColor = computed(() => {
  switch (nodeStatus.value) {
    case 'complete': return 'green'
    case 'ready': return 'yellow'
    default: return 'gray'
  }
})
</script>

<style scoped></style>
