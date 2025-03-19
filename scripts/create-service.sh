#!/bin/bash
# Bash 스크립트임을 나타내는 shebang 라인, 스크립트를 bash로 실행하도록 지정

# 스크립트 사용법 표시
# 명령줄 인자 개수 확인, 필수 파라미터 3개(서비스명, 포트, 도메인) 미만이면 사용법 표시하고 종료
if [ $# -lt 3 ]; then
    echo "사용법: $0 <서비스_이름> <포트> <도메인>" # 스크립트 사용 방법 안내 출력
    echo "예시: $0 life 3002 life-dev.hectoinnovation.co.kr" # 사용 예시 출력
    exit 1 # 오류 코드 1로 종료
fi

SERVICE_NAME=$1 # 첫 번째 명령행 인자를 서비스 이름으로 설정
PORT=$2 # 두 번째 명령행 인자를 포트 번호로 설정
DOMAIN=$3 # 세 번째 명령행 인자를 도메인으로 설정
ECR_NAME="rr-${SERVICE_NAME}-dev-ecr" # ECR 저장소 이름 생성, 네이밍 규칙에 따라 포맷팅
ECS_SERVICE_NAME="rr-${SERVICE_NAME}-dev-task-svc" # ECS 서비스 이름 생성
ECS_CLUSTER_NAME="rr-dev-cluster" # ECS 클러스터 이름 설정 (모든 서비스가 공유)
TASK_FAMILY="rr-${SERVICE_NAME}-dev-task-define" # ECS 태스크 정의 이름 생성
CONTAINER_NAME="rr-${SERVICE_NAME}-dev-cont" # 컨테이너 이름 생성
LOG_GROUP="/ecs/${SERVICE_NAME}-dev-task-define" # CloudWatch 로그 그룹 이름 생성

# 서비스 디렉토리가 이미 존재하는지 확인
# apps 폴더에 해당 서비스 이름의 디렉토리가 이미 있는지 확인, 있으면 중복 생성 방지
if [ -d "apps/$SERVICE_NAME" ]; then
    echo "오류: $SERVICE_NAME 디렉토리가 이미 존재합니다."
    exit 1 # 오류 코드 1로 종료
fi

# 필요한 디렉토리 생성
mkdir -p "apps/$SERVICE_NAME"
mkdir -p "apps/$SERVICE_NAME/public"
mkdir -p "apps/$SERVICE_NAME/app"
mkdir -p "apps/$SERVICE_NAME/components"
mkdir -p "jenkins/ecs-task-def"

# 서비스 메타데이터 파일 생성
cat > "apps/$SERVICE_NAME/service.config.json" << EOF
{
  "name": "$SERVICE_NAME",
  "port": $PORT,
  "domain": "$DOMAIN",
  "ecrName": "$ECR_NAME",
  "ecsServiceName": "$ECS_SERVICE_NAME",
  "ecsClusterName": "$ECS_CLUSTER_NAME",
  "taskFamily": "$TASK_FAMILY",
  "containerName": "$CONTAINER_NAME",
  "cpu": 1024,
  "memory": 2048,
  "memoryReservation": 1024,
  "logGroup": "$LOG_GROUP"
}
EOF

# Dockerfile 생성
echo "Dockerfile 생성 중..."
cat << EOF > "apps/$SERVICE_NAME/Dockerfile"
# 빌드 스테이지
FROM node:20-alpine AS builder
WORKDIR /app

# 빌드 인자 정의
ARG NODE_ENV=development
ARG SKIP_TYPE_CHECK=false

# 환경 변수 설정
ENV NODE_ENV=\${NODE_ENV}
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_RUNTIME_ENV=\${NODE_ENV}

# pnpm 설정
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# 의존성 파일 복사 및 설치
COPY pnpm-lock.yaml package.json turbo.json ./
COPY apps/$SERVICE_NAME/package.json ./apps/$SERVICE_NAME/
COPY packages/ ./packages/
RUN pnpm install --frozen-lockfile

# 소스 코드 복사
COPY . .

# Next.js 전역 설치 (경로 문제 해결)
RUN npm install -g next

# example 폴더 제거 (보안 및 용량 최적화)
RUN rm -rf /app/apps/$SERVICE_NAME/app/example && \\
    echo "Example 폴더가 제거되었습니다: apps/$SERVICE_NAME/app/example"

# NODE_PATH 환경변수 설정
ENV NODE_PATH=/app/node_modules:/app/apps/$SERVICE_NAME/node_modules

# 빌드 (타입 체크 스킵 옵션 적용)
RUN if [ "\$SKIP_TYPE_CHECK" = "true" ]; then \\
        echo '{ "compilerOptions": { "noEmit": false, "skipLibCheck": true } }' > apps/$SERVICE_NAME/tsconfig.build.json && \\
        cd apps/$SERVICE_NAME && \\
        NEXT_SKIP_LINT=true NEXT_SKIP_TYPE_CHECK=true NEXT_PUBLIC_NODE_ENV=\${NODE_ENV} NODE_ENV=production pnpm run build; \\
    else \\
        cd apps/$SERVICE_NAME && \\
        NEXT_PUBLIC_NODE_ENV=\${NODE_ENV} NODE_ENV=production pnpm run build; \\
    fi

# 디버깅: standalone 구조 확인
RUN ls -la apps/$SERVICE_NAME/.next/ || echo "No .next directory"
RUN ls -la apps/$SERVICE_NAME/.next/standalone/ || echo "No standalone directory"
RUN find apps/$SERVICE_NAME/.next -name "server.js" || echo "No server.js found"

# 실행 스테이지
FROM node:20-alpine AS runner
WORKDIR /app

# 환경 변수 설정
ARG NODE_ENV=development
ENV NODE_ENV=\${NODE_ENV}
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_NODE_ENV=\${NODE_ENV}
ENV PORT=$PORT

# Next.js의 output: standalone 모드는 모노레포 구조를 유지함
# 따라서 apps/$SERVICE_NAME 디렉토리에 server.js가 있을 수 있음
COPY --from=builder /app/apps/$SERVICE_NAME/public ./public
COPY --from=builder /app/apps/$SERVICE_NAME/.next/static ./.next/static

# standalone 디렉토리 전체를 복사하되, 디렉토리 구조를 유지
COPY --from=builder /app/apps/$SERVICE_NAME/.next/standalone/ ./

# 디버깅: 파일 구조 확인
RUN echo "==== 컨테이너 파일 구조 확인 ====" && \\
    ls -la && \\
    echo "==== apps 디렉토리 확인 ====" && \\
    ls -la apps || echo "No apps directory" && \\
    echo "==== apps/$SERVICE_NAME 디렉토리 확인 ====" && \\
    ls -la apps/$SERVICE_NAME || echo "No apps/$SERVICE_NAME directory" && \\
    echo "==== server.js 파일 검색 ====" && \\
    find . -name "server.js" || echo "No server.js found"

# server.js 위치에 따라 실행 명령 결정
RUN if [ -f "./server.js" ]; then \\
        echo "server.js found in root directory"; \\
        SERVER_PATH="server.js"; \\
    elif [ -f "./apps/$SERVICE_NAME/server.js" ]; then \\
        echo "server.js found in apps/$SERVICE_NAME directory"; \\
        SERVER_PATH="apps/$SERVICE_NAME/server.js"; \\
    else \\
        echo "server.js not found! Using default path and hoping for the best."; \\
        SERVER_PATH="server.js"; \\
    fi && \\
    echo "#!/bin/sh" > /entrypoint.sh && \\
    echo "node \\\$SERVER_PATH" >> /entrypoint.sh && \\
    chmod +x /entrypoint.sh

EXPOSE $PORT

# 동적으로 생성된 entrypoint 스크립트 실행
CMD ["/entrypoint.sh"]
EOF

# 패키지 파일 생성
echo "package.json 생성 중..."
cat << EOF > "apps/$SERVICE_NAME/package.json"
{
  "name": "$SERVICE_NAME",
  "version": "0.1.0",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack --port $PORT",
    "build": "next build",
    "start": "next start",
    "lint": "next lint --fix --no-cache",
    "check-types": "tsc --noEmit",
    "assets": "rm -rf public/ui && cp -r ../../packages/ui/src/assets public/ui"
  },
  "dependencies": {
    "@repo/ui": "workspace:*",
    "@tanstack/react-query": "^5.66.7",
    "@tanstack/react-query-devtools": "^5.66.7",
    "axios": "^1.7.9",
    "dayjs": "*",
    "next": "^15.1.6",
    "react": "^19.0.0",
    "react-cookie": "^7.2.2",
    "react-dom": "^19.0.0",
    "swiper": "*",
    "styled-components": "*",
    "uuid": "*",
    "zustand": "^5.0.3"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "@svgr/webpack": "^8.1.0",
    "@types/node": "^22",
    "@types/react": "19.0.8",
    "@types/react-dom": "19.0.3",
    "eslint": "^9.20.0",
    "typescript": "5.7.3"
  }
}
EOF

