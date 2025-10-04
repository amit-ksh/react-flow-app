import { FlowBuilder } from "@/components/flow-builder";
import NodeEditor from "@/components/flow-builder/node-editor";
import NodePanel from "@/components/flow-builder/node-panel";
import { Button } from "@/components/ui/button";
import { useFlowBuilder } from "@/contexts/flow-builder-context";
import { useReactFlow } from "@xyflow/react";

export default function FlowBuilderWrapper() {
  const { editNodeId } = useFlowBuilder();
  const { getEdges, getNodes } = useReactFlow()
  
  const handleSaveChanges = () => {
    const nodes = getNodes();
    const edges = getEdges();
    console.log('Saving nodes:', nodes);
    console.log('Saving edges:', edges);
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
