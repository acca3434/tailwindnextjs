# 라우팅 기초

모든 애플리케이션의 기본은 라우팅입니다. 이 페이지에서는 웹의 라우팅에 대한 기본 개념과 Next.js에서 라우팅을 다루는 방법을 소개합니다.

## 용어

먼저, 이 문서 전체에서 사용되는 다음 용어를 살펴보겠습니다:

<img src="https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fterminology-component-tree.png&w=1920&q=75&dpl=dpl_2Fk7c6hPMRGKhuGAJpzyR9iK5xMx">

**컴포넌트 트리 용어**

-   **트리 (Tree)**: 계층 구조를 시각화하는 관례입니다. 부모 및 자식 컴포넌트, 폴더 구조 등이 있습니다.
-   **서브트리 (Subtree)**: 트리의 일부로, 새 루트(첫 번째)에서 시작하여 잎(마지막)에서 끝나는 부분입니다.
-   **루트 (Root)**: 트리 또는 서브트리의 첫 번째 노드, 예를 들면 루트 레이아웃과 같습니다.
-   **잎 (Leaf)**: 자식이 없는 서브트리 내의 노드, 예를 들면 URL 경로의 마지막 세그먼트와 같습니다.

<img src="https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fterminology-url-anatomy.png&w=1920&q=75&dpl=dpl_2Fk7c6hPMRGKhuGAJpzyR9iK5xMx">

**URL 해부학 용어**

-   **URL 세그먼트 (URL Segment)**: 슬래시로 구분된 URL 경로의 일부입니다.
-   **URL 경로 (URL Path)**: 도메인 이후에 오는 URL의 일부로, 세그먼트로 이루어집니다.

## 앱 라우터

버전 13에서 Next.js는 새로운 React Server Components 기반의 App Router를 소개했습니다. 이 라우터는 공유 레이아웃, 중첩 라우팅, 로딩 상태, 오류 처리 등을 지원합니다.

App Router는 `app`이라는 새 디렉토리에서 작동합니다. `app` 디렉토리는 이전 동작을 유지하는 동안 애플리케이션의 일부 라우트를 새 동작으로 채택할 수 있게 하기 위해 `pages` 디렉토리와 함께 작동합니다. 애플리케이션이 `pages` 디렉토리를 사용하는 경우, Pages Router 문서를 참조하세요.

알아두면 좋은 점: App Router가 Pages Router보다 우선합니다. 디렉토리 간의 라우트는 동일한 URL 경로를 해결해서 충돌을 방지하기 위해 빌드 시 오류를 발생시킵니다.

<img src="https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fnext-router-directories.png&w=1920&q=75&dpl=dpl_2Fk7c6hPMRGKhuGAJpzyR9iK5xMx">

## Next.js 앱 디렉토리

기본적으로 `app` 내의 컴포넌트는 React Server Components입니다. 이것은 성능 최적화를 위한 것으로, 쉽게 채택할 수 있게 합니다. 또한 Client Components를 사용할 수도 있습니다.

추천사항: Server Components에 대해 처음이라면 Server 페이지를 확인하세요.

## 폴더와 파일의 역할

Next.js는 파일 시스템 기반의 라우터를 사용합니다.

-   폴더는 라우트를 정의하는 데 사용됩니다. 라우트는 루트 폴더에서 마지막 리프 폴더까지의 파일 시스템 계층 구조를 따라가는 중첩된 폴더 경로입니다. 라우트 정의를 확인하려면 "라우트 정의"를 참조하세요.
-   파일은 라우트 세그먼트에 대한 UI를 만들기 위해 사용됩니다. 특수 파일을 확인하세요.

## 라우트 세그먼트

라우트의 각 폴더는 라우트 세그먼트를 나타냅니다. 각 라우트 세그먼트는 URL 경로의 해당 세그먼트와 매핑됩니다.

<img src="https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Froute-segments-to-path-segments.png&w=1920&q=75&dpl=dpl_2Fk7c6hPMRGKhuGAJpzyR9iK5xMx">

**라우트 세그먼트가 URL 세그먼트에 매핑되는 방법**

## 중첩된 라우트

중첩된 라우트를 만들려면 폴더를 중첩시킵니다. 예를 들어, `app` 디렉토리에 두 개의 새 폴더를 중첩하여 새 `/dashboard/settings` 라우트를 추가할 수 있습니다.

