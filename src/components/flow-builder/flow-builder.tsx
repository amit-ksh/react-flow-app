import { useState, useCallback, useRef, type DragEvent } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type NodeChange,
  type EdgeChange,
  type Connection,
  useReactFlow,
} from "@xyflow/react";
import { NODE_COMPONENTS } from "./node";
import { useDnD } from "@/contexts/dnd-context";
import type {
  EdgeData,
  FlowBuilderEdge,
  FlowBuilderNode,
  TextNodeData,
} from "@/types/flow-builder";
import { NodeRules, NodeType, type EdgeLike } from "@/lib/flow-builder";
import { useLocalStorageQuery } from "@/hooks/use-local-storage";
import { QUERY_KEYS } from "@/lib/query-keys";

const initialNodes = [
  { id: "n1", text: "Node 1", type: "whatsapp", from: [] },
  { id: "n2", text: "Node 2", type: "whatsapp", from: ["n1"] },
];

export function FlowBuilder() {
  const reactFlow = useReactFlow();
  const { data: nodeData } = useLocalStorageQuery<TextNodeData[]>(
    QUERY_KEYS.NODES,
    initialNodes
  );

  const initialReactFlowNodes: FlowBuilderNode<TextNodeData>[] =
    nodeData?.map((data) => ({
      id: data.id,
      type: NodeType.Text,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data,
    })) ?? [];
  const initialEdges: FlowBuilderEdge<EdgeData>[] =
    initialReactFlowNodes.flatMap((node) =>
      node.data.from.map((sourceId) => ({
        id: `e${sourceId}-${node.id}`,
        source: sourceId,
        target: node.id,
        data: { from: sourceId, to: node.id },
      }))
    );

  const [nodes, setNodes] = useState<FlowBuilderNode<TextNodeData>[]>(
    initialReactFlowNodes
  );
  const [edges, setEdges] = useState<FlowBuilderEdge<EdgeData>[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange<(typeof nodes)[number]>[]) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange<(typeof edges)[number]>[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params: Connection) => {
      const isInvalid = [
        NodeRules.validateSelfLoops([...edges, params] as EdgeLike[]),
        NodeRules.validateDuplicateEdges([...edges, params] as EdgeLike[]),
        NodeRules.validateMaxOutgoing([...edges, params] as EdgeLike[], 1),
      ].some((v) => v);

      if (isInvalid) {
        console.log("Invalid connection", params);
        return;
      }

      if (!params.source || !params.target) {
        return;
      }

      const sourceNodeId = params.source;
      const targetNodeId = params.target;
      console.log("Connecting", sourceNodeId, "->", targetNodeId);
      setNodes((nodesSnapshot) =>
        nodesSnapshot.map((node) => {
          if (node.id === targetNodeId && sourceNodeId) {
            const from = Array.from(
              new Set([...(node.data.from || []), sourceNodeId])
            );
            return { ...node, data: { ...node.data, from } };
          }
          return node;
        })
      );

      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot));
    },
    [edges]
  );
  const reactFlowWrapper = useRef(null);
  const { type } = useDnD();

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
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
      const id = crypto.randomUUID();
      const newNode: FlowBuilderNode<TextNodeData> = {
        id,
        type,
        position,
        data: { id, text: `Click to edit text`, type: "whatsapp", from: [] },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [reactFlow, type]
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
        onDragOver={onDragOver}
        onDrop={onDrop}
        fitView
      />
    </div>
  );
}
