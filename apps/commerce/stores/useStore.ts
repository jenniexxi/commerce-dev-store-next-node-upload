import { useContext } from 'react';
import { useStore } from 'zustand';
import { StoreContext } from 'providers/StoreProvider';
import { ExampleStore } from './exampleStore';

export const useExampleStore = <T>(selector: (state: ExampleStore) => T): T => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error(`StoreProvider를 추가해 주세요.`);
  }

  return useStore(context.exampleStore, selector);
};