`/dashboard/settings` 라우트는 세 개의 세그먼트로 구성됩니다:

1. / (루트 세그먼트)
2. dashboard (세그먼트)
3. settings (리프 세그먼트)

## 파일 규칙

Next.js는 중첩된 라우트에서 특정 동작을 하는 UI를 만들기 위해 특수 파일 세트를 제공합니다:

-   `layout`: 세그먼트와 그 자식들을 위한 공유 UI
-   `page`: 라우트의 고유한 UI 및 라우트의 공개 접근 가능성을 활성화하는 파일
-   `loading`: 세그먼트와 그 자식들을 위한 로딩 UI
-   `not-found`: 세그먼트와 그 자식들을 위한 찾을 수 없음 UI
-   `error`: 세그먼트와 그 자식들을 위한 오류 UI
-   `global-error`: 전역 오류 UI
-   `route`: 서버 측 API 엔드포인트
-   `template`: 특수화된 다시 렌더링되는 레이아웃 UI
-   `default`: 병렬 라우트를 위한 대체 UI

알아두면 좋은 점: 특별한 파일에는 `.js`, `.jsx`, 또는 `.tsx` 파일 확장자를 사용할 수 있습니다.

## 컴포넌트 계층 구조

라우트 세그먼트의 특별한 파일에 정의된 React 컴포넌트는 다음과 같은 계층 구조로 렌더링됩니다:

-   `layout.js`
-   `template.js`
-   `error.js` (React 에러 경계)
-   `loading.js` (React 대기 경계)
-   `not-found.js` (React 에러 경계)
-   `page.js` 또는 중첩 `layout.js`

<img src="https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Ffile-conventions-component-hierarchy.png&w=1920&q=75&dpl=dpl_2Fk7c6hPMRGKhuGAJpzyR9iK5xMx">

**파일 규칙을 따른 컴포넌트 계층 구조**

중첩된 라우트에서, 세그먼트의 컴포넌트는 해당 부모 세그먼트의 컴포넌트 내부에 중첩됩니다.

<img src="https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fnested-file-conventions-component-hierarchy.png&w=1920&q=75&dpl=dpl_2Fk7c6hPMRGKhuGAJpzyR9iK5xMx">

**중첩된 파일 규칙 컴포넌트 계층 구조**

## 공존 (Colocation)

특수 파일 외에도 `app` 디렉토리 내의 폴더에 파일 (예: 컴포넌트, 스타일, 테스트 등)을 공존시킬 수 있는 옵션이 있습니다.

이것은 폴더가 라우트를 정의하면서, 공개적으로 접근 가능한 것은 `page.js` 또는 `route.js`에서 반환하는 내용뿐임을 고려하여 가능합니다.

<img src="https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fproject-organization-colocation.png&w=1920&q=75&dpl=dpl_2Fk7c6hPMRGKhuGAJpzyR9iK5xMx">

공존 파일을 포함한 예제 폴더 구조

프로젝트 구성 및 공존에 대해 더 알아보려면 프로젝트 구성 및 공존에 대한 자세한 내용을 참조하세요.

## 고급 라우팅 패턴

App Router는 더 고급 라우팅 패턴을 구현하는 데 도움이 되는 규칙 세트를 제공합니다. 이러한 패턴에는 다음이 포함됩니다:

-   병렬 라우트 (Parallel Routes): 두 개 이상의 페이지를 동시에 표시하고 별도로 탐색할 수 있는 패턴입니다. 이러한 패턴은 자체 하위 네비게이션을 갖는 분할 보기에 사용할 수 있습니다. 예: 대시보드
-   가로채는 라우트 (Intercepting Routes): 라우트를 가로채고 다른 라우트의 컨텍스트에서 표시할 수 있는 패턴입니다. 현재 페이지의 컨텍스트를 유지하는 것이 중요한 경우에 사용할 수 있습니다. 예: 한 작업을 편집하는 동안 모든 작업 보기 또는 피드에서 사진 확대하기

이러한 패턴을 사용하면 더 풍부하고 복잡한 UI를 구축할 수 있으며, 작은 팀과 개발자에게는 역사적으로 복잡한 기능을 제작하기 어려웠던 기능을 이용할 수 있게 됩니다.
