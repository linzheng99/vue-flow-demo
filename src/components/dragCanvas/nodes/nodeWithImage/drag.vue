<template>
  <div class="w-100px h-100px border-2 border-gray-500 rounded-md flex items-center justify-center bg-gray-300" :draggable="true" @dragstart="onDragStart($event, 'image')" >
    <img src="../../../../assets/image/jiqi.jpg" class="w-100px h-100px"/>
  </div>
</template>

<script setup lang="ts">
import useDragAndDrop from '../../hooks/useDnD';

const { onDragStart } = useDragAndDrop()
</script>

<style scoped>

</style>
