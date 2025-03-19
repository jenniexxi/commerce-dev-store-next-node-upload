# commerce-dev-store-next-node

## 📖 Introduction

이 프로젝트는 ...

## 📑 Table of Contents

- [Project Installation](#-project-installation)
  - [Prerequisites](#-prerequisites)
  - [Setup](#-setup)
  - [Development](#-development)
  - [Build](#-build)
- [Package Management](#-package-management)
  - [Package Add](#-package-add)
  - [Package Remove](#-package-remove)
- [Recommended Extensions](#-recommended-extensions)
- [Recommended Extensions](#-recommended-extensions)
- [Project Structure](#-project-structure)

## 🛠 Project Installation

### 📋 Prerequisites

이 프로젝트를 실행하기 전에 필요한 환경 및 필수 패키지를 설정합니다.

- [homebrew](https://brew.sh/): macOS 용 패키지 관리자
- [Node.js](https://nodejs.org/ko): v20.10.0
- [nvm](https://github.com/nvm-sh/nvm): Node Version Manager
- [pnpm](https://pnpm.io/installation): v10.4.1

  - <details>
      <summary>📦 pnpm을 선택한 이유</summary>

        모노레포에서는 여러 패키지를 하나의 리포지토리에서 관리하지만
        기존 패키지 매니저(npm, yarn classic)는 node_modules을 패키지별로 설치하고
        플랫한 방식으로 의존성을 관리하기 때문에 디스크 사용량이 증가하며
        유령 의존성(Phantom Dependency) 문제로 관리가 복잡해질 수 있습니다.

        Plug'n'Play(PnP) 기능은 효율적인 의존성 관리와 유령 의존성 차단을 지원하며
        이를 활용하는 pnpm과 yarn berry 같은 패키지 매니저를 고려하게 되었습니다.
        그러나 yarn berry는 yarn classic과 100% 호환되지 않아
        기존 프로젝트에서 마이그레이션 시 문제가 발생할 가능성이 있습니다.

        하여 pnpm은 다음과 같은 이유로 채택하였습니다.

        ✅ 더 빠르고 효율적인 의존성 관리
        ✅ 모든 의존성을 프로젝트별로 격리하여 유령 의존성 차단
        ✅ 모노레포 환경에서 Turborepo와의 뛰어난 호환성으로 빌드 속도 최적화
        ✅ 기존 프로젝트 매니저와의 충돌 없음

    </details>

### 🔧 Setup

프로젝트를 로컬 환경에 설치하는 방법입니다.  
아래 명령어를 실행하여 프로젝트 구동에 필요한 패키지를 설치하세요.

```bash
pnpm install --frozen-lockfile
```

**--frozen-lockfile** 옵션은 pnpm-lock.yaml 파일이 변경되지 않도록 하여 의존성의 일관성을 보장합니다.  
이 옵션을 사용하면 이미 존재하는 lockfile에 정의된 의존성만 설치되며 새로운 패키지나 업데이트가 발생하지 않습니다.

### 🚀 Development

개발 환경에서 프로젝트를 실행하는 방법입니다.  
실시간 변경 사항을 반영하여 로컬에서 테스트할 수 있습니다.

```bash
pnpm dev
```

특정 프로젝트의 개발 서버를 실행하려면 다음 명령어를 사용하세요

```bash
pnpm dev --filter <프로젝트-이름>
pnpm dev --filter ui  # example
```

### 📦 Build

프로덕션 환경에서 사용할 수 있도록 프로젝트를 빌드하는 방법입니다.

```bash
pnpm build
```

특정 프로젝트를 빌드하려면 다음 명령어를 사용하세요

```bash
pnpm build --filter <프로젝트-이름>
pnpm build --filter ui  # example
```

## 🛠 Package Management

### ➕ Package Add

프로젝트에 필요한 패키지를 설치하는 방법입니다. 아래 명령어를 실행하여 필요한 패키지를 설치하세요.

```bash
pnpm add <패키지-이름> # dependencies 설치
pnpm add -D <패키지-이름> # devDependencies 설치
```

특정 프로젝트에 패키지를 설치하려면 다음 명령어를 사용하세요

```bash
pnpm add <패키지-이름> --filter <프로젝트-이름>
pnpm add <패키지-이름> --filter ui  # example
```

프로젝트 최상단 루트에 패키지를 설치하려면 다음 명령어를 사용하세요

```bash
pnpm add <패키지-이름> -w
```

### ❌ Package Remove

프로젝트에 설치된 패키지를 삭제하는 방법입니다. 아래 명령어를 실행하여 패키지를 삭제하세요.

```bash
pnpm remove <패키지-이름>
```

특정 프로젝트의 패키지를 삭제하려면 다음 명령어를 사용하세요

```bash
pnpm remove <패키지-이름> --filter <프로젝트-이름>
pnpm remove <패키지-이름> --filter ui  # example
```

프로젝트 최상단 루트에 패키지를 삭제하려면 다음 명령어를 사용하세요

```bash
pnpm remove <패키지-이름> -w
```

## 🔌 Recommended Extensions

다음의 VSCode extensions 설치를 권장합니다.

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint): 코드 품질을 검사하고 일관성을
  유지하는데 도움을 줍니다.
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode): 코드 포맷팅을 자동으로
  처리하여 가독성을 향상시킵니다.
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint): CSS, SCSS, Less 등 스타일
  코드 품질을 검사하고 일관성을 유지하는데 도움을 줍니다.

## 📂 Project structure

```bash
project-root/
├── .vscode                  : VSCode 설정 파일
├── apps                     : 모노레포 내 프로젝트 폴더
│   ├── car-life             : 프로젝트 카라이프
│   ├── commerce             : 프로젝트 커머스
│   └── life                 : 프로젝트 라이프
├── packages                 : 모노레포 내 공유 패키지
│   ├── eslint-config        : 공통으로 사용되는 ESLint 설정 패키지
│   ├── typescript-config    : 공통으로 사용되는 TypeScript 설정 패키지
│   └── ui                   : 공통으로 사용되는 UI 패키지, 공통 함수 포함
├── .npmrc                   : npm 설정 파일
├── .prettierrc              : Prettier 설정 파일
├── .stylelintrc.json        : Stylelint 설정 파일
├── package.json             : 프로젝트 설정 및 의존성 관리
├── pnpm-lock.yaml           : pnpm의 lock 파일
├── pnpm-workspace.yaml      : 모노레포의 작업 공간 설정
├── README.md                : 프로젝트 설명 및 사용 방법
└── turbo.json               : Turborepo 설정

```
