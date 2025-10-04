import { FlowBuilder } from "@/components/flow-builder";
import NodeEditor from "@/components/flow-builder/node-editor";
import NodePanel from "@/components/flow-builder/node-panel";
import { Button } from "@/components/ui/button";
import { useFlowBuilder } from "@/contexts/flow-builder-context";
import { useLocalStorageQuery } from "@/hooks/use-local-storage";
import { QUERY_KEYS } from "@/lib/query-keys";
import type { TextNodeData } from "@/types/flow-builder";
import { useReactFlow } from "@xyflow/react";
import { toast } from "sonner";

export default function FlowBuilderWrapper() {
  const { editNodeId } = useFlowBuilder();
  const { getEdges, getNodes } = useReactFlow()
  const { setValue: setNodes } = useLocalStorageQuery<TextNodeData[]>(QUERY_KEYS.NODES, [])

  const handleSaveChanges = () => {
    const nodes = getNodes();
    const edges = getEdges();
    
    const edgeSet = new Set<string>();
    for (const edge of edges) {
      edgeSet.add(edge.source)
      edgeSet.add(edge.target)
    }

    const hasDisconnectedNode = nodes.some(node => !edgeSet.has(node.id))

    if (hasDisconnectedNode) {
      toast.warning('All nodes must be connected before saving.');
      return;
    }

    const nodeData = nodes.map(node => node.data as TextNodeData);
    setNodes(nodeData);
    toast.success('Changes saved successfully!');
  }

  return (
      <div className="h-svh max-w-screen overflow-hidden">
        <header className="flex items-center justify-end bg-gray-50 border-b py-2 px-4">
          <Button onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </header>

        <div className="grid grid-cols-[1fr_350px] h-full">
          <section className="col-span-1 h-full">
            <FlowBuilder />
          </section>

          <section className="h-full bg-white border-l p-4 overflow-y-auto">
            {
              editNodeId ? (
                // we want to render the component if key updated, so it reset the state to initial text value
                <NodeEditor key={editNodeId} nodeId={editNodeId} />
              ) : (
                <NodePanel />
              )
            }
          </section>
        </div>
      </div>
  );
}
