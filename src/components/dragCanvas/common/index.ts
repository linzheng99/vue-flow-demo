import { MarkerType, type Edge, type Node } from "@vue-flow/core";
import { ref } from "vue";

export const commonNodes = ref<Node[]>([
  { id: '1', type: 'input', label: 'Start', position: { x: 50, y: 0 }, style: { borderColor: '#10b981' }, class: 'custom-node' },
  { id: '2', label: 'Node 2', position: { x: 150, y: 100 } },
  { id: '2a', label: 'Node 2a', type: 'custom', position: { x: 0, y: 180 } },
  { id: '3', label: 'Node 3', position: { x: 250, y: 200 } },
  { id: '4', label: 'Node 4', position: { x: 400, y: 300 } },
  { id: '3a', label: 'Node 3a', position: { x: 175, y: 300 } },
  { id: '5', label: 'Node 5', position: { x: 200, y: 400 } },
  { id: '6', type: 'output', label: 'Output 6', position: { x: 0, y: 350 } },
  { id: '7', type: 'output', label: 'Output 7', position: { x: 50, y: 600 } },
  { id: '8', type: 'output', label: 'Output 8', position: { x: 350, y: 600 } },
  { id: '9', type: 'output', label: 'Output 9', position: { x: 550, y: 400 } },
])

export const commonEdges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', label: 'bezier edge (default)', class: 'normal-edge' },
  { id: 'e2-2a', source: '2', target: '2a', type: 'data-transfer' },
  { id: 'e2-3', source: '2', target: '3', type: 'flow-animated' },
  { id: 'e3-4', source: '3', target: '4', type: 'flow-voltage' },
  { id: 'e3-3a', source: '3', target: '3a', type: 'flow-water' },
  { id: 'e3-5', source: '4', target: '5', type: 'air' },
  {
    id: 'e2a-6',
    source: '2a',
    target: '6',
    type: 'heat',
  },
  {
    id: 'e5-7',
    source: '5',
    target: '7',
    label: 'label with bg',
    animated: true,
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#FFCC00', color: '#fff', fillOpacity: 0.7 },
    markerEnd: MarkerType.ArrowClosed,
  },
  {
    id: 'e4-9',
    source: '4',
    target: '9',
    type: 'default',
    animated: true,
    style: { stroke: 'red' },
  },
  {
    id: 'e5-8',
    source: '5',
    target: '8',
    type: 'default',
    animated: true,
    style: { stroke: '#10b981' },
  },
])
