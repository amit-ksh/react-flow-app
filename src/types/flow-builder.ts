import type { NodeType } from "@/lib/flow-builder";

export type TextNodeData = {
    id: string;
    text: string;
    type: string;
    to: string[];
}

export type EdgeData = {
    from: string;
    to: string;
}

export interface FlowBuilderNode<TData> {
    id: string;
    type: NodeType;
    position: { x: number; y: number };
    data: TData;
}

export type FlowBuilderEdge<TData> = {
    id: string;
    source: string;
    target: string;
    data: TData;
}