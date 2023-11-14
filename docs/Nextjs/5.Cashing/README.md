# Next.js 13 버전의 Caching

Next.js는 렌더링 작업 및 데이터 요청을 캐싱하여 응용 프로그램의 성능을 향상시키고 비용을 절감합니다. 이 문서는 Next.js 캐싱 메커니즘, 구성하기 위한 API 및 상호 작용 방법에 대해 자세히 알아봅니다.

중요 사항: 이 문서는 Next.js가 내부적으로 어떻게 작동하는지 이해하는 데 도움이 되지만 Next.js를 효과적으로 사용하기 위한 필수 지식은 아닙니다. 대부분의 Next.js 캐싱 휴리스틱은 API 사용에 따라 결정되며 최상의 성능을 위한 기본 구성이 이미 제공됩니다.

## 개요

다음은 다양한 캐싱 메커니즘 및 목적에 대한 고수준 개요입니다:

-   Mechanism (메커니즘): 어떤 것을 캐시할지
-   What (무엇): 어떤 것을 캐시할지
-   Where (어디서): 어디에 저장할지
-   Purpose (목적): 왜 캐싱하는지
-   Duration (지속 기간): 캐시가 유지되는 기간

| Mechanism (메커니즘) | What (무엇)                                 | Where (어디서)      | Purpose (목적)                                                                        | Duration (지속 기간)                                       |
| -------------------- | ------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Request Memoization  | 함수 반환 값 (Return values of functions)   | 서버 (Server)       | React 컴포넌트 트리에서 데이터 재사용 (Re-use data in a React Component tree)         | 요청마다 (Per-request lifecycle)                           |
| Data Cache           | 데이터 (Data)                               | 서버 (Server)       | 사용자 요청과 배포 간의 데이터 저장 (Store data across user requests and deployments) | 지속적 (revalidated 가능) (Persistent, can be revalidated) |
| Full Route Cache     | HTML 및 RSC 페이로드 (HTML and RSC payload) | 서버 (Server)       | 렌더링 비용 절감 및 성능 향상 (Reduce rendering cost and improve performance)         | 지속적 (revalidated 가능) (Persistent, can be revalidated) |
| Router Cache         | RSC 페이로드 (RSC Payload)                  | 클라이언트 (Client) | 내비게이션 시 서버 요청 감소 (Reduce server requests on navigation)                   | 사용자 세션 또는 시간 기반 (User session or time-based)    |

기본적으로 Next.js는 성능을 향상시키고 비용을 줄이기 위해 가능한 한 많이 캐시합니다. 이는 경로가 정적으로 렌더링되고 데이터 요청이 캐시되는 것을 의미합니다. 아래 다이어그램은 기본 캐싱 동작을 보여줍니다: 경로가 빌드 시 정적으로 렌더링되고 정적 경로가 처음 방문될 때의 동작입니다.

<img src="https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fcaching-overview.png&w=3840&q=75&dpl=dpl_7ApAXAPS9Jx2rHVsnwoDNiDWWrWe">

캐싱 동작은 경로가 정적으로 또는 동적으로 렌더링되는 경우, 데이터가 캐시되는지 여부, 요청이 초기 방문 또는 후속 탐색의 일부인 경우에 따라 달라집니다. 사용 사례에 따라 개별 경로와 데이터 요청에 대한 캐싱 동작을 구성할 수 있습니다.

## Request Memoization (요청 메모이제이션)

React는 URL과 옵션이 동일한 요청을 자동으로 메모이제이션하는 기능을 확장합니다. 이는 React 컴포넌트 트리 내에서 여러 곳에서 동일한 데이터를 필요로 하는 경우, 데이터를 네트워크에서 여러 번 요청하는 성능 영향을 걱정하지 않고 필요한 컴포넌트에서 데이터를 가져올 수 있다는 의미입니다.

<img src="https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fdeduplicated-fetch-requests.png&w=3840&q=75&dpl=dpl_7ApAXAPS9Jx2rHVsnwoDNiDWWrWe">

