<template>
  <div class="w-100px h-100px border-2 border-gray-500 rounded-md flex items-center justify-center bg-gray-300" :draggable="true" @dragstart="onDragStart($event, 'toggle')" >
    <Icon icon="quill:off" class="w-10 h-10" />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import useDragAndDrop from '../../hooks/useDnD';

const { onDragStart } = useDragAndDrop()
</script>

<style scoped>

</style>
