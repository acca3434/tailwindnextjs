# 개요

참고사이트를 따라서 번역한 글 입니다. [참고사이트](https://github.com/ben-rogerson/twin.macro/blob/master/docs/fonts.md)

# Fonts

[글로벌 스타일 공급자](#add-the-font-face-in-the-global-styles-provider) 또는 [기존 .css 파일](#add-the-font-face-in-a-traditional-css-file)에서 `@font-face` 정의를 추가할 수 있습니다.

## 글로벌 스타일 공급자에 `@font-face` 추가

옵션은 css-in-js 라이브러리와 함께 제공되는 글로벌 제공자와 함께 글꼴을 추가하는 것입니다. 다음은 몇 가지 예입니다:

### Styled-components

```js
// styles/GlobalStyles.js
import React from 'react'
import { createGlobalStyle } from 'styled-components'
import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro'

const CustomStyles = createGlobalStyle`
  @font-face {
    font-family: 'Foo';
    src: url('/path/to/exampleFont.woff') format('woff');
    font-style: normal;
    font-weight: 400;
    /* https://styled-components.com/docs/faqs#how-do-i-fix-flickering-text-after-server-side-rendering */
    font-display: fallback;
  }
`

const GlobalStyles = () => (
    <>
        <BaseStyles />
        <CustomStyles />
    </>
)

export default GlobalStyles
```

[createGlobalStyle docs →](https://styled-components.com/docs/api#createglobalstyle)

### Emotion

```js
// styles/GlobalStyles.js
import React from 'react'
import { Global, css } from '@emotion/react'
import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro'

const customStyles = css`
    @font-face {
        font-family: 'Foo';
        src: url('/path/to/exampleFont.woff') format('woff');
        font-style: normal;
        font-weight: 400;
        /* https://styled-components.com/docs/faqs#how-do-i-fix-flickering-text-after-server-side-rendering */
        font-display: fallback;
    }
`

const GlobalStyles = () => (
    <>
        <BaseStyles />
        <Global styles={customStyles} />
    </>
)

export default GlobalStyles
```

[Global docs →](https://emotion.sh/docs/globals)

### Goober

```js
// styles/GlobalStyles.js
import React from 'react'
import { createGlobalStyle } from 'styled-components'
import tw, { GlobalStyles as BaseStyles } from 'twin.macro'

const CustomStyles = createGlobalStyle`
  @font-face {
    font-family: 'Foo';
    src: url('/path/to/exampleFont.woff') format('woff');
    font-style: normal;
    font-weight: 400;
    /* https://styled-components.com/docs/faqs#how-do-i-fix-flickering-text-after-server-side-rendering */
    font-display: fallback;
  }
`

const GlobalStyles = () => (
    <>
        <BaseStyles />
        <CustomStyles />
    </>
)

export default GlobalStyles
```

[createGlobalStyle docs →](https://goober.js.org/api/createGlobalStyles)

## .css 파일에 `@font-face`를 추가하여 가져옵니다

이 방법은 일부 프레임워크에서 텍스트 깜박임을 제거하는 데 도움이 될 수 있습니다.

```css
/* styles/fonts.css */
@font-face {
    font-family: 'Foo';
    src: url('/path/to/exampleFont.woff') format('woff');
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
}
```

```js
// index.js / _app.js
import '../styles/fonts.css'
// ...
```

---

[&lsaquo; Documentation](https://github.com/ben-rogerson/twin.macro/blob/master/docs/index.md)
