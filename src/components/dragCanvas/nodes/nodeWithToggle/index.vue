<template>
  <div
    class="border-2 border-gray-500 rounded-md flex flex-col gap-2 items-center justify-center bg-gray-300 p-2"
  >
    <div class="flex gap-2 items-center">
      <span class="text-sm">改变target的edge</span>
      <Icon
        icon="quill:off"
        class="w-5 h-5 text-white hover:color-green-500"
        @click.stop="toggleTarget"
      />
    </div>
    <div class="flex gap-2 items-center">
      <span class="text-sm">改变source的edge</span>
      <Icon
        icon="quill:off"
        class="w-5 h-5 text-white hover:color-red"
        @click.stop="toggleSource"
      />
    </div>
    <Handle type="target" :position="Position.Top" />
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Handle, Position, useNodeConnections, useNodesData } from '@vue-flow/core'
import { useEdges } from '../../hooks/useEdges'

const { updateEdgeByEdgeId } = useEdges()

// 获取与本节点source连接的节点 source -> target
const sourceConnections = useNodeConnections({
  handleType: 'source'
})

const targetConnections = useNodeConnections({
  handleType: 'target'
})

// 获取以nodeId为target的节点, 如果nodeId为null，则获取所有与此node的target连接的节点
const toggleSourceConnections = useNodeConnections({
  handleType: 'target',
  nodeId: () => targetConnections.value[0]?.target
})

// 获取与本节点source连接的nodes: targets
const sourceData = useNodesData(() =>
  sourceConnections.value.map((connection) => connection.target)
)

function toggleSource() {
  const edgeId = sourceConnections.value[0]?.edgeId
  updateEdgeByEdgeId(edgeId, {
    type: 'heat'
  })
}
function toggleTarget() {
  const edgeId = targetConnections.value[0]?.edgeId
  updateEdgeByEdgeId(edgeId, {
    type: 'data-transfer'
  })
}
</script>

<style scoped></style>
