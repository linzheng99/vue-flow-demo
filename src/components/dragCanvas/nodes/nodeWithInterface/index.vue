<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
</script>

<template>
  <div
    class="border-2 border-gray-500 rounded-md flex items-center justify-center bg-gray-300 w-100px h-100px"
  >
    <Icon name="+" />
  </div>

  <Handle type="source" :position="Position.Right" />
  <Handle id="target-a" type="target" :position="Position.Left" style="top: 25%" />
  <Handle id="target-b1" type="target" :position="Position.Left" style="top: 50%" />
  <Handle id="target-b2" type="target" :position="Position.Left" style="top: 75%" />
</template>
