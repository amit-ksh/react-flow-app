import type { Edge, Node } from "@xyflow/react";

export const NodeType = {
    Text: "textNode",
} as const

export type NodeType = typeof NodeType[keyof typeof NodeType];


export type EdgeLike = Pick<Edge, 'id' | 'source' | 'target'>
export type NodeLike = Pick<Node, 'id'>


export const NodeRules = {
    validateSelfLoops(edges: EdgeLike[]): boolean {
        const byNode = new Map<string, number>()
        for (const e of edges || []) {
            if (e.source === e.target) {
                let count = byNode.get(e.source) ?? 0
                count += 1
                byNode.set(e.source, count)
            }
        }

        const hasSelfLoop = Array.from(byNode.values()).some(count => count > 0)
        return hasSelfLoop
    },

    validateDuplicateEdges(edges: EdgeLike[]): boolean {
        const pairKey = (s: string, t: string) => `${s}=>${t}`
        const byPair = new Map<string, number>()
        for (const e of edges || []) {
            const k = pairKey(e.source, e.target)
            let count = byPair.get(k) ?? 0
            count += 1
            byPair.set(k, count)
        }

        const hasDuplicate = Array.from(byPair.values()).some(count => count > 1)
        return hasDuplicate
    },

    validateMaxOutgoing(edges: EdgeLike[], max = 1): boolean {
        console.log(edges)
        const bySource = new Map<string, number>()
        for (const e of edges || []) {
            let count = bySource.get(e.source) || 0
            count += 1
            bySource.set(e.source, count)
        }

        const hasMaxOutgoing = Array.from(bySource.values()).some(occurrences => occurrences > max)
        return hasMaxOutgoing
    },
}