import {  useState } from 'react';
import { useNodesData, useReactFlow } from '@xyflow/react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useFlowBuilder } from '@/contexts/flow-builder-context';

export default function NodeEditor({ nodeId }: { nodeId: string }) {
  const node = useNodesData(nodeId);
  const { setNodes } = useReactFlow();
  const { setEditNodeId } = useFlowBuilder();

  const [text, setText] = useState<string>((node?.data?.text ?? '') as string);

  console.log('NodeEditor data:', node);

  if (!node)
    return <i className="text-gray-500">No node found.</i>;

  const handleSave = () => {
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id !== nodeId) return n;
        return {
          ...n,
          data: {
            ...(n.data ?? {}),
            text,
          },
        };
      })
    );

    setEditNodeId(null);
  };

  return (
    <div>
      <h3 className="mb-2 text-lg font-medium">Message</h3>

      <label className="text-sm text-muted-foreground">Text</label>
      <div className="mt-2 mb-4">
        <Textarea value={text} onChange={(e) => setText(e.target.value)} />
      </div>

      <div className="flex gap-2">
        <Button onClick={handleSave}>Save</Button>
        <Button variant="ghost" onClick={() => setEditNodeId(null)} className='hover:bg-gray-50 hover:text-gray-900'>
          Cancel
        </Button>
      </div>
    </div>
  );
}
