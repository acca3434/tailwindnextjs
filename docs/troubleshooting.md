# 클래스명 정렬

`prettier-plugin-tailwindcss`

tailwindlabs에서 공식으로 지원하는 플러그인

`eslint-plugin-tailwindcss`

prettier 의존성을 벗어남은 물론 몇몇 추가 기능을 제공하는 플러그인.
아쉽게도 svelte에서는 완벽히 호환이 되진 않는다.

# Installation

시작하려면 `prettier,eslint-plugin-tailwindcss`를 개발자 종속 요소로 설치하세요

`npm install prettier-plugin-tailwindcss`
`npm install eslint-plugin-tailwindcss`

[참고사이트](https://bepyan.github.io/blog/dev-setting/tailwindcss)

그런 다음 플러그인을 Prettier 구성에 추가합니다:

## prettier.config.js

```javascript
module.exports = {
    plugins: ['prettier-plugin-tailwindcss'],
}
```

그 이후 설정은 아래 참고사이트에서 참고

[prettier](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

다음은 eslint를 설정합니다.

## .eslintrc.json

## ESLint 파서 구성

```json
  "overrides": [
	{
		"files" : ["*.ts", "*.tsx", "*.js"],
      "parser": "@typescript-eslint/parser"
    }
    ],
```

## Npm 스크립트 추가

package.json소스 파일을 대상으로 eslint를 실행하려면 하나 이상의 스크립트를 추가하세요 .

```json
"scripts": {
  "lint": "eslint ./src",
  "lint:debug": "eslint ./src --debug",
  "lint:fix": "eslint ./src --fix"
},
```

## 해결 방법

이 아이 때문에 2시간 날려먹음^^
어차피 안돼는데 또 하나의 이슈가 또 발생함
prettier가 안먹히는 주요 원인이 되었음

`npm uninstall eslint-plugin-tailwindcss`
`npm uninstall prettier-plugin-tailwindcss`

시원하게 때리자.

## 결과

너무 잘됌

# use-client 에러 발생

이 에러는 Next.js13과 관련이 있습니다.

![Alt text](../public/images/useclient1.png)

위 그림을 보시면 대충 React 관련 기능을 쓰려면 클라이언트 컴포넌트로 작성해야 된다고 알 수 있습니다.
Next.js에서는 컴포넌트가 클라이언트에서 작동하라고 지정하는 디렉티브를 쓰는데요.
파일 첫 줄에 'use client'라고 입력하면 그 파일은 클라이언트 컴포넌트로 취급되고 컴파일됩니다.

```bash
./src/components/Test/Test.tsx
ReactServerComponentsError:

You're importing a component that needs useState. It only works in a Client Component but none of its parents are marked with "use client", so they're Server Components by default.
Learn more: https://nextjs.org/docs/getting-started/react-essentials

   ,-[/root/tailwindnextjs/src/components/Test/Test.tsx:1:1]
 1 | import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
 2 | import _styled from "styled-components";
 3 | import { css as _css } from "styled-components";
 4 | import React, { useState } from "react";
   :                 ^^^^^^^^
 5 | const Test = ()=>{
 6 |     const [value, setValue] = useState(0);
 7 |     return /*#__PURE__*/ _jsxDEV("div", {
   `----
```

## 원인

위 코드처럼 Next.js 13 버전이 친절하게 클라이언트 컴포넌트를 쓰려면 'use client' 디렉티브를 지정하라고 나옵니다.
그럼 다시 useState 부분은 삭제하고 다시 진행하겠습니다.
Next.js 13 버전은 클라이언트와 서버 컴포넌트를 효율적으로 섞어 쓰도록 권장하는데요.
즉, Nested Layout 형태로 쓰는 게 가장 좋습니다.
즉, 우리가 만들려고 하는 Search 화면에서 input 부분은 클라이언트 컴포넌트로 작성하고,
Search 결과가 나타나는 곳은 Nested 형태로 Layout을 가져가서 데이터를 Streaming 한다는 개념으로 접근하라는 건데요.
/app/search/layout.tsx 파일을 작성해야 합니다.
search 폴더 밑에 layout.tsx 파일을 만들겠다는 거는 search 폴더 밑으로 같은 layout을 적용하겠다는 얘기입니다.
layout같은 경우는 너무 설명이 길어지니, 일단 해결방법은?

## 해결 방법

최상단에 `use-client`를 붙혀주세요

## 참고 사이트

[Next.js 13의 Client Component 살펴보기](https://mycodings.fly.dev/blog/2022-11-17-nextjs-13-client-component)

# twin.macro에서 tw를 이용한 font가 적용 안됌

```tsx
'use client'

import tw, { css } from 'twin.macro'
import React from 'react'
interface TestProps {
    width?: number
    height?: number
}
const Test: React.FC<TestProps> = ({ width, height }) => {
    return (
        <>
            <div
                className="font-NanumSquare"
                css={[
                    tw`w-full h-full`,
                    {
                        width: width,
                        height: height,
                    },
                ]}
            >
                안녕하세요
            </div>
            <div className="p-4 md:p-0">
                <p className="md:text-[34px] md:text-left text-xl text-center font-NanumGothic font-tiny">
                    이륙할 준비가 되셨나요?
                </p>
                <p className="md:text-52 md:p-0 mt-4 pl-7 pr-7 font-NanumSquare text-center md:text-left md:leading-[3rem]">
                    <span className="font-bold">새로운 세상</span>
                    <span className="opacity-80">을 위한</span>
                    <br />
                    <span className="font-bold">앞서가는 개발자</span>
                    <span className="opacity-80">취업 프로젝트</span>
                </p>
            </div>
        </>
    )
}

export default Test
```

폰트 적용이 너무 안돼길래
혹시나 싶어서 곽교수님 코드를 긁어왔다

```tsx
'use client'

import tw, { css } from 'twin.macro'
import React from 'react'
interface TestProps {
    width?: number
    height?: number
}
const Test: React.FC<TestProps> = ({ width, height }) => {
    return (
        <>
            <div
                className="font-NanumSquare"
                css={[
                    tw`w-full h-full`,
                    {
                        width: width,
                        height: height,
                    },
                ]}
            >
                안녕하세요
            </div>
            <div className="p-4 md:p-0">
                <p className="md:text-[34px] md:text-left text-xl text-center font-NanumGothic font-tiny">
                    이륙할 준비가 되셨나요?
                </p>
                <p className="md:text-52 md:p-0 mt-4 pl-7 pr-7 font-NanumSquare text-center md:text-left md:leading-[3rem]">
                    <span className="font-bold">새로운 세상</span>
                    <span className="opacity-80">을 위한</span>
                    <br />
                    <span className="font-bold">앞서가는 개발자</span>
                    <span className="opacity-80">취업 프로젝트</span>
                </p>
            </div>
        </>
    )
}

export default Test
```

당황스러울 정도로 너무 잘됌
차이점은 tw를 이용한 속성 정의에서 font는 적용되지 않는 것 같다.

## 해결 방안

원래 문자열 템플릿 동적 할당은 되지 않도록 설계함.
따라서 여러 가지 방법을 적용한 설명문을 가져옴.
발번역이라 직접 가서 보시는걸 추천합니다.

[참고 md파일](twinPropStylingGuide.md)