# 환경 설정 파일 생성
echo ".env.development 생성 중..."
cat << EOF > "apps/$SERVICE_NAME/.env.development"
NEXT_PUBLIC_NODE_ENV=development
NEXT_PUBLIC_API_BASE_URL=https://api-dev.hectoinnovation.co.kr
EOF

cat << EOF > "apps/$SERVICE_NAME/.env.production"
NEXT_PUBLIC_NODE_ENV=production
NEXT_PUBLIC_API_BASE_URL=https://api.hectoinnovation.co.kr
EOF

# Next.js 구성 파일 생성
echo "next.config.js 생성 중..."
cat << EOF > "apps/$SERVICE_NAME/next.config.js"
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui', '@repo/typescript-config', '@repo/eslint-config', '@svgr/webpack'],
  compiler: {
    styledComponents: true,
  },

  output: 'standalone',

  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: \`\${process.env.NEXT_PUBLIC_API_BASE_URL}/api/:path*\`,
      },
    ];
  },
};
export default nextConfig;
EOF

# tsconfig.json 생성
echo "tsconfig.json 생성 중..."
cat << EOF > "apps/$SERVICE_NAME/tsconfig.json"
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
EOF

# 기본 앱 페이지 생성
echo "기본 페이지 생성 중..."
cat << EOF > "apps/$SERVICE_NAME/app/page.tsx"
import React from 'react'

export default function HomePage() {
  return (
    <div>
      <h1>${SERVICE_NAME} 서비스 홈페이지</h1>
      <p>새로운 서비스가 성공적으로 생성되었습니다!</p>
    </div>
  )
}
EOF

cat << EOF > "apps/$SERVICE_NAME/app/layout.tsx"
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '$SERVICE_NAME',
  description: '$SERVICE_NAME Service',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
EOF

echo "$SERVICE_NAME 서비스 생성 완료!"
echo ""
echo "개발 서버 실행 명령어: pnpm dev --filter=$SERVICE_NAME"
echo ""
echo "AWS 리소스 정보:"
echo "- ECR 저장소: $ECR_NAME"
echo "- ECS 서비스: $ECS_SERVICE_NAME"
echo "- 포트: $PORT"
echo "- 도메인: $DOMAIN"
echo ""
echo "다음 단계:"
echo "1. cd apps/$SERVICE_NAME"
echo "2. pnpm dev 명령으로 로컬 개발 시작"
echo "3. Git에 변경사항 커밋"
echo "4. MR 생성 및 development 브랜치로 머지"
echo "5. 배포 후 도메인 확인"
echo "===================================================" 