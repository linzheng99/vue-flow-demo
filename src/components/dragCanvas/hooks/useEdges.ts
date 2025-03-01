import { useVueFlow, type Edge } from '@vue-flow/core'

export function useEdges() {
  const { getEdges, setEdges } = useVueFlow()

  function updateEdgeByEdgeId(edgeId: string, updateData: Partial<Edge>) {
    const updateEdges = getEdges.value.map((edge) => {
      if (edge.id === edgeId) {
        return { ...edge, ...updateData }
      }
      return edge
    })
    setEdges(updateEdges)
  }

  return {
    getEdges,
    setEdges,
    updateEdgeByEdgeId
  }
}
