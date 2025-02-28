import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Edge, Node } from '@vue-flow/core';

const useStore = defineStore('vue-flow-pinia', () => {
  const nodes = ref<Node[]>([]);
  const edges = ref<Edge[]>([]);

  const reset = () => {
    edges.value = [];
    nodes.value = [];
  };

  const log = () => {
    console.log('nodes', nodes.value, 'edges', edges.value);
  };

  return {
    nodes,
    edges,
    reset,
    log,
  };
});

export default useStore;
