# commerce-dev-store-next-node/packages/ui

## 📑 Table of Contents

- [Introduction](#-introduction)
- [Tech Stack](#️-tech-stack)
- [Project structure](#-project-structure)
- [사용 예제](#-사용-예제)

## 📖 Introduction

이 패키지는 Rround 모노레포의 공통 UI 컴포넌트들을 제공합니다.  
이 패키지에는 버튼, 입력창, 카드 등 다양한 재사용 가능한 UI 컴포넌트와 스타일이 포함되어 있습니다.  
프로젝트 내에서 일관된 디자인을 유지하고 재사용성을 높이기 위해 사용됩니다.

## ⚙️ Tech Stack

- **React**: UI 컴포넌트 라이브러리
- **Styled Components**: 스타일링을 위한 CSS-in-JS 라이브러리
- **Zustand**: 상태 관리 라이브러리
- **TypeScript**: 타입 안정성을 제공하는 JavaScript 슈퍼셋

## 📂 Project structure

```text
commerce-dev-store-next-node/packages/ui/

├── src
│   ├── @types               : 모노레포 전역에서 사용하는 외부 모듈 타입 정의 폴더
│   ├── assets               : 모노레포 전역에서 사용하는 정적 파일을 관리하는 폴더
│   ├── commons              :
│   ├── components           : 모노레포 전역에서 사용하는 재사용 가능한 UI 컴포넌트 폴더
│   ├── constants            : 모노레포 전역에서 사용하는 상수 변수를 관리하는 폴더
│   ├── hooks                : 모노레포 전역에서 사용하는 커스텀 훅 폴더
│   ├── stores               : `packages/ui` 내 상태 관리(store) 관련 폴더
│   ├── styles               : 모노레포 전역에서 사용하는 글로벌 스타일 폴더
│   ├── type                 : `packages/ui` 내 타입 정의를 관리하는 폴더
│   └── utils                : 모노레포 전역에서 사용하는 유틸리티 함수 폴더
├── eslint.config.mjs        : eslint 설정 파일
├── package.json             : 프로젝트 설정 및 의존성 관리
├── README.md                : 프로젝트 설명 및 사용 방법
└── tsconfig.json            : typescript 설정 파일
```

## 📚 사용 예제

`packages/ui`는 모노레포의 apps 내 하위 프로젝트에서 import하여 사용할 수 있습니다.  
`tsconfig`의 `paths` 옵션에서 `@ui/*` 경로로 정의되어 있으며,  
각 폴더 내에 **배럴 파일(barrel file)** 이 제공되므로, 중괄호 `{}` 안에 컴포넌트 및 함수를 선언하여 사용할 수 있습니다.

```tsx
import { Button, Checkbox } from '@ui/components';
import { GlobalStyles } from '@ui/styles';
```
