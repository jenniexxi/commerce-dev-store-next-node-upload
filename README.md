# commerce-dev-store-next-node

## 📑 Table of Contents

- [commerce-dev-store-next-node](#commerce-dev-store-next-node)
  - [📑 Table of Contents](#-table-of-contents)
  - [🚀 Introduction](#-introduction)
  - [📁 Monorepo structure](#-monorepo-structure)
  - [⚙️ Tech Stack](#️-tech-stack)
  - [🛠 Project Installation](#-project-installation)
    - [📋 Prerequisites](#-prerequisites)
    - [🔧 Setup](#-setup)
    - [🚀 Development](#-development)
    - [📦 Build](#-build)
  - [🛠 Package Management](#-package-management)
    - [➕ Package Add](#-package-add)
    - [❌ Package Remove](#-package-remove)
  - [🔌 Recommended Extensions](#-recommended-extensions)
  - [📂 Project structure](#-project-structure)
  - [🚀 CI/CD 파이프라인](#-cicd-파이프라인)
    - [배포 흐름 상세 과정](#배포-흐름-상세-과정)
    - [AWS 리소스 구성](#aws-리소스-구성)
    - [새 서비스 추가 방법](#새-서비스-추가-방법)
    - [포트 할당 규칙](#포트-할당-규칙)
    - [환경별 설정](#환경별-설정)
  - [🔍 서비스 생성 자동화](#-서비스-생성-자동화)
    - [자동화 스크립트 사용법](#자동화-스크립트-사용법)
    - [스크립트 상세 원리](#스크립트-상세-원리)
      - [create-service.sh(Bash) 스크립트 동작 과정](#create-serviceshbash-스크립트-동작-과정)
    - [기술적 세부 사항](#기술적-세부-사항)
      - [Bash 스크립트의 동작 메커니즘](#bash-스크립트의-동작-메커니즘)
    - [스크립트가 생성하는 파일 구조와 중요도](#스크립트가-생성하는-파일-구조와-중요도)
    - [스크립트 선택 가이드](#스크립트-선택-가이드)
  - [🔄 배포 동작 원리](#-배포-동작-원리)
    - [Git 푸시부터 시작되는 배포 파이프라인](#git-푸시부터-시작되는-배포-파이프라인)
    - [Docker 역할](#docker-역할)
    - [Docker 이미지 빌드 상세 가이드](#docker-이미지-빌드-상세-가이드)
    - [Dockerfile 상세 분석](#dockerfile-상세-분석)
    - [service-template 디렉토리의 역할](#service-template-디렉토리의-역할)
    - [Docker와 AWS 리소스 간의 관계](#docker와-aws-리소스-간의-관계)
    - [ECS 배포 메커니즘 상세 설명](#ecs-배포-메커니즘-상세-설명)
    - [배포 실패 시 디버깅 프로세스](#배포-실패-시-디버깅-프로세스)

## 🚀 Introduction

이 프로젝트는 **Turborepo**와 **pnpm**을 기반으로 한 **모노레포(Monorepo)** 프로젝트입니다.  
여러 개의 애플리케이션(`apps/`)과 공통 패키지(`packages/`)를 통합하여 관리하며,  
코드 재사용성과 개발 효율성을 극대화하는 것을 목표로 합니다.

## 📁 Monorepo structure

- [apps/commerce](https://ecommerce-git-dev.hectoinnovation.co.kr/commerce/commerce-dev-store-next-node/-/tree/development/apps/commerce?ref_type=heads):
  commerce 애플리케이션
- packages/eslint-config: 모노레포에서 사용하는 공통 ESLint 설정 패키지
- packages/typescript-config: 모노레포에서 사용하는 공통 TypeScript 설정 패키지
- [packges/ui](https://ecommerce-git-dev.hectoinnovation.co.kr/commerce/commerce-dev-store-next-node/-/tree/development/packages/ui?ref_type=heads):
  공통 UI, 유틸리티, 상태 관리 등의 패키지

## ⚙️ Tech Stack

- **Monorepo**: Turborepo
- **Package Management**: pnpm workspaces
- **Build System**: Turborepo
- **Linting & Formatting**: ESLint, Prettier
- **Type Checking**: TypeScript
- **CI/CD**: Jenkins, AWS ECS/ECR

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

```text
commerce-dev-store-next-node/

├── .vscode                  : VSCode 설정 파일
├── apps                     : 모노레포 내 프로젝트 폴더
│   ├── commerce             : 프로젝트 커머스
│   └── ...                  : 프로젝트 확장.(root에서 pnpm create-new-service <서비스명> [<포트>] [<도메인>])
├── packages                 : 모노레포 내 공유 패키지
│   ├── eslint-config        : 공통으로 사용되는 ESLint 설정 패키지
│   ├── typescript-config    : 공통으로 사용되는 TypeScript 설정 패키지
│   └── ui                   : 공통으로 사용되는 UI 패키지, 공통 함수 포함
├── jenkins                  : Jenkins CI/CD 설정 파일
│   └── ecs-task-def         : ECS 태스크 정의 파일
├── scripts                  : 유틸리티 스크립트
│   ├── service-template     : 서비스 템플릿 파일
│   ├── create-service.sh    : Bash 기반 서비스 생성 스크립트
│   └── new-service.js       : Node.js 기반 서비스 생성 스크립트
├── .gitignore               : git에서 추적하지 않을 파일들을 정의하는 파일
├── .npmrc                   : npm 설정 파일
├── .prettierrc              : Prettier 설정 파일
├── .stylelintrc.json        : Stylelint 설정 파일
├── Jenkinsfile              : Jenkins 파이프라인 정의 파일
├── package.json             : 프로젝트 설정 및 의존성 관리
├── pnpm-lock.yaml           : pnpm의 lock 파일
├── pnpm-workspace.yaml      : 모노레포의 작업 공간 설정
├── README.md                : 프로젝트 설명 및 사용 방법
└── turbo.json               : Turborepo 설정
```

## 🚀 CI/CD 파이프라인

이 프로젝트는 Jenkins와 AWS ECS/ECR을 활용한 CI/CD 파이프라인을 구현하고 있습니다.

### 배포 흐름 상세 과정

1. **코드 변경사항 푸시**

   - 개발자가 `development` 브랜치에 코드를 푸시하거나 PR 머지
   - GitLab 웹훅이 Jenkins 빌드 트리거

2. **Jenkins 파이프라인 실행**

   - Jenkins는 소스 코드를 체크아웃
   - 파이프라인은 다음 단계를 순차적으로 실행:
     1. **변경된 서비스 감지**
        - `apps/` 디렉토리 하위의 서비스 중 변경된 서비스 파악
        - 공통 패키지 변경 시 영향받는 서비스 모두 감지
     2. **서비스 설정 로드**
        - 각 서비스의 `service.config.json` 파일 읽기
        - 서비스별 포트, 도메인, ECR, ECS 설정 로드
     3. **의존성 설치 및 빌드**
        - Node.js 및 pnpm 환경 설정
        - 필요한 종속성 설치
        - 변경된 서비스만 선택적으로 빌드

3. **도커 이미지 빌드 및 배포**

   - 서비스별 Dockerfile 이용해 이미지 빌드
   - AWS ECR 로그인 및 이미지 푸시
   - 태그 생성 (배포 버전 관리)

4. **ECS 배포**

   - ECS 태스크 정의 파일 생성/업데이트
   - ECS 서비스 업데이트 명령 실행
   - 이전 버전에서 새 버전으로 점진적 전환

5. **상태 확인 및 롤백**
   - 배포 상태 모니터링
   - 필요시 롤백 명령 실행 가능

### AWS 리소스 구성

| 리소스 유형     | 네이밍 규칙                                                      | 용도               |
| --------------- | ---------------------------------------------------------------- | ------------------ |
| ECR 저장소      | `rr-commerce-dev-<서비스명>-ecr`                                 | 도커 이미지 저장   |
| ECS 클러스터    | `rr-dev-cluster`                                                 | 컨테이너 실행 환경 |
| ECS 서비스      | `rr-commerce-dev-<서비스명>-task-svc`                            | 서비스 관리        |
| ECS 태스크 정의 | `rr-commerce-dev-<서비스명>-task-define`                         | 컨테이너 구성 정의 |
| IAM 역할        | `rr-dev-ecs-task-execution-iam-role`, `rr-dev-ecs-task-iam-role` | 권한 관리          |
| CloudWatch 로그 | `/ecs/<서비스명>-dev-task-define`                                | 로그 저장 및 관리  |

### 새 서비스 추가 방법

서비스 추가 스크립트 사용시 오더내린 서비스가 apps/ 하위에 세팅.

1. **자동화 스크립트 사용**

   ```bash
   # Shell 스크립트 사용
   ./scripts/create-service.sh <서비스명> <포트> <도메인>

   # 또는 Node.js 스크립트 사용 (권장)
   pnpm create-new-service <서비스명> [<포트>] [<도메인>]
   ```

2. **서비스 구현**

   ```bash
   pnpm dev --filter=<서비스명>
   ```

3. **배포**

   - 코드를 development 브랜치에 푸시
   - Jenkins 파이프라인 자동 실행

4. **배포 확인**
   - AWS 콘솔에서 ECS 서비스 상태 확인
   - CloudWatch Logs에서 로그 확인
   - 서비스 URL 접속하여 동작 확인

### 포트 할당 규칙

| 서비스      | 포트 |
| ----------- | ---- |
| commerce    | 3000 |
| (새 서비스) | 30XX |

### 환경별 설정

환경별로 다음 파일을 통해 구성 관리:

- 개발 환경: `.env.development`
- 테스트 환경: `.env.test`
- 운영 환경: `.env.production`

## 🔍 서비스 생성 자동화

모노레포의 확장성을 위해 새로운 서비스를 빠르게 생성할 수 있는 자동화 스크립트를 제공합니다.

### 자동화 스크립트 사용법

**1. Node.js 스크립트 (권장)**

```bash
# 기본 사용법
pnpm create-new-service <서비스_이름> [<포트>] [<도메인>]

# 예시
pnpm create-new-service admin 3003 admin-dev.hectoinnovation.co.kr

# 도움말 보기
pnpm create-new-service --help
```

**2. Shell 스크립트 (레거시)**

```bash
# 기본 사용법
./scripts/create-service.sh <서비스_이름> <포트> <도메인>

# 예시
./scripts/create-service.sh admin 3003 admin-dev.hectoinnovation.co.kr
```

### 스크립트 상세 원리

#### create-service.sh(Bash) 스크립트 동작 과정

1. **입력 유효성 검사**

   - 필수 인자(서비스명, 포트, 도메인) 확인
   - 이미 존재하는 서비스명인지 검사

2. **디렉토리 생성**

   - `apps/<서비스명>/` 메인 디렉토리 생성
   - `public/`, `app/`, `components/`, 등 하위 디렉토리 생성
   - Jenkins 관련 디렉토리(`jenkins/ecs-task-def/`) 확인 및 생성

3. **AWS 리소스 이름 생성**

   - 표준화된 네이밍 규칙 적용
   - ECR 저장소: `rr-<서비스명>-dev-ecr`
   - ECS 서비스: `rr-<서비스명>-dev-task-svc`
   - 태스크 정의: `rr-<서비스명>-dev-task-define`
   - 로그 그룹: `/ecs/<서비스명>-dev-task-define`

4. **설정 파일 생성 프로세스**

   - `service.config.json`: heredoc 방식으로 JSON 생성
   - `Dockerfile`: 템플릿 기반 생성 및 서비스별 설정 치환
     - Next.js 전역 설치 포함 (`RUN npm install -g next`)
     - app/example 폴더 자동 제거 로직 포함 (보안 및 용량 최적화)
     - NODE_PATH 환경 변수 설정으로 모듈 참조 경로 문제 해결
   - `package.json`: 기본 의존성과 스크립트 포함
   - 환경 변수 파일: 개발/프로덕션용 설정 파일 생성
   - `next.config.js`: Next.js 표준 설정 및 standalone 모드 설정

5. **파일 권한 및 검증**
   - 생성된 파일에 적절한 권한 부여
   - 필수 파일 생성 여부 확인

### 기술적 세부 사항

#### Bash 스크립트의 동작 메커니즘

```bash
# 서비스 메타데이터 파일 생성 예시 (heredoc 사용)
cat > "apps/$SERVICE_NAME/service.config.json" << EOF
{
  "name": "$SERVICE_NAME",
  "port": $PORT,
  "domain": "$DOMAIN",
  "ecrName": "$ECR_NAME",
  ...
}
EOF

# 템플릿 치환 방식
cat << EOF > "apps/$SERVICE_NAME/Dockerfile"
FROM node:20-alpine AS builder
# 변수 치환이 발생하는 부분
WORKDIR /app
...
COPY apps/$SERVICE_NAME/package.json ./apps/$SERVICE_NAME/
...
EOF
```

- **장점**: 시스템 종속성이 적고 별도 의존성 없이 실행 가능
- **제한사항**: 복잡한 템플릿 처리 및 JSON 조작에 제약

### 스크립트가 생성하는 파일 구조와 중요도

```
apps/<서비스명>/
├── service.config.json  (★★★ 배포 파이프라인 필수)
├── Dockerfile           (★★★ 컨테이너 빌드 설정)
├── package.json         (★★★ 의존성 및 스크립트)
├── next.config.js       (★★★ Next.js 설정 및 standalone 모드)
├── public/              (★★ 정적 파일 디렉토리)
├── app/             (★★ Next.js App Router)
│   └── page.tsx     (★ 기본 페이지)
└── components/      (★ 컴포넌트 디렉토리)
├── .env.development     (★★ 개발 환경 변수)
└── .env.production      (★★ 프로덕션 환경 변수)
```

중요도: ★★★ 필수, ★★ 중요, ★ 유용

**service.config.json** 예시:

```json
{
  "name": "life",
  "port": "3002",
  "domain": "life-dev.hectoinnovation.co.kr",
  "ecrName": "rr-life-dev-ecr",
  "ecsServiceName": "rr-life-dev-task-svc",
  "ecsClusterName": "rr-dev-cluster",
  "taskFamily": "rr-life-dev-task-define",
  "containerName": "rr-life-dev-cont",
  "cpu": 1024,
  "memory": 2048,
  "memoryReservation": 1024,
  "logGroup": "/ecs/life-dev-task-define"
}
```

### 스크립트 선택 가이드

1. **Node.js 스크립트(create-new-service) 사용 권장 상황**:

   - 포트 번호를 자동 할당받고 싶을 때
   - 보다 시각적인 피드백이 필요할 때
   - 도움말 기능이 필요할 때

2. **Bash 스크립트(create-service.sh) 사용 권장 상황**:
   - Node.js가 설치되지 않은 환경
   - 기존 CI/CD 파이프라인과의 호환성이 필요할 때
   - 특정 시스템 명령어와 통합이 필요할 때

## 🔄 배포 동작 원리

모노레포 환경에서 새 서비스가 어떻게 배포되는지 이해하기 위해, Git 푸시부터 AWS에 배포 완료되는 전체 프로세스를 단계별로
설명합니다.

### Git 푸시부터 시작되는 배포 파이프라인

1. **코드 푸시 및 빌드 트리거**

   ```
   개발자 → Git 푸시 → GitLab 웹훅 → Jenkins 빌드 시작
   ```

   - 개발자가 `development` 브랜치에 코드를 푸시하거나 PR을 머지합니다.
   - GitLab의 웹훅이 설정된 Jenkins 작업을 자동으로 트리거합니다.

2. **Jenkins 파이프라인 단계별 실행**

   a. **환경 준비**

   ```
   Node.js 설치 → pnpm 설치 → AWS 자격 증명 설정
   ```

   - Node.js v20.18.3 환경 설정: `nvm use v20.18.3`
   - pnpm 9.0.0 설치: `npm install -g pnpm@9.0.0`
   - AWS 자격 증명이 Jenkins 자격 증명 저장소에서 로드됨

   b. **코드 체크아웃 및 변경 감지**

   ```
   GitLab 체크아웃 → 변경된 디렉토리 검사 → service.config.json 파일 로드
   ```

   - Jenkins가 GitLab에서 코드를 체크아웃합니다.
   - 변경된 파일이 있는 서비스 디렉토리를 감지합니다.
   - 감지된 서비스의 `service.config.json` 파일에서 배포 설정을 로드합니다.

3. **Docker 이미지 빌드 및 배포**

   - 서비스별 Dockerfile 이용해 이미지 빌드
   - AWS ECR 로그인 및 이미지 푸시
   - 태그 생성 (배포 버전 관리)

4. **ECS 배포**

   - ECS 태스크 정의 파일 생성/업데이트
   - ECS 서비스 업데이트 명령 실행
   - 이전 버전에서 새 버전으로 점진적 전환

5. **상태 확인 및 롤백**
   - 배포 상태 모니터링
   - 필요시 롤백 명령 실행 가능

### Docker 역할

1. **다단계 빌드로 효율성 향상**

   ```
   Builder 스테이지 → 빌드/컴파일 → Runner 스테이지 → 최소한의 파일만 복사
   ```

   - 첫 번째 스테이지(builder): 소스 코드를 빌드하고 컴파일
   - 두 번째 스테이지(runner): 빌드된 결과물만 가져와 경량화된 이미지 생성
   - 결과: 작은 이미지 크기, 빠른 배포, 보안 향상

2. **모노레포 특화 최적화**
   - 공통 패키지와 특정 서비스 코드를 함께 빌드
   - 환경 변수 주입으로 환경별 설정 관리
   - Next.js standalone 모드 활용으로 의존성 최적화

### Docker 이미지 빌드 상세 가이드

Docker 이미지는 모노레포 프로젝트를 컨테이너화하는 핵심 요소입니다. 이 섹션에서는 이미지 빌드 과정을 상세히 설명합니다.

1. **Docker 이미지 빌드 명령어**

   ```bash
   # 기본 빌드 명령어
   docker build -t <서비스명>:<태그> -f apps/<서비스명>/Dockerfile .

   # 캐시 없이 빌드 (의존성 또는 모듈 문제 발생 시 필수)
   docker build --no-cache -t <서비스명>:<태그> -f apps/<서비스명>/Dockerfile .

   # 예시: analytics 서비스를 v1 태그로 빌드
   docker build -t analytics:v1 -f apps/analytics/Dockerfile .
   ```

   - **-t (--tag)**: 이미지 이름과 태그 지정
   - **-f (--file)**: Dockerfile 경로 지정
   - **--no-cache**: 이전 빌드 캐시를 사용하지 않고 모든 단계를 새로 빌드
     - Next.js 모듈 경로 문제나 의존성 충돌 시 반드시 사용
     - 글로벌 모듈 설치 변경 후에도 반드시 사용
   - 마지막 `.`: 빌드 컨텍스트 경로 (모노레포 루트 디렉토리)

2. **빌드 컨텍스트의 중요성**

   - **빌드 컨텍스트**: Docker 빌드 명령의 마지막 인자(`.`)는 빌드 컨텍스트 경로
   - **주의사항**: 모노레포 구조에서는 반드시 루트 디렉토리에서 실행해야 함
   - **잘못된 예**: `cd apps/analytics && docker build -t analytics:v1 .` (실패: 공통 패키지 참조 불가)
   - **올바른 예**: `docker build -t analytics:v1 -f apps/analytics/Dockerfile .` (성공: 전체 모노레포 참조 가능)

3. **단계별 빌드 프로세스**

   a. **빌더 스테이지 (Builder Stage)**

   ```dockerfile
   FROM node:20-alpine AS builder
   # 환경 설정
   WORKDIR /app
   ENV NODE_ENV=development

   # pnpm 설정 및 의존성 설치
   RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
   COPY pnpm-lock.yaml package.json turbo.json ./
   COPY apps/<서비스명>/package.json ./apps/<서비스명>/
   COPY packages/ ./packages/
   RUN pnpm install --frozen-lockfile

   # Next.js 전역 설치 (경로 문제 해결)
   RUN npm install -g next

   # 소스 코드 복사
   COPY . .

   # example 폴더 제거 (보안 및 용량 최적화)
   RUN rm -rf /app/apps/<서비스명>/app/example && \
       echo "Example 폴더가 제거되었습니다: apps/<서비스명>/app/example"

   # NODE_PATH 환경변수 설정
   ENV NODE_PATH=/app/node_modules:/app/apps/<서비스명>/node_modules

   # 빌드 실행
   RUN cd apps/<서비스명> && pnpm run build
   ```

   - **역할**: 모든 의존성을 설치하고 애플리케이션을 빌드
   - **중요 명령어**: `pnpm install`, `npm install -g next`, `pnpm run build`
   - **결과물**: `.next/standalone` 디렉토리에 최적화된 Node.js 애플리케이션

   b. **러너 스테이지 (Runner Stage)**

   ```dockerfile
   FROM node:20-alpine AS runner
   WORKDIR /app

   # 빌드 결과물만 복사
   COPY --from=builder /app/apps/<서비스명>/.next/standalone/ ./
   COPY --from=builder /app/apps/<서비스명>/public ./public
   COPY --from=builder /app/apps/<서비스명>/.next/static ./.next/static

   # 서버 실행
   CMD ["node", "/app/apps/<서비스명>/server.js"]
   ```

   - **역할**: 최소한의 필요 파일만 포함한 실행 환경 제공
   - **중요 점**: 빌더 스테이지에서 생성된 파일만 복사
   - **실행 명령**: `node /app/apps/<서비스명>/server.js`

4. **CI/CD 환경 빌드 설정**

   Jenkins 환경에서 도커 빌드 시 주의사항:

   ```bash
   # Jenkins 파이프라인 스크립트 예시
   stage('Docker Build') {
     steps {
       sh "docker build -t ${SERVICE_NAME}:${BUILD_NUMBER} -f apps/${SERVICE_NAME}/Dockerfile --build-arg NODE_ENV=production ."
     }
   }
   ```

   - **build-arg**: 빌드 시 환경변수 전달 (NODE_ENV, API_URL 등)
   - **--pull**: 기본 이미지 최신 버전 강제 다운로드
   - **--label**: 빌드 메타데이터 추가 (빌드 번호, 커밋 해시 등)

### Dockerfile 상세 분석

서비스별 Dockerfile은 두 개의 주요 스테이지로 구성됩니다:

1. **빌더 스테이지 (Builder Stage)**

   ```dockerfile
   FROM node:20-alpine AS builder
   # 환경 설정
   WORKDIR /app
   ENV NODE_ENV=development

   # pnpm 설정 및 의존성 설치
   RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
   COPY pnpm-lock.yaml package.json turbo.json ./
   COPY apps/<서비스명>/package.json ./apps/<서비스명>/
   COPY packages/ ./packages/
   RUN pnpm install --frozen-lockfile

   # Next.js 전역 설치 (경로 문제 해결)
   RUN npm install -g next

   # 소스 코드 복사
   COPY . .

   # example 폴더 제거 (보안 및 용량 최적화)
   RUN rm -rf /app/apps/<서비스명>/app/example && \
       echo "Example 폴더가 제거되었습니다: apps/<서비스명>/app/example"

   # NODE_PATH 환경변수 설정
   ENV NODE_PATH=/app/node_modules:/app/apps/<서비스명>/node_modules

   # 빌드 실행
   RUN cd apps/<서비스명> && pnpm run build
   ```

   - **역할**: 모든 의존성을 설치하고 애플리케이션을 빌드
   - **중요 명령어**: `pnpm install`, `npm install -g next`, `pnpm run build`
   - **결과물**: `.next/standalone` 디렉토리에 최적화된 Node.js 애플리케이션

2. **실행 스테이지 (Runner Stage)**

   ```dockerfile
   FROM node:20-alpine AS runner
   WORKDIR /app

   # 빌드 결과물만 복사
   COPY --from=builder /app/apps/<서비스명>/.next/standalone/ ./
   COPY --from=builder /app/apps/<서비스명>/public ./public
   COPY --from=builder /app/apps/<서비스명>/.next/static ./.next/static

   # 서버 실행
   CMD ["node", "/app/apps/<서비스명>/server.js"]
   ```

   - **역할**: 최소한의 필요 파일만 포함한 실행 환경 제공
   - **중요 점**: 빌더 스테이지에서 생성된 파일만 복사
   - **실행 명령**: `node /app/apps/<서비스명>/server.js`

### service-template 디렉토리의 역할

`scripts/service-template` 디렉토리는 새 서비스 생성 자동화의 핵심입니다:

1. **Dockerfile.template**

   ```
   실제 파일 위치: scripts/service-template/Dockerfile.template
   ```

   - **역할**: 새 서비스용 Dockerfile 템플릿 제공
   - **동작 방식**: 변수(${SERVICE_NAME}, ${PORT} 등)가 실제 값으로 치환됨
   - **중요 포인트**: 모노레포 구조와 Next.js standalone 모드 설정 포함

2. **docker-compose.template.yml**
   ```
   실제 파일 위치: scripts/service-template/docker-compose.template.yml
   ```
   - **역할**: 로컬 개발 환경에서 서비스 테스트를 위한 Docker Compose 설정
   - **사용법**: 로컬에서 `docker-compose up`으로 서비스 환경 테스트
   - **장점**: AWS 환경과 유사한 격리된 개발 환경 제공

### Docker와 AWS 리소스 간의 관계

개발자가 이해해야 할 Docker와 AWS 리소스 간의 관계는 다음과 같습니다:

```
로컬 Docker 이미지 → AWS ECR 저장소 → ECS 태스크 정의 → ECS 서비스 → Fargate
```

1. **Docker 이미지**: 애플리케이션 코드, 의존성, 실행 환경을 포함한 패키지
2. **ECR(Elastic Container Registry)**: Docker 이미지를 저장하는 AWS의 비공개 레지스트리
3. **ECS 태스크 정의**: Docker 컨테이너 실행 방법을 정의한 JSON 템플릿
4. **ECS 서비스**: 태스크 정의에 따라 컨테이너를 실행하고 관리
5. **Fargate**: 서버 관리 없이 컨테이너를 실행하는 서버리스 컴퓨팅 엔진

### ECS 배포 메커니즘 상세 설명

AWS ECS(Elastic Container Service)는 컨테이너화된 애플리케이션을 쉽게 배포하고 관리할 수 있게 해주는 서비스입니다:

1. **태스크 정의(Task Definition) 작성**

   태스크 정의는 컨테이너 실행 방법을 JSON 형식으로 정의한 청사진입니다. 다음은 주요 필드와 그 역할을 설명합니다:

   ```json
   {
    "family": 태스크 정의의 이름, 버전 관리를 위한 식별자
    "containerDefinitions": [
        {
            "name": 컨테이너 이름, 로그 식별 및 서비스 참조용
            "image": 컨테이너 이미지 URI, 변수로 계정ID와 빌드번호 사용,
            "cpu": 컨테이너에 할당할 CPU 유닛 (1024 = 1 vCPU),
            "memory":  컨테이너에 할당할 최대 메모리(MB),
            "memoryReservation":컨테이너에 보장할 최소 메모리(MB) ,
            "portMappings": [
                {
                    "name": 포트 매핑 이름, 식별용,
                    "containerPort": 컨테이너 내부 포트,
                    "hostPort": 호스트 포트 (awsvpc 모드에서는 containerPort와 동일해야 함),
                    "protocol": 프로토콜 유형 (tcp 또는 udp),
                }
            ],
            "essential": 필수 컨테이너 여부, true일 경우 이 컨테이너 실패 시 태스크 전체 중지,
            "environment": [
                {
                    "name": 환경변수 이름,
                    "value": 환경변수 값,
                }
            ],
            "environmentFiles":환경변수 파일 목록,
            "mountPoints": 볼륨 마운트 지점 목록,
            "volumesFrom": 다른 컨테이너에서 볼륨 공유 설정,
            "ulimits": 리소스 한계 설정, 사용하지 않음,
            "logConfiguration": {
                "logDriver": 로그 드라이버 선택,
                "options": { /* 로그 드라이버 옵션 */
                    "awslogs-group": CloudWatch 로그 그룹 이름,
                    "mode": "non-blocking", /* 로그 전송 모드, 비차단 방식으로 성능 향상 */
                    "awslogs-create-group": "true", /* 로그 그룹이 없을 경우 자동 생성 */
                    "max-buffer-size": "25m", /* 로그 버퍼 최대 크기 */
                    "awslogs-region": "ap-northeast-2", /* AWS 리전 */
                    "awslogs-stream-prefix": "ecs" /* 로그 스트림 접두사 */
                },
                "secretOptions": [] /* 비밀값 옵션, 사용하지 않음 */
            },
            "systemControls": [] /* Linux 커널 파라미터 설정, 사용하지 않음 */
        }
    ],
    "taskRoleArn": "arn:aws:iam::{{AWS_ACCOUNT_ID}}:role/rr-dev-ecs-task-iam-role", /* 태스크가 AWS 서비스에 접근할 때 사용할 IAM 역할 */
    "executionRoleArn": "arn:aws:iam::{{AWS_ACCOUNT_ID}}:role/rr-dev-ecs-task-execution-iam-role", /* ECS 에이전트가 이미지 가져오기, 로그 푸시 등에 사용할 IAM 역할 */
    "networkMode": "awsvpc", /* 네트워크 모드, awsvpc는 각 태스크가 ENI를 갖는 방식 */
    "volumes": 볼륨 정의 목록,
    "placementConstraints": 태스크 배치 제약 조건,
    "requiresCompatibilities": [
        "FARGATE" /* 이 태스크 정의가 호환되어야 하는 시작 유형, Fargate는 서버리스 모드 */
    ],
    "cpu": "1024", /* 태스크 전체에 할당되는 CPU 유닛 (문자열 형태) */
    "memory": "2048", /* 태스크 전체에 할당되는 메모리(MB) (문자열 형태) */
    "runtimePlatform": { /* 런타임 플랫폼 설정 */
        "cpuArchitecture": CPU 아키텍처, x86_64 또는 ARM64 선택 가능,
        "operatingSystemFamily":  OS 계열, LINUX 또는 WINDOWS 선택 가능,
    }
   }
   ```

   **주요 필드 설명**:

   - **family** (필수):
     - 버전 관리를 위한 기준점 (예: `rr-analytics-dev-task-define:1`, `rr-analytics-dev-task-define:2`)
   - **executionRoleArn** (필수):

     - 태스크를 실행하기 위해 ECS 에이전트가 사용하는 IAM 역할
     - 권한: ECR에서 이미지 가져오기, CloudWatch에 로그 쓰기 등
     - 일반적으로 모든 서비스가 공유하는 역할 사용 (`rr-dev-ecs-task-execution-iam-role`)

   - **taskRoleArn** (선택):

     - 컨테이너 내부에서 실행되는 애플리케이션이 AWS 리소스에 접근할 때 사용하는 IAM 역할
     - 권한: S3 접근, DynamoDB 쿼리, SQS 메시지 전송 등
     - 서비스별로 권한을 세분화하거나 공통 역할 사용 가능

   - **networkMode** (필수):

     - `awsvpc`: Fargate에 필수, 각 태스크가 ENI를 갖는 방식
     - 대안: `bridge`, `host`, `none` (EC2 시작 유형에서만 사용 가능)

   - **containerDefinitions** (필수):

     - 태스크에서 실행할 컨테이너 목록 (단일 또는 다중)
     - **name**: 컨테이너 이름 (로깅 및 참조용)
     - **image**: ECR 이미지 URI (형식: `<계정ID>.dkr.ecr.<리전>.amazonaws.com/<저장소명>:<태그>`)
     - **essential**: `true`로 설정 시 이 컨테이너가 중지되면 태스크 전체 중지
     - **portMappings**:
       - **containerPort**: 컨테이너 내부 포트
       - **hostPort**: 호스트 포트 (awsvpc 모드에서는 containerPort와 동일해야 함)
       - **protocol**: 대부분 `tcp` 사용
     - **environment**: 환경 변수 설정 (키-값 쌍 목록)
     - **logConfiguration**:
       - **logDriver**: AWS에서는 주로 `awslogs` 사용
       - **options.awslogs-group**: CloudWatch 로그 그룹 이름
       - **options.awslogs-region**: 로그를 저장할 리전
       - **options.awslogs-stream-prefix**: 로그 스트림 접두사

   - **requiresCompatibilities** (필수):

     - ECS 시작 유형 지정 (우리 프로젝트에서는 `["FARGATE"]` 사용)
     - 대안: `["EC2"]` 또는 `["EC2", "FARGATE"]`

   - **cpu** (필수 for Fargate):

     - 태스크에 할당할 CPU 유닛 (vCPU)
     - 일반적인 값: `256` (0.25 vCPU), `512` (0.5 vCPU), `1024` (1 vCPU), `2048` (2 vCPU)
     - 서비스 요구사항에 따라 조정 필요

   - **memory** (필수 for Fargate):

     - 태스크에 할당할 메모리 (MB)
     - 일반적인 값: `512`, `1024`, `2048`, `4096`, `8192`
     - CPU와 메모리는 Fargate에서 유효한 조합만 가능

   - **추가 옵션** (상황에 따라 사용):
     - **ephemeralStorage**: 임시 스토리지 크기 지정 (기본값은 20GB)
     - **volumes**: 컨테이너 간 공유 볼륨 정의
     - **placementConstraints**: 태스크 배치 제약 조건
     - **proxyConfiguration**: App Mesh 서비스 메시 통합 시 사용

   **태스크 정의 생성 및 관리**:

   - AWS 콘솔: ECS → 태스크 정의 → 새 태스크 정의 생성
   - Jenkins 파이프라인: 서비스 변경 시 자동으로 새 버전 등록

2. **배포 과정의 롤링 업데이트**
   ```
   현재 실행 중인 태스크 → 새 태스크 시작 → 헬스 체크 통과 → 이전 태스크 종료
   ```
   - **동작 방식**: 기존 서비스를 유지하면서 새 버전 배포
   - **모니터링 포인트**: runningCount와 desiredCount 상태 확인

### 배포 실패 시 디버깅 프로세스

배포에 문제가 발생했을 때 단계별로 문제를 찾는 방법:

1. **Jenkins 로그 확인**

   ```
   Jenkins 웹 UI → 사이드 메뉴 [빌드 기록] → 해당 빌드 번호 클릭 → [콘솔 출력]
   ```

   - **확인 사항**:

     - 빌드 단계별 진행 상황 및 실패 지점
     - Docker 이미지 빌드 로그에서 다음 정보 확인:
       - 빌드 단계(`Step X/Y`): 어떤 단계에서 실패했는지 파악
       - 의존성 설치 성공 여부(`RUN pnpm install` 단계)
       - 빌드 성공 여부(`RUN cd apps/<서비스명> && pnpm run build` 단계)
       - 최종 이미지 생성 성공 메시지(`Successfully built`)

   - **실패 패턴 예시**:
     - 의존성 오류: `npm ERR! code ENOENT` 또는 `pnpm ERR!`
     - 빌드 오류: `Failed to compile` 또는 `Build failed`
     - 메모리 부족: `JavaScript heap out of memory`

2. **AWS ECR 이미지 푸시 확인**

   ```
   AWS 콘솔 → 서비스[ECR] → 프라이빗 리포지토리 → 리포지토리 목록에서 [rr-<서비스명>-dev-ecr] 선택
   ```

   - **확인 사항**:

     - **[이미지] 탭**: 최신 이미지가 푸시되었는지 확인 (타임스탬프 확인)
     - **[태그] 열**: 예상한 태그(일반적으로 빌드 번호)가 있는지 확인
     - **[이미지 URI] 열**: ECR 이미지 URI가 ECS 태스크 정의의 이미지 URI와 일치하는지 확인
     - **[취약점 스캔 상태] 열**: 이미지 스캔 상태 및 발견된 취약점 확인 가능

   - **이미지 세부 정보**:
     - 이미지 태그 클릭 → 이미지 세부 정보 페이지
     - **[이미지 매니페스트]**: 이미지 레이어 및 크기 확인
     - **[이미지 태그]**: 동일 이미지에 여러 태그가 적용되었는지 확인

3. **ECS 서비스 배포 상태 확인**

   ```
   AWS 콘솔 → 서비스[ECS] → 클러스터 → [rr-dev-cluster] 클릭 → 서비스 탭 → [rr-<서비스명>-dev-task-svc] 클릭
   ```

   - **서비스 세부 정보 페이지**:

     - **[배포] 탭**:
       - **롤아웃 상태**: COMPLETED(성공), IN_PROGRESS(진행 중), FAILED(실패)
       - **작업 실행 중/바람직함**: 숫자가 일치해야 정상 (예: 1/1)
       - **최신 배포 상태**: PRIMARY(현재 활성화), ACTIVE(정상 동작 중)
     - **[작업] 탭**:

       - 실행 중인 작업 목록 확인
       - 작업 상태: RUNNING(정상), STOPPED(중지됨), PENDING(시작 중)
       - 작업이 없거나 모두 STOPPED 상태라면 배포 실패 가능성 높음

     - **[이벤트] 탭**:
       - 가장 최근 이벤트 메시지 확인 (위쪽에 표시)
       - 일반적인 오류 메시지:
         - `service <서비스명> was unable to place a task` (리소스 부족)
         - `failed to pull the image` (ECR 이미지 접근 권한 문제)
         - `task failed container health checks` (헬스 체크 실패)

   - **작업 세부 정보 확인**:

     - [작업] 탭에서 작업 ID 클릭 → 작업 세부 정보 페이지
     - **[세부 정보] 섹션**: 작업 상태, 시작 시간, 중지 이유 확인
     - **[컨테이너] 섹션**:
       - 컨테이너 상태: RUNNING(정상), STOPPED(중지됨)
       - 종료 코드: 0(정상 종료), 1 이상(오류 종료)
       - 중지 이유: 실패 원인 메시지 (예: `CannotPullContainerError`)

   - **서비스 업데이트 상태**:
     - **[배포] 탭**: 배포 상태가 "IN_PROGRESS"인 경우 진행 중
     - 진행률 확인: 작업 실행 개수 변화 관찰

4. **컨테이너 로그 확인 (CloudWatch)**

   ```
   AWS 콘솔 → 서비스[CloudWatch] → 로그 → 로그 그룹 → [/ecs/<서비스명>-dev-task-define] 클릭
   ```

   - **로그 스트림 목록**:

     - 최신 로그 스트림 클릭 (형식: `ecs/<컨테이너명>/<작업ID>`)
     - 로그 스트림이 없다면 작업이 아직 시작되지 않았거나 로깅 설정 문제

   - **로그 내용 분석**:

     - **애플리케이션 시작 로그**:
       - Next.js 시작 메시지: `ready - started server on 0.0.0.0:3000` (정상)
       - 오류 메시지: `Error:`, `Uncaught Exception:`, `Cannot find module` 등
     - **환경 변수 문제**: `process.env` 관련 오류
     - **라이브 테일 기능**:
       - **[실시간으로 로그 보기] 버튼** 클릭하여 실시간 로그 확인
       - 새 로그가 생성되지 않는다면 애플리케이션이 비정상 종료되었을 가능성

   - **로그 필터링**:
     - **[필터 이벤트] 검색창**에 키워드 입력 (예: "error", "fail", "exception")
     - 특정 시간대 로그 확인: 타임라인에서 해당 시간대 선택

5. **연결된 서비스 확인**

   ```
   AWS 콘솔 → 서비스[Systems Manager] → 노드 관리 → 세션 관리자 → [세션 시작] 버튼
   ```

   - **실행 중인 컨테이너에 직접 연결**:

     - ECS 콘솔 → 클러스터 → 서비스 → 작업 → 컨테이너 → [실행 명령] 버튼
     - 명령어 예시: `/bin/sh` 또는 `ls -la`
     - 파일 시스템 확인, 환경변수 출력(`env` 명령)

6. **종합적인 디버깅 전략**

   - **단계별 접근법**:
     1. Jenkins 빌드 로그로 이미지 빌드 성공 여부 확인
     2. ECR에서 이미지 푸시 확인
     3. ECS 서비스/작업 상태 확인
     4. CloudWatch 로그로 애플리케이션 로그 확인
   - **원인별 접근법**:
     - **이미지 빌드 문제**: Jenkins 로그 집중 분석
     - **이미지 푸시 문제**: ECR 저장소 권한 및 네트워크 확인
     - **컨테이너 시작 문제**: ECS 이벤트 메시지 및 작업 상태 확인
     - **애플리케이션 오류**: CloudWatch 로그 집중 분석
