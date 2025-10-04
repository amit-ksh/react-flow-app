import { DnDProvider } from "@/contexts/dnd-context";
import { FlowBuilderProvider } from "@/contexts/flow-builder-context";
import { ReactFlowProvider } from "@xyflow/react";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <FlowBuilderProvider>{children}</FlowBuilderProvider>
      </DnDProvider>
    </ReactFlowProvider>
  );
}
