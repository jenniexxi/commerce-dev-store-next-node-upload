'use client';

import { ReactNode, createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';
import { createExampleStore, ExampleStore } from 'stores/exampleStore';
import { type HeaderStore, createHeaderStore } from 'stores/headerStore';

export type HeaderStoreApi = ReturnType<typeof createHeaderStore>;
type ExampleStoreApi = ReturnType<typeof createExampleStore>;

interface StoreContextType {
  headerStore: HeaderStoreApi;
  exampleStore: ExampleStoreApi;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const headerStoreRef = useRef<HeaderStoreApi>(null);
  const exampleStoreRef = useRef<ExampleStoreApi>(null);
  if (!headerStoreRef.current) {
    headerStoreRef.current = createHeaderStore();
  }
  if (!exampleStoreRef.current) {
    exampleStoreRef.current = createExampleStore();
  }

  return (
    <StoreContext.Provider
      value={{
        headerStore: headerStoreRef.current,
        exampleStore: exampleStoreRef.current,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useHeaderStore = <T,>(selector: (state: HeaderStore) => T): T => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error(`useHeaderStore must be used within StoreProvider`);
  }

  return useStore(context.headerStore, selector);
};

export const useExampleStore = <T,>(selector: (state: ExampleStore) => T): T => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error(`StoreProvider를 추가해 주세요.`);
  }

  return useStore(context.exampleStore, selector);
};
