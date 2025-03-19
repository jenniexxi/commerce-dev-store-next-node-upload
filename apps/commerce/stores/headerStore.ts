import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import { HeaderConfig } from '@ui/hooks/useTypedOutletContext';

// 실제 초기 상태 (헤더 숨김)
const INITIAL_CONFIG: HeaderConfig = {
  showHeader: false,
  showLeftButton: true,
  showTitle: true,
  showRightButton: false,
  title: '',
};

export type HeaderState = {
  headerConfig: HeaderConfig;
  isReady: boolean;
};

export type HeaderActions = {
  updateHeader: (config: Partial<HeaderConfig>) => void;
  resetHeader: () => void;
  setReady: (ready: boolean) => void;
};

export type HeaderStore = HeaderState & HeaderActions;

export const initState: HeaderState = {
  headerConfig: INITIAL_CONFIG,
  isReady: false,
};

export const createHeaderStore = () =>
  createStore<HeaderStore>()(
    devtools((set) => ({
      ...initState,
      updateHeader: (newConfig) =>
        set(
          () => ({
            headerConfig: {
              ...INITIAL_CONFIG, // 항상 초기 상태에서 시작
              ...newConfig, // 새로운 설정 적용
            },
            isReady: true,
          }),
          undefined,
          'headerStore/updateHeader',
        ),
      resetHeader: () =>
        set(
          () => ({
            headerConfig: INITIAL_CONFIG, // 완전히 초기 상태로 리셋
            isReady: false,
          }),
          undefined,
          'headerStore/resetHeader',
        ),
      setReady: (ready) =>
        set(
          () => ({
            isReady: ready,
          }),
          undefined,
          'headerStore/setReady',
        ),
    })),
  );