예를 들어, 같은 데이터를 경로에서 (예: 레이아웃, 페이지 및 여러 컴포넌트에서) 사용해야 하는 경우 데이터를 렌더링 트리 상단에서 가져와 컴포넌트 간에 프롭을 전달할 필요가 없습니다. 대신에 컴포넌트에서 필요한 데이터를 가져올 수 있으며 동일한 데이터에 대해 네트워크를 통한 여러 요청의 성능 영향을 걱정하지 않아도 됩니다.

```jsx
// TypeScript
async function getItem() {
    // `fetch` 함수는 자동으로 메모이제이션되고 결과가 캐시됩니다.
    const res = await fetch('https://.../item/1')
    return res.json()
}

// 이 함수는 두 번 호출되지만 처음 호출 시에만 실행됩니다.
const item = await getItem() // 캐시 MISS

// 두 번째 호출은 경로상 어디서든 일어날 수 있습니다.
const item = await getItem() // 캐시 HIT
```

### Request Memoization 작동 방식

다음 다이어그램은 React 렌더링 중 fetch 메모이제이션이 작동하는 방식을 보여줍니다:

<img src="https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Frequest-memoization.png&w=3840&q=75&dpl=dpl_7ApAXAPS9Jx2rHVsnwoDNiDWWrWe">

-   경로를 렌더링하는 동안 특정 요청이 처음 호출될 때, 해당 결과는 메모리에 없으므로 캐시 `MISS`입니다.
-   따라서 함수는 실행되고 데이터가 외부 소스에서 가져오고 결과가 메모리에 저장됩니다.
-   동일한 요청의 하위 함수 호출은 캐시 `HIT`이 되며 함수를 실행하지 않고 메모리에서 데이터를 반환합니다.
-   경로가 렌더링되고 렌더링 패스가 완료되면 메모리가 "재설정"되고 모든 요청 메모이제이션 항목이 지워집니다.

중요 사항:

-   요청 메모이제이션은 Next.js 기능이 아니라 React 기능입니다. 여기에 포함된 이유는 다른 캐싱 메커니즘과 어떻게 상호 작용하는지 보여주기 위함입니다.
-   메모이제이션은 fetch 요청의 GET 메서드에만 적용됩니다.
-   메모이제이션은 React 컴포넌트 트리에만 적용됩니다. 즉, generateMetadata, generateStaticParams, 레이아웃, 페이지 및 기타 서버 컴포넌트에서 fetch 요청에 적용됩니다. React 컴포넌트 트리 외부의 Route Handlers에서는 적용되지 않습니다.
-   fetch가 적합하지 않은 경우 (예: 일부 데이터베이스 클라이언트, CMS 클라이언트 또는 GraphQL 클라이언트 등) 함수를 메모이제이션하려면 React 캐시 함수를 사용할 수 있습니다.

### Duration (지속 기간)

캐시는 React 컴포넌트 트리가 렌더링이 완료될 때까지 서버 요청의 수명 동안 유지됩니다.

### Revalidating (재검증)

메모이제이션은 서버 요청 간에 공유되지 않으며 렌더링 중에만 적용되므로 재검증할 필요가 없습니다.

### Opting out (캐시에서 제외)

fetch 요청의 메모이제이션에서 제외하려면 요청에 AbortController 신호를 전달할 수 있습니다.

```js
// 개별 `fetch` 요청에서 메모이제이션 제외
const { signal } = new AbortController()
fetch(url, { signal })
```

## Data Cache (데이터 캐시)

Next.js는 내장된 Data Cache를 갖고 있으며 이를 통해 데이터 가져오기 결과를 사용자 요청 및 배포 사이에 유지합니다. 이것은 Next.js가 서버에서 각 요청이 고유한 지속적인 캐싱 의미론을 설정할 수 있도록 네이티브 fetch API를 확장함으로써 가능합니다.

중요 사항: 브라우저에서 fetch의 캐시 옵션은 요청이 브라우저의 HTTP 캐시와 상호 작용하는 방식을 나타내는 반면, Next.js에서 캐시 옵션은 서버 측 요청이 서버의 Data Cache와 상호 작용하는 방식을 나타냅니다.

기본적으로 fetch를 사용하는 데이터 요청은 캐시됩니다. 캐싱 동작을 구성하려면 fetch의 cache 및 next.revalidate 옵션을 사용할 수 있습니다.

### Data Cache 작동 방식

