import { DnDProvider } from '@/contexts/dnd-context'
import { ReactFlowProvider } from '@xyflow/react'
import React from 'react'

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <ReactFlowProvider>
        <DnDProvider>
            {children}
        </DnDProvider>
    </ReactFlowProvider>
  )
}
