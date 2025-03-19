# commerce-dev-store-next-node/apps/commerce

## 📑 Table of Contents

- [Introduction](#-introduction)
- [Tech Stack](#️-tech-stack)
- [Project Installation](#-project-installation)
  - [Setup](#-setup)
  - [Development](#-development)
  - [Build](#-build)
- [사용 예제](#-사용-예제)
  - [이미지 사용 예제](#-이미지-사용-예제)
  - [스토어 사용 예제](#-스토어-사용-예제)
  - [API 사용 예제](#-api-사용-예제)

## 📖 Introduction

이 프로젝트는 Rround 모노레포에 포함된 Commerce 프로젝트입니다.  
Commerce는 Next.js, React Query, Zustand를 사용하여 개발되었으며, 서버 사이드 렌더링(SSR)을 지원하여 SEO 최적화를 고려한
설계가 특징입니다.

## ⚙️ Tech Stack

- **Next.js**: 서버 사이드 렌더링(SSR) 및 정적 사이트 생성을 위한 React 프레임워크
- **React Query**: 데이터 페칭 및 상태 관리를 위한 라이브러리
- **Zustand**: 상태 관리 라이브러리
- **Styled Components**: 스타일링을 위한 CSS-in-JS 라이브러리
- **TypeScript**: 타입 안정성을 제공하는 JavaScript 슈퍼셋

## 🛠 Project Installation

### 🔧 Setup

이 프로젝트는 commerce-dev-store-next-node 루트에서 모든 프로젝트가 설치 및 실행됩니다.  
루트 디렉토리에서 설치 및 실행하는 방법은
[루트](https://ecommerce-git-dev.hectoinnovation.co.kr/commerce/commerce-dev-store-next-node)로 이동하여 진행해주세요.

commerce 프로젝트를 설치하려면 아래 명령어를 사용하세요.

```bash
cd apps/commerce
pnpm install --frozen-lockfile
```

**--frozen-lockfile** 옵션은 pnpm-lock.yaml 파일이 변경되지 않도록 하여 의존성의 일관성을 보장합니다.  
이 옵션을 사용하면 이미 존재하는 lockfile에 정의된 의존성만 설치되며 새로운 패키지나 업데이트가 발생하지 않습니다.

### 🚀 Development

commerce 프로젝트를 개발 환경에서 실행하는 방법입니다.  
실시간 변경 사항을 반영하여 로컬에서 테스트할 수 있습니다.

```bash
cd apps/commerce
pnpm dev
```

### 📦 Build

commerce 프로젝트를 프로덕션 환경에서 사용할 수 있도록 빌드하는 방법입니다.

```bash
cd apps/commerce
pnpm build
```

## 📂 Project structure

```text
commerce-dev-store-next-node/apps/commerce

├── apis                     : API 요청을 관리하는 폴더
├── app                      : app router 디렉토리 (하위 폴더 자동 라우팅)
│   ├── layout.tsx           : 애플리케이션의 공통 레이아웃 정의
│   └── page.tsx             : 루트 페이지 정의
├── components               : 이 프로젝트(Commerce) 내에서만 사용하는 재사용 가능한 UI 컴포넌트 관리
├── hooks                    : 커스텀 훅 관리
│   └── query                : react-query 관련 hook 모음
├── providers                : 전역적으로 필요한 설정 및 상태 관리를 담당하는 컴포넌트 관리
├── public                   : 정적 파일(이미지, 폰트, 아이콘 등)을 저장하는 폴더
│   ├── ui                   : packages/ui/src/assets의 폴더를 복사한 폴더
│   └── assets               : commerce 내에서만 사용하는 정적 파일 관리
├── stores                   : 전역 상태 관리(store) 관련 폴더
├── type                     : 타입 정의 파일 관리
├── utils                    : 유틸리티 함수들이 위치하는 폴더
├── .env.development         : 개발용 환경 변수 설정 파일
├── .env.production          : 배포용 환경 변수 설정 파일
├── .gitignore               : git에서 추적하지 않을 파일들을 정의하는 파일
├── eslint.config.js         : eslint 설정 파일
├── next.config.js           : NextJs 설정 파일
├── package.json             : 프로젝트 설정 및 의존성 관리
├── README.md                : 프로젝트 설명 및 사용 방법
└── tsconfig.json            : typescript 설정 파일
```

## 📚 사용 예제

### 📖 이미지 사용 예제

#### jpg, gif, png 등

Next.js에서는 자동으로 이미지 최적화를 수행하는 Image 컴포넌트를 제공합니다.  
`img` 태그를 사용할 경우 최적화 기능을 활용할 수 없으며 일부 환경에서는 오류가 발생할 수 있으므로 `Image` 컴포넌트를
사용하는 것이 권장됩니다.

```tsx
import Image from 'next/image';

export default function Example() {
  return (
    <Image
      src='/ui/images/test.png'
      alt='샘플 이미지'
      width={100}
      height={100}
    />
  );
}
```

#### styled-components

```tsx
const StyledBackground1 = styled.div`
  background-image: url('/ui/images/test.png');

  // 또는

  background-image: url('/ui/svg/bg_start_on.svg');
`;
```

#### SVG

SVG 파일은 컴포넌트로 직접 사용할 수 있으며, 네이밍은 PascalCase(대문자로 시작하는 형식)로 작성해야 합니다.  
`className="svg"`를 추가하면 `color` 속성을 통해 색상을 제어할 수 있습니다.

```tsx
import IcoCheckDefault from 'ui/svg/icoCheckDefault.svg';

export default function Example() {
  return (
    <IcoCheckDefault
      className='svg'
      color='red'
      width={100}
      height={100}
    />
  );
}
```

#### 공통 패키지의 assets 사용 시 경로

tsconfig의 path에서 정의된 경로 `'/ui/*'`를 사용하여 접근할 수 있습니다.  
Next.js에서는 src 경로를 절대 경로로 작성해야합니다.

```tsx
// import 사용시
import IcoCheckDefault from 'ui/svg/icoCheckDefault.svg';

// src로 사용시 (절대 경로)
src = '/ui/images/test.png';
```

개발 서버를 실행하거나 빌드할 때 자동으로 packages/ui/src/assets 폴더의 내용을 commerce/public/ui 폴더로 복사합니다.  
이 과정에서 기존 폴더는 삭제된 후 복사되며 public/ui에 이미지를 수동으로 추가한 경우 삭제될 수 있습니다.

#### commerce의 assets 사용 시 경로

tsconfig의 path에 정의된 경로 `'/assets/*'`를 사용하여 접근할 수 있습니다.  
Next.js에서는 src 경로를 절대 경로로 작성해야합니다.

```tsx
// import 사용시
import NextSvg from 'assets/svg/next.svg';

// src로 사용시 (절대 경로)
src = '/assets/svg/next.svg';
```

### 📖 스토어 사용 예제

#### commerce 내부 스토어

Next.js에서는 클라이언트와 서버에서 출력이 다를 경우 하이드레이션 오류(hydration errors)가 발생할 수 있습니다.  
이를 방지하기 위해 앱의 최상단에서 StoreProvider를 통해 context를 사용하여 서버에서 스토어를 초기화하고 클라이언트에서
이를 렌더링합니다.

```tsx
//commerce/layout.tsx

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
```

#### 스토어 작성

zustand store 작성 예제 입니다.  
또한 zustand는 Redux devtools를 통해 상태 변화와 액션을 모니터링할 수 있습니다.

```ts
// store/exampleStore.ts

import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ExampleState {
  count: number;
}

export type ExampleActions = {
  updateExample: () => void;
  parameterExample: (count: number) => void;
  payloadExample: (payload: { count: number }) => void;
};

// ...

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
```

#### 페이지 및 컴포넌트에서 사용

Next.js에서는 클라이언트 상태 관리를 위해 스토어를 사용하는 컴포넌트 파일 상단에 `use client`를 명시해야 합니다.

```tsx
'use client';

import { useExampleStore } from 'stores/useStore';

export default function Example() {
  // 스토어에서 가져올 상태(state)나 action
  const { count, updateExample, parameterExample, payloadExample } = useExampleStore((state) => state);

  // 단순 action 호출
  const handleUpdateExample = () => {
    updateExample();
  };

  // argument가 단일 변수 일 때
  const handleParameterExample = (count: number) => {
    parameterExample(count);
  };

  // argument가 객체 일 때

  // 구조 분해를 이용한 방식 권장
  const handlePayloadExample = ({ count }: { count: number }) => {
    payloadExample({ count });
  };

  // or

  const handlePayloadExample = (payload: { count: number }) => {
    payloadExample({ count: payload.count });
  };

  return (
    <div>
      <h1>Example</h1>
      <p>Count: {count}</p>
      <button onClick={handleUpdateExample}>Update Example</button>
      <button onClick={() => handleParameterExample(100)}>Parameters Example</button>
      <button onClick={() => handlePayloadExample({ count: 5000 })}>Payload Example</button>
    </div>
  );
}
```

### 📖 API 사용 예제

#### Axios 사용법

axiosInstance를 사용하여 API를 호출합니다.  
`get()` 함수에서는 `<AxiosResponse<[ResponseType]>>`을 명시하여 reaponse data의 타입을 추론할 수 있도록 합니다.  
에러 처리는 react-query에서 담당합니다.

```ts
// apis/displayApi.ts
import { DisplayGoodsSortTypeCode } from 'type';
import { axiosInstance } from './api';
import { DisplayUrl } from './urls';
import { AxiosResponse } from 'axios';

// ...

export const DisplayAPI = {
  // ...
  getMainDisplayInfo: () =>
    axiosInstance.get<AxiosResponse<getMainDisplayInfoRep>>(DisplayUrl.getMainDisplayInfo).then((resp) => resp.data),
  },
};
```

#### React Query 사용법

[React Query](https://tanstack.com/query/latest/docs/framework/react/overview)는 서버 상태를 효율적으로 관리하는
라이브러리입니다.  
자동 캐싱, 리페치, 에러 핸들링 등의 기능을 제공하여 API 데이터를 쉽게 관리할 수 있습니다.

##### query key

React Query는 같은 queryKey를 사용하면 캐싱된 데이터를 재사용하여, 동일한 API 호출 시 실제 서버 요청은 한 번만
발생합니다.

```ts
useQuery({ queryKey: ['abc'], queryFn: fetchAbc });
useQuery({ queryKey: ['abc'], queryFn: fetchAbc }); // 캐싱된 데이터 사용
```

사용자별로 다른 데이터를 받아야 한다면, queryKey에 변수(userId 등) 를 포함해야 합니다.

```ts
useQuery({ queryKey: ['user', userId], queryFn: () => fetchUser(userId) });
```

이렇게 하면 각 사용자(userId) 데이터가 따로 캐싱되어 새로운 데이터를 호출할 수 있습니다.

현재 프로젝트에서는 keys 객체를 통해 관리하고 있습니다.

```ts
export const displayKeys = {
  base: ['display'] as const, // 1depth 기준
  getMainDisplayInfo: () => [...displayKeys.base, 'getMainDisplayInfo'] as const,
  // as const를 이용하여 데이터 보호 및 정확한 타입 유지
};
```

POST, PUT, DELETE 같은 요청 발생 시, 정보 갱신을 위해 쿼리를 리패치(refetch)하거나 무효화(invalidateQueries)할 수
있습니다.  
이때 쿼리키(queryKey)를 사용하면, 레벨에 따라 전체 무효화가 가능해집니다.

```ts
queryClient.invalidateQueries({ queryKey: displayKeys.base });
```

호출 시 `display`가 들어간 쿼리는 전체 무효화됩니다.

##### useQeury

데이터 조회 요청(GET)은 `useQuery`를 사용합니다.  
`select`는 응답된 데이터 중에서 data 객체만 필터링합니다.

```ts
// hooks/query/displayQuery.ts

export const useGetMainDisplayInfo = () =>
  useQuery({
    queryKey: displayKeys.getMainDisplayInfo(),
    queryFn: () => DisplayAPI.getMainDisplayInfo(),
    select: (resp) => resp.data,
  });
```

데이터가 필요한 뷰단에서 사용할 수 있습니다.  
data 이외에도 isLoading, isSucess등의 메서드를 사용할 수 있습니다.  
자세한 내용은 [공식홈페이지](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery)를 참고하세요.

```ts
// app/example/page.tsx

'use client';

import { useExampleStore } from 'stores/useStore';
import { useGetMainDisplayInfo } from 'hooks/query/displayQuery';

export default function Example() {
  // ...

  const { data } = useGetMainDisplayInfo();

  return (
    <>
      {/* ... */}
      <ul>{data?.deviceTypeEnumList?.map(({ code, codeName }) => <li key={code}>{codeName}</li>)}</ul>
    </>
  );
}

```

##### useMutation
