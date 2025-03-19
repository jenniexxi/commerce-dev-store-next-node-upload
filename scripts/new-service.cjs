#!/usr/bin/env node

/**
 * 새 서비스 생성 스크립트
 *
 * 사용법: node scripts/new-service.js <서비스_이름> [<포트>] [<도메인>]
 * 예시: node scripts/new-service.js life 3002 life-dev.hectoinnovation.co.kr
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 인자 파싱
const args = process.argv.slice(2);

// 도움말 출력
if (args.length === 0 || args[0] === '-h' || args[0] === '--help') {
  console.log(`
새 서비스 생성 스크립트

사용법: pnpm create-new-service <서비스_이름> [<포트>] [<도메인>]
예시: pnpm create-new-service life 3002 life-dev.hectoinnovation.co.kr

매개변수:
  <서비스_이름>  생성할 서비스의 이름 (필수)
  <포트>        서비스가 사용할 포트 번호 (선택, 기본값: 3000-3099 사이 랜덤)
  <도메인>      서비스의 도메인 (선택, 기본값: <서비스_이름>-dev.hectoinnovation.co.kr)
  `);
  process.exit(0);
}

if (args.length < 1) {
  console.error('사용법: pnpm create-new-service <서비스_이름> [<포트>] [<도메인>]');
  console.error('예시: pnpm create-new-service life 3002 life-dev.hectoinnovation.co.kr');
  process.exit(1);
}

const SERVICE_NAME = args[0];
const PORT = args[1] || 3000 + Math.floor(Math.random() * 100); // 기본 포트 없으면 랜덤 생성 (3000-3099)
const DOMAIN = args[2] || `${SERVICE_NAME}-dev.hectoinnovation.co.kr`;

// AWS 리소스 이름
const ECR_NAME = `rr-${SERVICE_NAME}-dev-ecr`;
const ECS_SERVICE_NAME = `rr-${SERVICE_NAME}-dev-task-svc`;
const ECS_CLUSTER_NAME = 'rr-dev-cluster';
const TASK_FAMILY = `rr-${SERVICE_NAME}-dev-task-define`;
const CONTAINER_NAME = `rr-${SERVICE_NAME}-dev-cont`;
const LOG_GROUP = `/ecs/${SERVICE_NAME}-dev-task-define`;

// 프로젝트 루트 경로
const PROJECT_ROOT = path.resolve(process.cwd());

// 서비스 경로
const SERVICE_PATH = path.join(PROJECT_ROOT, 'apps', SERVICE_NAME);
const JENKINS_PATH = path.join(PROJECT_ROOT, 'jenkins', 'ecs-task-def');

// 필요한 디렉토리 존재 확인
if (fs.existsSync(SERVICE_PATH)) {
  console.error(`오류: ${SERVICE_NAME} 디렉토리가 이미 존재합니다.`);
  process.exit(1);
}

console.log(`🚀 ${SERVICE_NAME} 서비스 생성 시작...`);

// 디렉토리 생성
console.log('📁 디렉토리 구조 생성 중...');
fs.mkdirSync(path.join(SERVICE_PATH), { recursive: true });
fs.mkdirSync(path.join(SERVICE_PATH, 'public'), { recursive: true });
fs.mkdirSync(path.join(SERVICE_PATH, 'app'), { recursive: true });
fs.mkdirSync(path.join(SERVICE_PATH, 'components'), { recursive: true });
fs.mkdirSync(path.join(JENKINS_PATH), { recursive: true });

// 서비스 메타데이터 파일 생성
console.log('📝 서비스 메타데이터 파일 생성 중...');
const serviceConfig = {
  name: SERVICE_NAME,
  port: PORT,
  domain: DOMAIN,
  ecrName: ECR_NAME,
  ecsServiceName: ECS_SERVICE_NAME,
  ecsClusterName: ECS_CLUSTER_NAME,
  taskFamily: TASK_FAMILY,
  containerName: CONTAINER_NAME,
  cpu: 1024,
  memory: 2048,
  memoryReservation: 1024,
  logGroup: LOG_GROUP,
};

fs.writeFileSync(path.join(SERVICE_PATH, 'service.config.json'), JSON.stringify(serviceConfig, null, 2));

// Dockerfile 생성
console.log('🐳 Dockerfile 생성 중...');
const dockerfileTemplate = fs.readFileSync(
  path.join(PROJECT_ROOT, 'scripts', 'service-template', 'Dockerfile.template'),
  'utf8',
);

// 템플릿 변수 치환
const dockerfileContent = dockerfileTemplate.replace(/\${SERVICE_NAME}/g, SERVICE_NAME).replace(/\${PORT}/g, PORT);

fs.writeFileSync(path.join(SERVICE_PATH, 'Dockerfile'), dockerfileContent);

// package.json 생성
console.log('📦 package.json 생성 중...');
const packageJson = {
  name: SERVICE_NAME,
  version: '0.1.0',
  type: 'module',
  private: true,
  scripts: {
    'dev': `next dev --turbopack --port ${PORT}`,
    'build': 'next build',
    'start': 'next start',
    'lint': 'next lint --fix --no-cache',
    'check-types': 'tsc --noEmit',
    'assets': 'rm -rf public/ui && cp -r ../../packages/ui/src/assets public/ui',
  },
  dependencies: {
    '@repo/ui': 'workspace:*',
    '@tanstack/react-query': '^5.66.7',
    '@tanstack/react-query-devtools': '^5.66.7',
    'axios': '^1.7.9',
    'dayjs': '*',
    'next': '^15.1.6',
    'react': '^19.0.0',
    'react-cookie': '^7.2.2',
    'react-dom': '^19.0.0',
    'swiper': '*',
    'styled-components': '*',
    'uuid': '*',
    'zustand': '^5.0.3',
  },
  devDependencies: {
    '@repo/eslint-config': 'workspace:*',
    '@repo/typescript-config': 'workspace:*',
    '@svgr/webpack': '^8.1.0',
    '@types/node': '^22',
    '@types/react': '19.0.8',
    '@types/react-dom': '19.0.3',
    'eslint': '^9.20.0',
    'typescript': '5.7.3',
  },
};

fs.writeFileSync(path.join(SERVICE_PATH, 'package.json'), JSON.stringify(packageJson, null, 2));

// 환경 설정 파일 생성
console.log('🌍 환경 설정 파일 생성 중...');
fs.writeFileSync(
  path.join(SERVICE_PATH, '.env.development'),
  `NEXT_PUBLIC_NODE_ENV=development
NEXT_PUBLIC_API_BASE_URL=https://api-dev.hectoinnovation.co.kr`,
);

fs.writeFileSync(
  path.join(SERVICE_PATH, '.env.production'),
  `NEXT_PUBLIC_NODE_ENV=production
NEXT_PUBLIC_API_BASE_URL=https://api.hectoinnovation.co.kr`,
);

// Next.js 구성 파일 생성
console.log('⚙️ Next.js 구성 파일 생성 중...');
fs.writeFileSync(
  path.join(SERVICE_PATH, 'next.config.js'),
  `/** @type {import('next').NextConfig} */

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
`,
);

// 기본 페이지 생성
console.log('📄 기본 페이지 생성 중...');
fs.writeFileSync(
  path.join(SERVICE_PATH, 'app', 'page.tsx'),
  `export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">${SERVICE_NAME.charAt(0).toUpperCase() + SERVICE_NAME.slice(1)} 서비스</h1>
      <p>새 서비스가 성공적으로 생성되었습니다!</p>
    </main>
  );
}
`,
);

// tsconfig.json 생성
console.log('🔧 TypeScript 설정 파일 생성 중...');
fs.writeFileSync(
  path.join(SERVICE_PATH, 'tsconfig.json'),
  `{
  "extends": "@repo/typescript-config/nextjs.json",
  "compilerOptions": {
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
`,
);

// 기본 .gitignore 생성
fs.writeFileSync(
  path.join(SERVICE_PATH, '.gitignore'),
  `.env*.local
.next/
node_modules/
.turbo
`,
);

// 서비스가 성공적으로 생성되었음을 알림
console.log('\n✅ 서비스 생성 완료!');
console.log(`
🎉 ${SERVICE_NAME} 서비스가 성공적으로 생성되었습니다!

📂 경로: ${SERVICE_PATH}
🌐 개발 포트: ${PORT}
🔗 도메인: ${DOMAIN}

다음 단계:
1. 소스 코드 개발
2. 깃 커밋 및 푸시 후 PR 생성
3. PR이 머지되면 Jenkins 파이프라인이 자동으로 빌드 및 배포
`);
