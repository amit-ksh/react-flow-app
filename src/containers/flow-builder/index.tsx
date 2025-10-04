import FlowBuilderProviders from './providers'
import FlowBuilderWrapper from './flow-builder'

export default function FlowBuilderContainer() {
  return (
    <FlowBuilderProviders>
      <FlowBuilderWrapper />
    </FlowBuilderProviders>
  )
}

