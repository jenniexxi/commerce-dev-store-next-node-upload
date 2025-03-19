# commerce-dev-store-next-node/commerce

## 📖 Introduction

이 프로젝트는 ...

## 📑 Table of Contents

- [Project Installation](#-project-installation)
  - [Setup](#-setup)
  - [Development](#-development)
  - [Build](#-build)
- [사용 예제](#-사용-예제)
  - [이미지 사용 예제](#-이미지-사용-예제)

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

```bash
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
├── .env.development         : 개발용 환경 변수 설정 파일
├── .env.production          : 배포용 환경 변수 설정 파일
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

```tsc
// import 사용시
import IcoCheckDefault from 'ui/svg/icoCheckDefault.svg';

// src로 사용시 (절대 경로)
src='/ui/images/test.png'
```

개발 서버를 실행하거나 빌드할 때 자동으로 packages/ui/src/assets 폴더의 내용을 commerce/public/ui 폴더로 복사합니다.  
이 과정에서 기존 폴더는 삭제된 후 복사되며 public/ui에 이미지를 수동으로 추가한 경우 삭제될 수 있습니다.

#### commerce의 assets 사용 시 경로

tsconfig의 path에 정의된 경로 `'/assets/\*'`를 사용하여 접근할 수 있습니다.  
Next.js에서는 src 경로를 절대 경로로 작성해야합니다.

```tsc
// import 사용시
import NextSvg from 'assets/svg/next.svg';

// src로 사용시 (절대 경로)
src='/assets/svg/next.svg'
```
