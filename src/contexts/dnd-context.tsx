import type { NodeType } from '@/lib/flow-builder';
import { createContext, useContext, useState } from 'react';

interface DnDContextType {
  type: NodeType | null;
  setType: (type: NodeType | null) => void;
}

const DnDContext = createContext<DnDContextType>({ type: null, setType: () => {} });

export const DnDProvider = ({ children }: { children: React.ReactNode }) => {
  const [type, setType] = useState<DnDContextType['type']>(null);

  return (
    <DnDContext.Provider value={{type, setType}}>
      {children}
    </DnDContext.Provider>
  );
}

export default DnDContext;


// eslint-disable-next-line react-refresh/only-export-components
export const useDnD = () => {
  return useContext(DnDContext);
}