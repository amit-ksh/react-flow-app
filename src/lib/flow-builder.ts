export const NodeType = {
    Text: "textNode",
} as const

export type NodeType = typeof NodeType[keyof typeof NodeType];