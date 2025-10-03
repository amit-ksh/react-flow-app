import { memo, useCallback } from "react";
 
import { Button } from "@/components/ui/button";
import {
  BaseNode,
  BaseNodeContent,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from "@/components/ui/react-flow/base-node";
import { Position, useNodeId, useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import { MessageCircleIcon, TrashIcon } from "lucide-react";
import { BaseHandle } from "@/components/base-handle";

export const TextNode = memo((props: NodeProps<Node<{ text: string; type: string; to: string[] }>>) => {
  const id = useNodeId();
  const { setNodes } = useReactFlow();

  const handleDelete = useCallback(() => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
  }, [id, setNodes]);
 
  return (
    <BaseNode className="min-w-64">
      <BaseNodeHeader className="w-full border-b h-10 justify-between">
        <div className="flex items-center gap-2">
            <MessageCircleIcon className="size-4" />
            <BaseNodeHeaderTitle>Send Message</BaseNodeHeaderTitle>
        </div>

        <Button
          variant="ghost"
          className="nodrag p-1"
          onClick={handleDelete}
          aria-label="Delete Node"
          title="Delete Node"
        >
          <TrashIcon className="size-4" />
        </Button>
      </BaseNodeHeader>
      <BaseNodeContent className="cursor-pointer">
        <BaseHandle id={`handle-${id}-target`} type="target" position={Position.Left} />
        <p>{props.data.text}</p>
        <BaseHandle id={`handle-${id}-source`} type="source" position={Position.Right} />
      </BaseNodeContent>
    </BaseNode>
  );
});

TextNode.displayName = "TextNode";