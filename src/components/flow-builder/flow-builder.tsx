import { useState, useCallback, useRef, type DragEvent } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, type NodeChange, type EdgeChange, type Connection, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { NODE_COMPONENTS } from './node';
import { useDnD } from '@/contexts/dnd-context';
import type { EdgeData, FlowBuilderEdge, FlowBuilderNode, TextNodeData } from '@/types/flow-builder';
import { NodeType } from '@/lib/flow-builder';
 
const initialNodes = [
  { id: 'n1', type: NodeType.Text, position: { x: 0, y: 0 }, data: { id: 'n1', text: 'Node 1', type: 'whatsapp', to: ['n2'] } },
  { id: 'n2', type: NodeType.Text, position: { x: 400, y: 0 }, data: { id: 'n2', text: 'Node 2', type: 'whatsapp', to: [] } },
];
const initialEdges = initialNodes.flatMap((node) =>
  node.data.to.map((targetId) => ({
    id: `e${node.id}-${targetId}`, source: node.id, target: targetId, data: { from: node.id, to: targetId },
  }))
);
 
export  function FlowBuilder() {
  const reactFlow = useReactFlow();
  const [nodes, setNodes] = useState<FlowBuilderNode<TextNodeData>[]>(initialNodes);
  const [edges, setEdges] = useState<FlowBuilderEdge<EdgeData>[]>(initialEdges);

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
   const reactFlowWrapper = useRef(null);
  const { type } = useDnD();

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
 
  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
 
      if (!type) {
        return;
      }

      const position = reactFlow.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const id = crypto.randomUUID()
      const newNode: FlowBuilderNode<TextNodeData> = {
        id,
        type,
        position,
        data: { id, text: `New ${type}`, type: 'whatsapp', to: [] },
      } ;
 
      setNodes((nds) => [...nds, newNode]);
    },
    [reactFlow, type],
  );

 
  return (
    <div ref={reactFlowWrapper} className="size-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={NODE_COMPONENTS}
        onConnect={onConnect}
        fitView
        onDragOver={onDragOver}
        onDrop={onDrop}
      />
    </div>
  );
}