import { FlowBuilder } from "./components/flow-builder";
import NodeEditor from "./components/flow-builder/node-editor";
import NodePanel from "./components/flow-builder/node-panel";
import { useFlowBuilder } from "./contexts/flow-builder-context";

function App() {
  const { editNodeId } = useFlowBuilder();

  return (
      <div className="h-svh max-w-screen overflow-hidden">
        <header className="flex items-center justify-end bg-gray-50 border-b">
          <button className="m-4 rounded bg-indigo-500 px-4 py-2 font-semibold text-white hover:bg-indigo-600 flex items-center gap-2">
            Save Changes
          </button>
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

export default App;
