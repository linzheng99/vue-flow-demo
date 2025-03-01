<template>
  <div>
    <img src="../../../../assets/image/jiqi.jpg" class="w-100px h-100px"/>
  </div>
  <Handle type="target" :position="Position.Top" />
  <Handle type="source" :position="Position.Bottom" />
</template>

<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core';

</script>

<style scoped>

</style>
