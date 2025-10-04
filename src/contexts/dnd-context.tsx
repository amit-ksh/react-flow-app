import { createContext, useContext, useState } from 'react';

const DnDContext = createContext<[string | null, (type: string | null) => void]>([null, () => {}]);

export const DnDProvider = ({ children }: { children: React.ReactNode }) => {
  const [type, setType] = useState<string | null>(null);

  return (
    <DnDContext.Provider value={[type, setType]}>
      {children}
    </DnDContext.Provider>
  );
}

export default DnDContext;


// eslint-disable-next-line react-refresh/only-export-components
export const useDnD = () => {
  return useContext(DnDContext);
}