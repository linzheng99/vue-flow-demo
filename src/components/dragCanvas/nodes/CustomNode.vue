<script setup lang="ts">
import { Position, Handle, type NodeProps } from '@vue-flow/core'

interface Props extends NodeProps {
  data: {
    label: string
  }
}

defineProps<Props>()
</script>

<template>
  <div class="bg-red-300 w-100px h-100px">
    <Handle type="target" :position="Position.Top" />
    <div>{{ data.label }}</div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