다음 다이어그램은 캐시된 및 캐시되지 않은 fetch 요청이 Data Cache와 상호 작용하는 방식을 보여줍니다:

<img src="https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fdata-cache.png&w=3840&q=75&dpl=dpl_7ApAXAPS9Jx2rHVsnwoDNiDWWrWe">

-   렌더링 중 처음으로 fetch 요청을 호출할 때, Next.js는 Data Cache에서 캐시된 응답을 확인합니다.
-   캐시된 응답이 발견되면 즉시 반환되고 메모이제이션됩니다.
-   캐시된 응답이 없는 경우, 데이터 소스에 요청을 보내고 결과를 Data Cache에 저장하며 메모이제이션됩니다.
-   캐시되지 않는 데이터 (예: `{ cache: 'no-store' }`)의 경우 항상 데이터 소스에서 가져오며 메모이제이션됩니다.
-   데이터가 캐시되었든 캐시되지 않았든, 동일한 데이터에 대해 React 렌더 패스 중에 중복 요청을 방지하기 위해 요청은 항상 메모이제이션됩니다.

### Data Cache와 Request Memoization의 차이

두 캐싱 메커니즘 모두 캐시된 데이터를 재사용하여 성능을 향상시키지만, Data Cache는 사용자 요청 및 배포 사이에서 지속됩니다. 반면 메모이제이션은 요청의 수명 동안만 유지됩니다.

메모이제이션을 통해 네트워크 경계를 거쳐 렌더링 서버에서 Data Cache 서버 (예: CDN 또는 Edge 네트워크) 또는 데이터 소스 (예: 데이터베이스 또는 CMS)로 이동해야 하는 동일한 데이터에 대한 중복 요청 수를 줄입니다. Data Cache를 통해 원본 데이터 소스에 대한 요청 횟수를 줄입니다.

### Duration (지속 기간)

Data Cache는 사용자 요청 및 배포 사이에서 지속됩니다. 다시 유효화(revalidate)하거나 캐시에서 제외하지 않는 한 계속 유지됩니다.

### Revalidating (재검증)

데이터 캐시의 재검증은 두 가지 방법으로 수행됩니다:

1. 시간 기반 재검증 (Time-based Revalidation): 일정 시간이 경과하고 새로운 요청이 발생할 때 데이터를 재검증합니다. 이 방법은 데이터가 드물게 변경되고 신선성이 크게 중요하지 않을 때 유용합니다.

예를 들어, 데이터를 최대 1시간마다 재검증하려면 fetch의 `next` 옵션을 사용하여 리소스의 캐시 지속 시간을 설정할 수 있습니다.

```javascript
// 1시간마다 재검증
fetch('https://...', { next: { revalidate: 3600 } })
```

또는 fetch를 사용할 수 없는 경우나 일부 다른 옵션을 사용해야 할 경우 Route Segment Config 옵션을 사용하여 해당 세그먼트의 모든 fetch 요청을 구성할 수 있습니다.

2. 요청에 의한 재검증 (On-demand Revalidation): 이벤트(예: 양식 제출)에 기반하여 데이터를 재검증합니다. 요청에 의한 재검증은 태그(예: 태그 기반) 또는 경로(예: 경로 기반)를 기준으로 데이터 그룹을 한꺼번에 재검증하는 데 사용됩니다. 이 방법은 가능한 빨리 최신 데이터를 표시하려는 경우에 유용합니다.

예를 들어, 헤드리스 CMS에서 콘텐츠가 업데이트된 경우, 해당 변경 사항을 가능한 빨리 반영하려면 요청에 의한 재검증을 사용할 수 있습니다.

### 시간 기반 재검증 작동 방식

시간 기반 재검증을 수행하려면 fetch의 `next.revalidate` 옵션을 사용하여 리소스의 캐시 지속 시간을 설정합니다. 이 옵션을 사용하면 다음과 같이 작동합니다:

<img src="https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Ftime-based-revalidation.png&w=3840&q=75&dpl=dpl_7ApAXAPS9Jx2rHVsnwoDNiDWWrWe">

