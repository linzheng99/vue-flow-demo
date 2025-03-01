<script setup lang="ts">
import useDragAndDrop from './hooks/useDnD.ts'
import NodeWithToggle from './nodes/nodeWithToggle/darg.vue'
import NodeWithImage from './nodes/nodeWithImage/drag.vue'
import NodeWithInterface from './nodes/nodeWithInterface/drag.vue'
import NodeWithCondition from './nodes/nodeWithCondition/drag.vue'

const { onDragStart } = useDragAndDrop()
</script>

<template>
  <aside>
    <div class="nodes">
      <div class="vue-flow__node-input" :draggable="true" @dragstart="onDragStart($event, 'input')">Input Node</div>

      <div class="vue-flow__node-default" :draggable="true" @dragstart="onDragStart($event, 'default')">Default Node</div>

      <div class="vue-flow__node-output" :draggable="true" @dragstart="onDragStart($event, 'output')">Output Node</div>
    </div>
    <div class="flex flex-col gap-4">
      <div class="vue-flow__node-output" :draggable="true" @dragstart="onDragStart($event, 'custom')">Custom Node</div>
      <NodeWithToggle />
      <NodeWithImage />
      <NodeWithInterface />
      <NodeWithCondition />
    </div>
  </aside>
</template>
