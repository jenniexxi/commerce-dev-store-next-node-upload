import { create } from 'zustand';
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

interface HeaderStore {
  headerConfig: HeaderConfig;
  isReady: boolean;
  updateHeader: (config: Partial<HeaderConfig>) => void;
  resetHeader: () => void;
  setReady: (ready: boolean) => void;
}

export const useHeaderStore = create<HeaderStore>()(
  devtools(
    (set) => ({
      headerConfig: INITIAL_CONFIG,
      isReady: false,
      updateHeader: (newConfig) =>
        set(
          {
            headerConfig: {
              ...INITIAL_CONFIG, // 항상 초기 상태에서 시작
              ...newConfig, // 새로운 설정 적용
            },
            isReady: true,
          },
          undefined,
          'updateHeader',
        ),
      resetHeader: () =>
        set(
          {
            headerConfig: INITIAL_CONFIG, // 완전히 초기 상태로 리셋
            isReady: false,
          },
          undefined,
          'resetHeader',
        ),
      setReady: (ready) => set({ isReady: ready }, undefined, 'setReady'),
    }),
    { name: 'headerStore' },
  ),
);
