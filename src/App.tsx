import { FlowBuilder } from "./components/flow-builder"
import NodePanel from "./components/flow-builder/node-panel"
import Providers from "./components/providers"

function App() {

  return (
    <Providers>
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
            <NodePanel />
          </section>
        </div>
      </div>
    </Providers>
  )
}

export default App