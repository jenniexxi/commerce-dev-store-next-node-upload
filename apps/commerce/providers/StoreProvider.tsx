'use client';

import { ReactNode, createContext, useRef } from 'react';
import { createExampleStore } from 'stores/exampleStore';

type ExampleStoreApi = ReturnType<typeof createExampleStore>;

export interface StoreContextType {
  exampleStore: ExampleStoreApi;
}

export const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const exampleStoreRef = useRef<ExampleStoreApi>(null);

  if (!exampleStoreRef.current) {
    exampleStoreRef.current = createExampleStore();
  }

  return (
    <StoreContext.Provider
      value={{
        exampleStore: exampleStoreRef.current,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