-   최초로 fetch 요청이 호출될 때, 데이터는 외부 데이터 소스에서 가져와 Data Cache에 저장됩니다.
-   지정된 시간 간격(예: 60초) 내에 호출된 요청은 캐시된 데이터를 반환합니다.
-   시간 간격이 지난 후, 다음 요청은 여전히 캐시된 (이제는 오래된) 데이터를 반환합니다.
-   Next.js는 백그라운드에서 데이터를 재검증합니다.
-   데이터가 성공적으로 가져와진 후, Next.js는 최신 데이터로 Data Cache를 업데이트합니다.
-   백그라운드 재검증에 실패하면 이전 데이터가 변경되지 않은 채로 유지됩니다.

이러한 동작은 "stale-while-revalidate" 동작과 유사합니다.

### 요청에 의한 재검증 작동 방식

요청에 의한 재검증은 경로(경로 기반) 또는 캐시 태그(태그 기반)를 기준으로 데이터를 그룹화하여 재검증하는 방식입니다. 이 방법을 사용하면 다음과 같이 작동합니다:

<img src="https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fon-demand-revalidation.png&w=3840&q=75&dpl=dpl_7ApAXAPS9Jx2rHVsnwoDNiDWWrWe">

-   최초로 fetch 요청이 호출될 때, 데이터는 외부 데이터 소스에서 가져와 Data Cache에 저장됩니다.
-   요청에 의한 재검증이 트리거될 때, 해당 캐시 항목은 Data Cache에서 제거됩니다.
-   이것은 시간 기반 재검증과 달리 캐시된 데이터를 유지하는 것이 아니라 데이터를 다시 가져온다는 점에서 다릅니다.
-   다음 요청은 다시 캐시 MISS가 되며 데이터가 다시 외부 데이터 소스에서 가져와지고 Data Cache에 저장됩니다.

### 제외 (Opting out)

개별 데이터 가져오기에 대해 캐싱을 제외하려면 fetch 요청에서 `cache` 옵션을 `no-store`로 설정할 수 있습니다. 이렇게 하면 fetch를 호출할 때마다 데이터가 가져와집니다.

