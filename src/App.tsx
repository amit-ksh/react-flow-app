import { FlowBuilder } from "./components/flow-builder"

function App() {

  return (
    <div className="h-svh max-w-screen overflow-hidden">
      <header className="flex items-center justify-end bg-gray-50">
        <button className="m-4 rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600">
          Save Changes
        </button>
      </header>

      <div className="grid grid-cols-5 h-full">
        <section className="col-span-4 h-full">
          <FlowBuilder />
        </section>

        <section className="h-full col-span-1 bg-gray-700">
          {/* Node panel */}
        </section>
      </div>
    </div>
  )
}

export default App