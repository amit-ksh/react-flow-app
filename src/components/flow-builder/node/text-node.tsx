import { memo, useCallback } from "react";
 
import { Button } from "@/components/ui/button";
import {
  BaseNode,
  BaseNodeContent,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from "@/components/ui/react-flow/base-node";
import { Position, useNodeId, useReactFlow } from "@xyflow/react";
import { AtSignIcon, MessageCircleIcon } from "lucide-react";
import { BaseHandle } from "@/components/base-handle";

export const TextNode = memo(() => {
  const id = useNodeId();
  const { setNodes } = useReactFlow();
 
  const handleDelete = useCallback(() => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
  }, [id, setNodes]);
 
  return (
    <BaseNode>
      <BaseNodeHeader className="border-b h-9">
        <MessageCircleIcon className="size-4" />
        <BaseNodeHeaderTitle>Send Message</BaseNodeHeaderTitle>

        <Button
          variant="ghost"
          className="nodrag p-1"
          onClick={handleDelete}
          aria-label="Delete Node"
          title="Delete Node"
        >
          <AtSignIcon className="size-4" />
        </Button>
      </BaseNodeHeader>
      <BaseNodeContent>
        <BaseHandle id="target-1" type="target" position={Position.Left} />
        <p>Text content</p>
        <BaseHandle id="target-2" type="source" position={Position.Right} />
      </BaseNodeContent>
    </BaseNode>
  );
});