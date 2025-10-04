import { createContext, useContext, useState } from "react";

interface FlowBuilderContextType {
  editNodeId: string | null;
  setEditNodeId: (id: string | null) => void;
}

const FlowBuilderContext = createContext<FlowBuilderContextType>({
  editNodeId: null,
  setEditNodeId: () => {},
});

export const FlowBuilderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [editNodeId, setEditNodeId] =
    useState<FlowBuilderContextType["editNodeId"]>(null);

  return (
    <FlowBuilderContext.Provider
      value={{
        editNodeId,
        setEditNodeId,
      }}
    >
      {children}
    </FlowBuilderContext.Provider>
  );
};

export default FlowBuilderContext;

// eslint-disable-next-line react-refresh/only-export-components
export const useFlowBuilder = () => {
  return useContext(FlowBuilderContext);
};
