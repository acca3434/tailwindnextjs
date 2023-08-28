# 개요

twin.macro를 도입하여 스타일링을 적용하는 방법을 기록. twin.macro는 Tailwind CSS와 Emotion을 중첩적으로 사용하여 동적 스타일링을 편리하게 처리할 수 있도록 도와주는 도구입니다. 위의 내용을 토대로 다시 요약하자면 다음과 같습니다.

1.  @emotion/react 및 @emotion/styled 라이브러리를 설치합니다.
2.  twin.macro를 설치합니다.
3.  withTwin.js 파일을 생성하여 webpack 설정을 추가합니다.
4.  next.config.js 설정 파일에서 withTwin을 적용합니다.
5.  타입 선언 파일(twin.d.ts)을 작성하여 twin.macro에서 사용하는 타입을 선언합니다.
6.  tsconfig.json 파일에 types 속성을 추가하여 타입 선언 파일을 포함시킵니다.
7.  컴포넌트에서 twin.macro를 사용하여 동적 스타일링을 적용합니다.
8.  또한, twin.macro를 사용하여 스타일을 적용하는 예시 코드도 포함되어 있습니다. 이 예시 코드는 twin.macro와 Tailwind CSS를 사용하여 컴포넌트의 스타일링을 처리하는 방법을 설명하고 있습니다.

# Nextjs13 twin.macro 도입

기존 emotion을 통한 CSS-in-JS 방식에서 단순한 컴포넌트의 HTML 코드 보다 스타일 코드가 더 복잡한 경우를 경험하였다.

스타일 코드가 실제 기능 코드의 가독성을 해친다고 생각하여 tailwindCSS를 사용하게 되었다.
emotion을 사용하며 불편했던 문제들을 다소 해소할 수 있었고 마크업 작성도 보다 쉽게 할 수 있었지만 불편한점을 발견하였다.

바로 동적 스타일링이였다.

가변적인 변수를 받아와 스타일을 적용해야하는 경우 tailwindCSS는 한계가 있었다. 이러한 트러블 슈팅을 해결하기 위해 방안을 찾아보던중 twin.macro에 대해 알게 되었고, twin.macro는 tailwindCSS와 emotion을 중첩적으로 유연하게 사용가능하게 해주었다.

나의 프로젝트에 twin.macro를 도입하여 적용한 과정을 기록해보려고 한다.
(기존 나의 프로젝트 환경은 nextjs 13 + typescript + tailwindCSS가 이미 구성되어있다는 가정하에 설치하도록 하자.)

```bash
npm i @emotion/react @emotion/styled
npm i -S @emotion/serialize
npm i -D twin.macro @emotion/babel-plugin babel-plugin-macros @babel/plugin-syntax-typescript @babel/preset-react
```

이 때, 후에 한 번 더 설명하겠지만, `npm i @emotion/react @emotion/styled` 및 `npm i -S @emotion/serialize`는 포함하지 않아도 됀다
자세한 얘기는 후에 다루겠다.


최상위 루트에 withTwin.js 파일을 생성한다.

### withTwin.js

```javascript
/* eslint-disable no-param-reassign */
const path = require('path');

const includedDirs = [path.resolve(__dirname, 'src')];

module.exports = function withTwin(nextConfig) {
  return {
    ...nextConfig,
    webpack(config, options) {
      const { dev, isServer } = options;
      config.module = config.module || {};
      config.module.rules = config.module.rules || [];
      config.module.rules.push({
        test: /\.(tsx|ts)$/,
        include: includedDirs,
        use: [
          options.defaultLoaders.babel,
          {
            loader: 'babel-loader',
            options: {
              sourceMaps: dev,
              presets: [
                [
                  '@babel/preset-react',
                  { runtime: 'automatic', importSource: '@emotion/react' },
                ],
              ],
              plugins: [
                require.resolve('babel-plugin-macros'),
                require.resolve('@emotion/babel-plugin'),
                [
                  require.resolve('@babel/plugin-syntax-typescript'),
                  { isTSX: true },
                ],
              ],
            },
          },
        ],
      });

      if (!isServer) {
        config.resolve.fallback = {
          ...(config.resolve.fallback || {}),
          fs: false,
          module: false,
          path: false,
          os: false,
          crypto: false,
        };
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }
      return config;
    },
  };
};
```
그 후에 최상위 루트의 `next.config.js`설정 파일에 다음과 같이 webpack 설정을 적용해준다.

