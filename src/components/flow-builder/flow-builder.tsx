import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, type NodeChange, type EdgeChange, type Connection } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { NODE_TYPES } from './node';
 
const initialNodes = [
  { id: 'n1', type: "textNode", position: { x: 0, y: 0 }, data: { text: 'Node 1', type: 'whatsapp', to: ['n2'] } },
  { id: 'n2', type: "textNode", position: { x: 400, y: 0 }, data: { text: 'Node 2', type: 'whatsapp', to: [] } },
];
const initialEdges = initialNodes.flatMap((node) =>
  node.data.to.map((targetId) => ({
    id: `e${node.id}-${targetId}`, source: node.id, target: targetId, data: { from: node.id, to: targetId },
  }))
);
 
export  function FlowBuilder() {
  const [nodes, setNodes] = useState<typeof initialNodes>(initialNodes);
  const [edges, setEdges] = useState<typeof initialEdges>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange<typeof initialNodes[number]>[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange<typeof initialEdges[number]>[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );
 
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={NODE_TYPES}
      onConnect={onConnect}
      fitView
    />
  );
}