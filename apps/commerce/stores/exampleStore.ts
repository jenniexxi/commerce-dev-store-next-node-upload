import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ExampleState {
  count: number;
}

export type ExampleActions = {
  updateExample: () => void;
};

export type ExampleStore = ExampleState & ExampleActions;

export const initState: ExampleState = {
  count: 0,
};

export const createExampleStore = () =>
  createStore<ExampleStore>()(
    devtools((set) => ({
      ...initState,
      updateExample: () =>
        set(
          (state) => ({
            count: state.count + 1,
          }),
          undefined,
          'exampleStore/updateExample',
        ),
    })),
  );