```javascript
// 개별 `fetch` 요청에 대한 캐싱 제외
fetch(`https://...`, { cache: 'no-store' })
```

또는 특정 경로 세그먼트에 대한 캐싱을 제외하려면 Route Segment Config 옵션을 사용할 수 있습니다. 이렇게 하면 해당 경로 세그먼트의 모든 데이터 요청에 대한 캐싱이 영향을 받습니다.

```javascript
// 경로 세그먼트 내 모든 데이터 요청에 대한 캐싱 제외
export const dynamic = 'force-dynamic'
```

### Vercel Data Cache

만약 Next.js 애플리케이션이 Vercel에 배포되었다면, Vercel 특정 기능을 더 잘 이해하려면 [Vercel Data Cache](https://vercel.com/docs/infrastructure/data-cache) 문서를 읽는 것을 권장합니다.

# Full Route Cache

관련 용어:

-   자동 정적 최적화, 정적 사이트 생성 또는 정적 렌더링이라는 용어를 동의어로 사용하여 응용 프로그램의 라우트를 렌더링하고 캐싱하는 프로세스를 지칭할 수 있습니다.

Next.js는 빌드 시간에 라우트를 자동으로 렌더링하고 캐시합니다. 이것은 모든 요청마다 서버에서 렌더링하는 대신 캐시된 라우트를 제공하여 페이지 로드를 더 빠르게 할 수 있는 최적화입니다.

Full Route Cache의 작동 방식을 이해하려면 React 렌더링과 Next.js에서 결과를 캐시하는 방법을 살펴보는 것이 도움이 됩니다.

1. 서버에서의 React 렌더링

    서버에서 Next.js는 렌더링을 조정하기 위해 React의 API를 사용합니다. 렌더링 작업은 개별 라우트 세그먼트 및 Suspense 경계로 분할됩니다.

    각 세그먼트는 두 단계로 렌더링됩니다:

    - React는 React Server Component Payload라고 불리는 스트리밍 최적화를 위한 특수 데이터 형식으로 Server Components를 렌더링합니다.
    - Next.js는 React Server Component Payload 및 Client Component JavaScript 지시사항을 사용하여 서버에서 HTML을 렌더링합니다.

    이것은 모든 것을 렌더링한 후에 작업을 캐싱하거나 응답을 보내기를 기다릴 필요가 없음을 의미합니다. 작업이 완료될 때까지 응답을 스트림으로 제공할 수 있습니다.

    **React Server Component Payload**란?

    React Server Component Payload는 렌더링된 React Server Components 트리의 이진 형식입니다. 클라이언트에서 브라우저 DOM을 업데이트하는 데 사용됩니다. React Server Component Payload에는 다음이 포함됩니다:

    - Server Components의 렌더링 결과
    - Client Components의 렌더링 위치를 나타내는 플레이스홀더 및 그들의 JavaScript 파일에 대한 참조
    - Server Component에서 Client Component로 전달된 모든 props

    자세한 정보는 [Server Components 문서](https://nextjs.org/docs/app/building-your-application/rendering/server-components)를 참조하세요.

2. 서버에서의 Next.js 캐싱 (Full Route Cache)

    <img src="https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Ffull-route-cache.png&w=3840&q=75&dpl=dpl_4v6FtskCiayFEUWGEUEsMbUkVeFC">

    Full Route Cache의 기본 동작 방식은 라우트의 렌더링 결과인 React Server Component Payload와 HTML을 서버에 캐시하는 것입니다. 이것은 빌드 시간에 정적으로 렌더링된 라우트나 다시 검증 중인 라우트에 모두 적용됩니다.

3. 클라이언트에서의 React 수분 및 조정

    요청 시 클라이언트에서:

    - HTML은 클라이언트 및 서버 컴포넌트의 빠른 비대화형 초기 미리 보기를 즉시 표시하는 데 사용됩니다.
    - React Server Component Payload를 사용하여 클라이언트 및 렌더링된 서버 컴포넌트 트리를 조정하고 DOM을 업데이트합니다.
    - JavaScript 지시사항은 Client Component를 수분화하고 애플리케이션을 대화식으로 만드는 데 사용됩니다.

4. 클라이언트에서의 Next.js 캐싱 (Router Cache)

    React Server Component Payload는 클라이언트 측 Router Cache에 저장됩니다. 이것은 라우트 세그먼트별로 분할되어 있는 클라이언트 측 메모리 내 캐시로, 방문한 라우트를 저장하고 미래 라우트를 미리 가져오는 데 사용됩니다.

5. 후속 탐색

    후속 탐색 또는 미리 가져오기 중에 Next.js는 React Server Component Payload가 Router Cache에 저장되어 있는지 확인합니다. 그렇다면 서버로 새로운 요청을 보내지 않고 건너뛸 것입니다.

    라우트 세그먼트가 캐시에 없는 경우, Next.js는 서버에서 React Server Component Payload를 가져와 클라이언트의 Router Cache에 넣을 것입니다.

**정적 및 동적 렌더링**

빌드 시간에 라우트가 캐시되는지 여부는 라우트가 정적으로 렌더링되는지 동적으로 렌더링되는지에 따라 다릅니다. 정적 라우트는 기본적으로 캐시되지만 동적 라우트는 요청 시 렌더링되고 캐시되지 않습니다.

아래 다이어그램은 정적 및 동적으로 렌더링된 라우트, 캐시된 데이터와 캐시되지 않은 데이터의 차이를 보여줍니다.

![정적 및 동적 렌더링이 Full Route Cache에 미치는 영향](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fstatic-and-dynamic-routes.png&w=3840&q=75&dpl=dpl_3wkz54GL4Qds75in6aFgCz43FeQH)

정적 라우트는 빌드 시간에 또는 데이터 재검증 후에 캐시되지만 동적 라우트는 렌더링된 후에는 캐시되지 않음을 나타냅니다.

더 자세한 정보는 [정적 및 동적 렌더링에 대해 더 알아보기](https://nextjs.org/docs/app/building-your-application/rendering/server-components#server-rendering-strategies)를 참조하세요.

**지속 시간(Duration)**

기본적으로 Full Route Cache는 지속적입니다. 이것은 렌더링 결과가 사용자 요청 간에 캐시된다는 것을 의미합니다.

**무효화(Invalidation)**

Full Route Cache를 무효화하는 두 가지 방법이 있습니다:

1. [데이터 재검증](https://nextjs.org/docs/app/building-your-application/caching#revalidating): [데이터 Cache](https://nextjs.org/docs/app/building-your-application/caching#data-cache)를 재검증하면 서버에서 컴포넌트를 다시 렌더링하고 새 렌더링 결과를 캐시함으로써 Router Cache를 무효화합니다.

2. 다시 배포: 데이터 Cache와 달리 Full Route Cache는 새로운 배포에서 지워집니다.

**무효화 해제(Opting out)**

Full Route Cache에서 빠져나오려면, 즉, 모든 요청에 대해 동적으로 컴포넌트를 렌더링하려면 다음과 같은 방법을 사용할 수 있습니다:

-   [동적 함수](https://nextjs.org/docs/app/building-your-application/caching#dynamic-functions) 사용: 이렇게 하면 라우트가 Full Route Cache에서 제외되고 요청 시 동적으로 렌더링되지만 데이터 Cache는 사용할 수 있습니다.

-   **dynamic = 'force-dynamic'** 또는 **revalidate = 0** 라우트 세그먼트 구성 옵션 사용: 이렇게 하면 Full Route Cache 및 Data Cache가 생략되며 컴포넌트가 서버로의 모든 요청에 렌더링되고 데이터가 가져옵니다. Router Cache는 클라이언트 측 캐시이므로 여전히 적용됩니다.

-   [데이터 Cache](https://nextjs.org/docs/app/building-your-application/caching#data-cache)를 해제: 특정 fetch 요청에 대해 캐시되지 않은 데이터를 사용하는 라우트를 Full Route Cache에서 제외할 수 있습니다. 특정 fetch 요청에 대한 데이터는 모든 요청에 대해 가져옵니다. 다른 fetch 요청은 캐시되어 있습니다. 이것은 캐시된 데이터와 캐시되지 않은 데이터의 혼합을 허용합니다.

## Router Cache (라우터 캐시)

**관련 용어:**

라우터 캐시는 클라이언트 측 캐시 또는 프리페치 캐시로 언급될 수 있습니다. 프리페치 캐시는 프리페치된 라우트 세그먼트를 나타내며, 클라이언트 측 캐시는 방문 및 프리페치된 세그먼트를 모두 포함하는 전체 라우터 캐시를 나타냅니다. 이 캐시는 명시적으로 Next.js 및 서버 컴포넌트에 적용되며, 브라우저의 [bfcache](https://web.dev/articles/bfcache?hl=ko)와는 다르지만 비슷한 결과를 얻을 수 있습니다.

Next.js는 사용자 세션 동안 개별 라우트 세그먼트로 분할된 React 서버 컴포넌트 페이로드를 저장하는 인메모리 클라이언트 측 캐시를 가지고 있습니다. 이것이 라우터 캐시입니다.

**라우터 캐시의 작동 방식**

정적 및 동적 라우트에 대한 라우터 캐시의 작동 방식, 초기 및 후속 탐색에 대한 MISS 및 HIT를 보여줍니다.

<img src="https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Frouter-cache.png&w=1920&q=75&dpl=dpl_Bc7CbD7RwszCzNUpzd3Tgf9PdPnL">

사용자가 라우트 간 이동하면 Next.js는 방문한 라우트 세그먼트를 캐시하고 사용자가 탐색할 가능성이 있는 라우트를 [미리](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#1-prefetching) 가져옵니다(뷰포트 내의 `<Link>` 구성 요소를 기반으로).

이로 인해 사용자에게 향상된 탐색 경험이 제공됩니다:

-   방문한 라우트가 캐시되므로 즉시 뒤로/앞으로 이동할 수 있으며, 미리 가져오기와 [부분 렌더링](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#3-partial-rendering) 덕분에 새로운 라우트로 빠르게 이동할 수 있습니다.
-   탐색 간에 전체 페이지 다시로드가 없으며 React 상태와 브라우저 상태가 유지됩니다.

**라우터 캐시와 전체 라우트 캐시의 차이:**

라우터 캐시는 사용자 세션 동안 브라우저에 React 서버 컴포넌트 페이로드를 일시적으로 저장하며, 전체 라우트 캐시는 여러 사용자 요청 간에 React 서버 컴포넌트 페이로드와 HTML을 영구적으로 저장합니다.

전체 라우트 캐시는 정적으로 렌더링된 라우트만 캐시하지만 라우터 캐시는 정적 및 동적으로 렌더링된 라우트 모두에 적용됩니다.

### Duration (지속 기간)

이 캐시는 브라우저의 일시적인 메모리에 저장됩니다. 라우터 캐시의 지속 기간은 다음 두 가지 요인에 따라 결정됩니다:

-   세션: 캐시는 탐색을 통해 유지됩니다. 그러나 페이지 새로 고침 시 지워집니다.
-   자동 무효화 기간: 개별 세그먼트의 캐시는 특정 시간 후 자동으로 무효화됩니다. 이 지속 기간은 라우트가 정적으로 렌더링되었는지 동적으로 렌더링되었는지에 따라 다릅니다:
    -   동적 렌더링: 30초
    -   정적 렌더링: 5분
        페이지 새로 고침은 모든 캐시된 세그먼트를 지우지만 자동 무효화 기간은 마지막으로 액세스되거나 생성된 후 일정 시간이 경과한 개별 세그먼트에만 영향을 미칩니다.

동적으로 렌더링된 라우트를 5분 동안 캐싱하려면 prefetch={true}를 추가하거나 router.prefetch를 호출할 수 있습니다.

### Invalidation (무효화)

라우터 캐시를 무효화하는 두 가지 방법이 있습니다:

-   서버 액션에서:

    -   경로별로 필요한 데이터를 재검증([revalidatePath](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)) 또는 캐시 태그별로 재검증([revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag))하여 필요할 때 데이터를 새로 가져옵니다.
    -   [cookies.set](https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options) 또는 [cookies.delete](https://nextjs.org/docs/app/api-reference/functions/cookies#deleting-cookies)를 사용하여 쿠키를 사용하는 라우트가 오래되지 않도록 라우터 캐시를 무효화합니다(예: 인증).
    -   [router.refresh](https://nextjs.org/docs/app/api-reference/functions/use-router)를 호출하여 라우터 캐시를 무효화하고 현재 라우트에 대한 새로운 요청을 서버에 보냅니다.

### Opting out (거부할 수 없음)

라우터 캐시에서 거부하는 것은 불가능합니다.

-   하지만 `<Link>`구성 요소의 prefetch 속성을 false로 설정하여 미리 가져오기를 거부할 수 있습니다. 그러나 이렇게 하더라도 라우트 세그먼트를 일시적으로 30초 동안 저장하여 탭 바 또는 뒤로/앞으로 이동과 같이 중첩된 세그먼트 간의 즉각적인 탐색을 허용합니다. 방문한 라우트는 여전히 캐시됩니다.

## 캐시 상호작용 (Cache Interactions)

다양한 캐싱 메커니즘을 구성할 때 서로 상호작용하는 방식을 이해하는 것이 중요합니다:

### 데이터 캐시와 전체 라우트 캐시

-   데이터 캐시를 재검증하거나 거부하면 전체 라우트 캐시가 무효화됩니다. 렌더링 출력이 데이터에 의존하기 때문입니다.
-   전체 라우트 캐시를 무효화하거나 거부하더라도 데이터 캐시에는 영향을 미치지 않습니다. 캐시된 데이터를 대부분 사용하지만 요청 시 가져와야 하는 데이터를 사용하는 몇 가지 구성 요소가 있는 경우 유용합니다. 모든 데이터를 다시 가져오는 성능 문제를 걱정하지 않고 동적으로 렌더링할 수 있습니다.

### 데이터 캐시와 클라이언트 측 라우터 캐시

-   [라우터 핸들러](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)에서 데이터 캐시를 재검증하더라도 라우터 핸들러는 특정 라우트에 연결되어 있지 않기 때문에 즉시 라우터 캐시가 무효화되지 않습니다. 이것은 라우터 캐시가 하드 새로 고침하거나 자동 무효화 기간이 경과할 때까지 이전 페이로드를 계속 제공한다는 의미입니다.
-   데이터 캐시와 라우터 캐시를 즉시 무효화하려면 [서버 액션](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations)에서 [revalidatePath](https://nextjs.org/docs/app/api-reference/functions/revalidatePath) 또는 캐시 태그별로 재검증[revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)를 사용할 수 있습니다.
