import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ExampleState {
  count: number;
}

export type ExampleActions = {
  updateExample: () => void;
  parameterExample: (count: number) => void;
  payloadExample: ({ count }: { count: number }) => void;
};

export type ExampleStore = ExampleState & ExampleActions; // storeProvider에서 필요

export const initState: ExampleState = {
  count: 0,
};

export const createExampleStore = () =>
  createStore<ExampleStore>()(
    devtools(
      (set) => ({
        ...initState, // 초기값
        updateExample: () =>
          set(
            (state) => ({
              count: state.count + 1, //스토어에 저장된 count값을 가져와서 1 더하기
            }),
            undefined, // 내장된 기본 동작을 위해 항상 undifined
            'updateExample', // devtools에서 디버깅을 쉽게 하기 위해 이름 작성
          ),
        parameterExample: (count: number) =>
          set(
            () => ({ count }), // 객체 속성과 변수이름이 동일하면 생략 가능
            // ()=> ({count: count})
            undefined,
            'exampleStore/payloadExample',
          ),
        payloadExample: (
          { count }, // 파라미터로 객체를 받은 경우 구조분해하여 사용가능
        ) =>
          set(
            () => ({ count }), // 객체 속성과 변수이름이 동일하면 생략 가능
            undefined,
            'exampleStore/payloadExample',
          ),
      }),
      { name: 'exampleStore' }, // devtools에 스토어 이름 명시
    ),
  );
