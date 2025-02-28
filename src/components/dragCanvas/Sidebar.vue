<script setup lang="ts">
import useDragAndDrop from './hooks/useDnD.ts'

const { onDragStart } = useDragAndDrop()
</script>

<template>
  <aside>
    <div class="nodes">
      <div class="vue-flow__node-input" :draggable="true" @dragstart="onDragStart($event, 'input')">Input Node</div>

      <div class="vue-flow__node-default" :draggable="true" @dragstart="onDragStart($event, 'default')">Default Node</div>

      <div class="vue-flow__node-output" :draggable="true" @dragstart="onDragStart($event, 'output')">Output Node</div>
    </div>
    <div class="grid grid-cols-2 gap-4 nodes">
      <div class="vue-flow__node-output" :draggable="true" @dragstart="onDragStart($event, 'custom')">Custom Node</div>
    </div>
  </aside>
</template>
