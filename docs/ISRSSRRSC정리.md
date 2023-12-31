SSG,SSR,ISR 진짜 최종 정리

정리하신 내용은 SSG, SSR, ISR, 그리고 React Server Component (RSC)에 대한 중요한 특징과 제약 조건을 잘 정리한 것입니다. 이제 각 항목에 대한 요약을 제공해드리겠습니다.

**SSG (Static Site Generation):**

-   페이지의 HTML을 빌드 시에 사전에 생성하며, 갱신 가능.
-   초기 로딩 속도가 빠르며, SEO에 유리.
-   변경 빈도가 낮은 콘텐츠에 적합.
-   정적 데이터를 미리 가져와 서버 부하를 줄일 수 있음.

**SSR (Server Side Rendering):**

-   각 요청마다 페이지를 동적으로 렌더링.
-   항상 최신 데이터를 보여주며, 동적 콘텐츠에 적합.
-   초기 로딩 속도는 느릴 수 있지만, 데이터 실시간 업데이트와 개인화에 용이.

**ISR (Incremental Static Regeneration):**

-   SSG의 확장된 형태로, 일부 페이지를 정적으로 생성하고 나머지 페이지를 런타임 시에 업데이트 가능.
-   변경 빈도가 높은 동적 콘텐츠에 적합.
-   데이터 주기적 업데이트, 초기 로딩 속도 개선 가능.

**React Server Component (RSC):**

-   서버에서 렌더링되며, async 함수와 await를 사용하여 비동기 데이터를 가져올 수 있음.
-   클라이언트 측에서 일부 훅 및 이벤트 핸들러 사용 제한.
-   클라이언트에서는 Suspense를 사용하여 RSC 대신 다른 컴포넌트 표시 가능.
-   서버에서 사용되는 패키지는 클라이언트 번들로 전달되지 않음.
