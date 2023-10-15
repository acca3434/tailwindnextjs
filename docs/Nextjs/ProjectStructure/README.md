# Next.js 13 프로젝트 구조

이 문서는 Next.js 프로젝트의 파일 및 폴더 구조를 제공합니다. 최상위 파일 및 폴더, 구성 파일, 그리고 앱과 페이지 디렉토리 내에서의 라우팅 규칙에 대해 다루고 있습니다.

## 최상위 폴더

-   `app`: 앱 라우터
-   `pages`: 페이지 라우터
-   `public`: 제공되는 정적 자산 파일
-   `src`: 선택적인 애플리케이션 소스 폴더

## 최상위 파일

-   `Next.js`: Next.js 버전 정보
-   `next.config.js`: Next.js 설정 파일
-   `package.json`: 프로젝트 종속성 및 스크립트
-   `instrumentation.ts`: OpenTelemetry 및 Instrumentation 파일
-   `middleware.ts`: Next.js 요청 미들웨어
-   `.env`: 환경 변수
-   `.env.local`: 로컬 환경 변수
-   `.env.production`: 프로덕션 환경 변수
-   `.env.development`: 개발 환경 변수
-   `.eslintrc.json`: ESLint 설정 파일
-   `.gitignore`: Git에서 무시할 파일 및 폴더
-   `next-env.d.ts`: Next.js를 위한 TypeScript 선언 파일
-   `tsconfig.json`: TypeScript 설정 파일
-   `jsconfig.json`: JavaScript 설정 파일

## 앱 라우팅 규칙

### 라우팅 파일

-   `layout.js`, `layout.jsx`, `layout.tsx`: 레이아웃
-   `page.js`, `page.jsx`, `page.tsx`: 페이지
-   `loading.js`, `loading.jsx`, `loading.tsx`: 로딩 UI
-   `not-found.js`, `not-found.jsx`, `not-found.tsx`: 찾을 수 없는 UI
-   `error.js`, `error.jsx`, `error.tsx`: 오류 UI
-   `global-error.js`, `global-error.jsx`, `global-error.tsx`: 전역 오류 UI
-   `route.js`, `route.ts`: API 엔드포인트
-   `template.js`, `template.jsx`, `template.tsx`: 다시 렌더링되는 레이아웃
-   `default.js`, `default.jsx`, `default.tsx`: 병렬 라우트 대체 페이지

### 중첩된 라우트

폴더 및 하위 폴더로 중첩된 라우트 세그먼트

### 동적 라우트

-   `[folder]`: 동적 라우트 세그먼트
-   `[...folder]`: 모든 라우트 세그먼트를 포함하는 캐치-올 라우트 세그먼트
-   `[[...folder]]`: 선택적 캐치-올 라우트 세그먼트

### 라우트 그룹 및 개인 폴더

-   `(folder)`: 라우팅을 영향을 미치지 않고 라우트 그룹화
-   `_folder`: 라우팅에서 폴더 및 모든 하위 세그먼트를 제외

### 병렬 및 가로채는 라우트

-   `@folder`: 명명된 슬롯
-   `(.)folder`: 동일한 레벨에서 가로채기
-   `(..)folder`: 하나 위의 레벨에서 가로채기
-   `(..)(..)folder`: 두 단계 위에서 가로채기
-   `(...)folder`: 루트에서 가로채기

## 메타데이터 파일 규칙

### 앱 아이콘

-   `favicon.ico`: 파비콘 파일
-   `icon.ico`, `icon.jpg`, `icon.jpeg`, `icon.png`, `icon.svg`: 앱 아이콘 파일
-   `icon.js`, `icon.ts`, `icon.tsx`: 생성된 앱 아이콘
-   `apple-icon.jpg`, `apple-icon.jpeg`, `apple-icon.png`: 애플 앱 아이콘 파일
-   `apple-icon.js`, `apple-icon.ts`, `apple-icon.tsx`: 생성된 애플 앱 아이콘

### 오픈 그래프 및 트위터 이미지

-   `opengraph-image.jpg`, `opengraph-image.jpeg`, `opengraph-image.png`, `opengraph-image.gif`: 오픈 그래프 이미지 파일
-   `opengraph-image.js`, `opengraph-image.ts`, `opengraph-image.tsx`: 생성된 오픈 그래프 이미지
-   `twitter-image.jpg`, `twitter-image.jpeg`, `twitter-image.png`, `twitter-image.gif`: 트위터 이미지 파일
-   `twitter-image.js`, `twitter-image.ts`, `twitter-image.tsx`: 생성된 트위터 이미지

### SEO

-   `sitemap.xml`: 사이트맵 파일
-   `sitemap.js`, `sitemap.ts`: 생성된 사이트맵
-   `robots.txt`: 로봇 파일
-   `robots.js`, `robots.ts`: 생성된 로봇 파일

## 페이지 라우팅 규칙

### 특별한 파일

-   `_app.js`, `_app.jsx`, `_app.tsx`: 사용자 정의 앱
-   `_document.js`, `_document.jsx`, `_document.tsx`: 사용자 정의 문서
-   `_error.js`, `_error.jsx`, `_error.tsx`: 사용자 정의 오류 페이지
-   `404.js`, `404.jsx`, `404.tsx`: 404 오류 페이지
-   `500.js`, `500.jsx`, `500.tsx`: 500 오류 페이지

### 라우트

폴더 규칙:

-   `index.js`, `index.jsx`, `index.tsx`: 홈 페이지
-   `folder/index.js`, `folder/index.jsx`, `folder/index.tsx`: 중첩 페이지

파일 규칙:

-   `index.js`, `index.jsx`, `index.tsx`: 홈 페이지
-   `file.js`, `file.jsx`, `file.tsx`: 중첩 페이지

### 동적 라우트

폴더 규칙:

-   `[folder]/index.js`, `[folder]/index.jsx`, `[folder]/index.tsx`: 동적 라우트 세그먼트
-   `[...folder]/index.js`, `[...folder]/index.jsx`, `[...folder]/index.tsx`: 캐치-올 라우트 세그먼트
-   `[[...folder]]/index.js`, `[[...folder]]/index.jsx`, `[[...folder]]/index.tsx`: 선택적 캐치-올 라우트 세그먼트

파일 규칙:

-   `[file].js`, `[file].jsx`, `[file].tsx`: 동적 라우트 세그먼트
-   `[...file].js`, `[...file].jsx`, `[...file].tsx`: 캐치-올 라우트 세그먼트
-   `[[...file]].js`, `[[...file]].jsx`, `[[...file]].tsx`: 선택적 캐치-올 라우트 세그먼트