```typescript
const withTwin = require('./withTwin');

/** @type {import('next').NextConfig} */
const nextConfig = withTwin({
  reactStrictMode: true,
});

module.exports = nextConfig;
```
이 때, [twin.d.ts](../src/types/twin.d.ts)를 보자면

```typescript
import 'twin.macro'
import styledImport, { CSSProp, css as cssImport } from 'styled-components'

declare module 'twin.macro' {
    // The styled and css imports
    const styled: typeof styledImport
    const css: typeof cssImport
}
declare module 'react' {
    // The css prop
    interface HTMLAttributes<T> extends DOMAttributes<T> {
        css?: CSSProp
        tw?: string
    }
    // The inline svg css prop
    interface SVGProps<T> extends SVGProps<SVGSVGElement> {
        css?: CSSProp
        tw?: string
    }
}

// The 'as' prop on styled components
declare global {
    namespace JSX {
        interface IntrinsicAttributes<T> extends DOMAttributes<T> {
            as?: string | Element
        }
    }
}

```
자세한건 모르지만, styled-components 내장 객체에서 해당 속성 객체를 가져와도 무방함.

이러한 type 선언에 대해 살펴보도록 `tsconfig.json`파일에 `types`속성을 추가한다.

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"],
  "types": ["types"] // type 선언 추가
}
```

# 테스트

```jsx
import { useState } from 'react';
import tw, { css } from 'twin.macro';

const Home = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <h2>max value === 3</h2>
      <span
        css={[
          tw`text-[36px] block`,
          css`
            color: ${value === 3 && 'hotpink'};
          `,
        ]}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => setValue((prev) => prev + 1)}
        className="text-[36px] bolder-[1px]"
      >
        +
      </button>

      <button
        type="button"
        onClick={() => setValue((prev) => prev - 1)}
        className="text-[36px]"
      >
        -
      </button>
    </div>
  );
};
export default Home;
```
원래 위의 코드를 좀 가져와서 테스트를 하려고 했는데 쉽게 와닿지가 않는다
그래서 아래와 같이 다시 써보겠다

```tsx
'use client'

import tw, { css } from "twin.macro";
import React from "react"

interface TestProps {
  width : number
  height : number
} 
const Test: React.FC<TestProps> = ({ width, height }) => {
    return (
      <>
        <div className={`w-[${width}px] h-[${height}px]`}>안녕하세요</div>
      </>
    )
}

export default Test
```
위의 코드가 올바르게 들어갈까?
![twin Example](../public/images/twin2.png)

적용이 되질 않는다...
tailwind는 이러한 동적할당이 적용되지 않는다
따라서 twin.macro와 같은 라이브러리를 사용하여 해결하는 것
자세한 해결 처리 과정은 아래 사이트를 참고하시길 바란다.

## 해결 방법

```tsx
'use client'

import tw, { css } from "twin.macro";
import React from "react"

interface TestProps {
  width? : number
  height?: number
} 
const Test: React.FC<TestProps> = ({ width, height, }) => {
    return (
      <>
        <div
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
      </>
    )
}

export default Test
```

이렇게 Props를 동적으로 할당받아 값을 가변적으로 변경할 수 있다.

## 문자열 템플릿을 사용하여 동적 할당 

```tsx
'use client'

import tw, { css } from "twin.macro";
import React from "react"

interface TestProps {
  width? : number
  height?: number
}

const Test: React.FC<TestProps> = ({ width, height }) => {
  // 동적으로 할당할 스타일을 생성합니다.
  const dynamicStyle = css`
    width: ${width}px;
    height: ${height}px;
  `;

  return (
    <>
      <div css={dynamicStyle}>
        안녕하세요
      </div>
    </>
  )
}

export default Test
```


### 다음 참고 사이트를 참고

[Nextjs13 twin.macro 도입](https://velog.io/@codenmh0822/Nextjs13-twin.macro-%EB%8F%84%EC%9E%85)
