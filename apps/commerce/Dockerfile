# 빌드 스테이지
FROM node:20.10.0-alpine AS builder
WORKDIR /app

# 빌드 인자 정의
ARG NODE_ENV=development
ARG SKIP_TYPE_CHECK=false
ARG USE_STANDALONE=true

# 환경 변수 설정
ENV NODE_ENV=${NODE_ENV}
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_RUNTIME_ENV=${NODE_ENV}
ENV PNPM_STORE_DIR=/app/.pnpm-store

# pnpm 설정
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# 의존성 파일 복사 및 설치
COPY pnpm-lock.yaml package.json turbo.json ./
COPY apps/commerce/package.json ./apps/commerce/
COPY packages/ ./packages/
RUN pnpm install --frozen-lockfile

# Next.js 전역 설치 (경로 문제 해결)
RUN npm install -g next

# 소스 코드 복사
COPY . .

# example 폴더 제거 (보안 및 용량 최적화)
RUN rm -rf /app/apps/commerce/app/example && \
    echo "Example 폴더가 제거되었습니다: apps/commerce/app/example"

# Next.js standalone 모드 설정
RUN if [ "${USE_STANDALONE}" = "true" ] && [ -f apps/commerce/next.config.js ]; then \
      echo "Modifying existing next.config.js to enable standalone output..."; \
      sed -i "/const nextConfig = {/a\\  output: 'standalone'," apps/commerce/next.config.js; \
      echo "Modified next.config.js:"; \
      cat apps/commerce/next.config.js; \
    else \
      echo "Skipping standalone mode configuration."; \
    fi

# NODE_PATH 환경변수 설정
ENV NODE_PATH=/app/node_modules:/app/apps/commerce/node_modules

# 빌드 실행 (assets 스크립트 먼저 실행)
RUN cd apps/commerce && \
    echo "Running assets script..." && \
    pnpm run assets && \
    echo "Building app with environment: NODE_ENV=${NODE_ENV}..." && \
    if [ "$SKIP_TYPE_CHECK" = "true" ]; then \
        echo '{ "compilerOptions": { "noEmit": false, "skipLibCheck": true } }' > tsconfig.build.json && \
        NEXT_SKIP_LINT=true NEXT_SKIP_TYPE_CHECK=true NEXT_PUBLIC_NODE_ENV=${NODE_ENV} NODE_ENV=production pnpm run build; \
    else \
        NEXT_PUBLIC_NODE_ENV=${NODE_ENV} NODE_ENV=production pnpm run build; \
    fi

# 디버깅: 빌드 결과 확인
RUN echo "===== 빌드 결과 확인 =====" && \
    ls -la apps/commerce/.next/ || echo "No .next directory" && \
    echo "===== standalone 디렉토리 확인 =====" && \
    ls -la apps/commerce/.next/standalone/ || echo "No standalone directory" && \
    echo "===== next.config.js 확인 =====" && \
    cat apps/commerce/next.config.js || echo "No next.config.js file"

# 실행 스테이지
FROM node:20.10.0-alpine AS runner
WORKDIR /app

# 환경 변수 설정
ARG NODE_ENV=development
ARG USE_STANDALONE=true
ENV NODE_ENV=${NODE_ENV}
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_NODE_ENV=${NODE_ENV}
ENV PORT=3000
ENV PNPM_STORE_DIR=/app/.pnpm-store

# 필요한 패키지 설치
RUN apk add --no-cache bash
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# 결과물 복사 - standalone 모드 또는 기존 모드 선택적 사용
RUN mkdir -p /app/apps/commerce

# 필요한 파일 복사
COPY --from=builder /app/apps/commerce/.next /app/apps/commerce/.next
COPY --from=builder /app/apps/commerce/public /app/apps/commerce/public

# 기타 필요한 파일들 복사
RUN mkdir -p /app/packages
COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/
COPY --from=builder /app/turbo.json /app/
COPY --from=builder /app/packages /app/packages

# standalone 모드 복사 시도
RUN if [ -d "/app/apps/commerce/.next/standalone" ]; then \
      echo "Standalone mode detected, copying files..."; \
      cp -r /app/apps/commerce/.next/standalone/* /app/; \
      mkdir -p /app/apps/commerce/.next/static; \
      if [ -d "/app/apps/commerce/.next/static" ]; then \
        cp -r /app/apps/commerce/.next/static /app/apps/commerce/.next/; \
        echo "Static files copied successfully"; \
      else \
        echo "Warning: Static directory not found"; \
      fi; \
    else \
      echo "Using regular mode (non-standalone)..."; \
      if [ "${USE_STANDALONE}" = "false" ]; then \
        echo "Installing dependencies for non-standalone mode..."; \
        pnpm install --frozen-lockfile; \
      fi; \
    fi

# 디버깅: 실행 환경 확인
RUN echo "===== 파일 구조 확인 =====" && \
    find /app -type f -name "server.js" | head -5 || echo "No server.js found" && \
    ls -la /app/apps/commerce/.next/ || echo "No .next directory" && \
    ls -la /app/apps/commerce/.next/static/ || echo "No static directory"

# 실행
EXPOSE 3000

# standalone 모드에 따라 직접 실행
CMD if [ -f "/app/apps/commerce/server.js" ]; then \
      echo "Starting in standalone mode..."; \
      cd /app && exec node apps/commerce/server.js; \
    else \
      echo "Starting in regular mode..."; \
      cd /app/apps/commerce && exec pnpm start; \
    fi