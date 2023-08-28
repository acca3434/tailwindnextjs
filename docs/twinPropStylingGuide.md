# The prop styling guide

본 글은 다음 참고 사이트의 번역입니다.

[The prop styling guide](https://github.com/ben-rogerson/twin.macro/blob/master/docs/prop-styling-guide.md)

보간이란?

그냥 문자열 템플릿을 사용하여 동적으로 값을 끼워맞추는것을 의미함
파파고로 번역해서 보간이라는 단어가 많이 나올 것임.
## Basic styling

Twin의 two prop을 사용하여 tailwind 클래스를 jsx 요소에 추가합니다:

```js
import 'twin.macro'

const Component = () => (
  <div tw="flex w-full">
    <div tw="w-1/2"></div>
    <div tw="w-1/2"></div>
  </div>
)
```

- 조건부 스타일이 필요하지 않은 경우 "tw" 프로퍼티 사용
- `twin.macro`에서 가져오면 "tw" 프로퍼티가 활성화됩니다.
- Remove the need for an import with [babel-plugin-twin](https://github.com/ben-rogerson/babel-plugin-twin)

## Conditional styling

조건 스타일을 추가하려면 스타일을 배열에 내포하고 `css` "prop"을 사용합니다:

```js
import tw from 'twin.macro'

const Component = ({ hasBg }) => (
  <div
    css={[
      tw`flex w-full`, // 기본 스타일을 먼저 추가
      hasBg && tw`bg-black`, // 그 다음 조건부 스타일 추가
    ]}
  >
    <div tw="w-1/2" />
    <div tw="w-1/2" />
  </div>
)
```

<details>

<summary>TypeScript example</summary>

```tsx
import tw from 'twin.macro'

interface ComponentProps {
  hasBg?: string
}

const Component = ({ hasBg }: ComponentProps) => (
  <div
    css={[
      tw`flex w-full`, // 기본 스타일을 먼저 추가
      hasBg && tw`bg-black`, // 그 다음 조건부 스타일 추가
    ]}
  >
    <div tw="w-1/2" />
    <div tw="w-1/2" />
  </div>
)
```

</details>

- 트윈은 'css prop'을 소유하고 있지 않으며, 'prop'은 당신의 css-in-js 라이브러리에서 가져온 것입니다
- 배열에 값을 추가하면 기본 스타일, 조건 및 'vanilla css'를 쉽게 정의할 수 있습니다
- 여러 줄을 사용하여 백틱 내에서 스타일을 구성할 수 있습니다 ([template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals))

## Overriding styles

css prop 뒤에 `tw` prop을 사용하여 우선 스타일을 추가합니다:

```js
import tw from 'twin.macro'

const Component = () => (
  <div css={tw`text-white`} tw="text-black">
    Has black text
  </div>
)
```

## Keeping jsx clean

테일윈드 클래스 세트가 커지면 다른 jsx "프롭"의 가독성을 방해합니다.

jsx를 정리하려면 스타일을 들어 올려 개체의 명명된 항목으로 그룹화합니다.

```js
import tw from 'twin.macro'

const styles = {
  container: ({ hasBg }) => [
    tw`flex w-full`, // 기본 스타일을 먼저 추가
    hasBg && tw`bg-black`, // 그 다음 조건부 스타일 추가
  ],
  column: tw`w-1/2`,
}

const Component = ({ hasBg }) => (
  <section css={styles.container({ hasBg })}>
    <div css={styles.column} />
    <div css={styles.column} />
  </section>
)
```

<details>
  <summary>TypeScript example</summary>

```js
import tw from 'twin.macro'

interface ContainerProps {
  hasBg?: boolean;
}

const styles = {
  container: ({ hasBg }: ContainerProps) => [
    tw`flex w-full`, // Add base styles first
    hasBg && tw`bg-black`, // Then add conditional styles
  ],
  column: tw`w-1/2`,
}

const Component = ({ hasBg }: ContainerProps) => (
  <section css={styles.container({ hasBg })}>
    <div css={styles.column} />
    <div css={styles.column} />
  </section>
)
```

</details>

## Variants with many values

변형에 많은 값(eg:`variant="light/dark/etc"`),이 있을 경우, 객체에 있는 클래스의 이름을 지정하고 Prop을 사용하여 스타일이 포함된 항목을 가져옵니다:

```js
import tw from 'twin.macro'

const containerVariants = {
  // Named class sets
  light: tw`bg-white text-black`,
  dark: tw`bg-black text-white`,
  crazy: tw`bg-yellow-500 text-red-500`,
}

const styles = {
  container: ({ variant = 'dark' }) => [
    tw`flex w-full`,
    containerVariants[variant], // Grab the variant style via a prop
  ],
  column: tw`w-1/2`,
}

const Component = ({ variant }) => (
  <section css={styles.container({ variant })}>
    <div css={styles.column} />
    <div css={styles.column} />
  </section>
)
```

<details>
  <summary>TypeScript example</summary>

TwStyle 가져오기를 사용하여 "tw" 블록을 입력합니다

```tsx
import tw, { TwStyle } from 'twin.macro'

type WrapperVariant = 'light' | 'dark' | 'crazy'

interface ContainerProps {
  variant?: WrapperVariant
}

const containerVariants: Record<WrapperVariant, TwStyle> = {
  // Named class sets
  light: tw`bg-white text-black`,
  dark: tw`bg-black text-white`,
  crazy: tw`bg-yellow-500 text-red-500`,
}

const styles = {
  container: ({ variant = 'dark' }: ContainerProps) => [
    tw`flex w-full`,
    containerVariants[variant], // 지지대를 통해 변형 스타일을 잡습니다
  ],
  column: tw`w-1/2`,
}

const Component = ({ variant }: ContainerProps) => (
  <section css={styles.container({ variant })}>
    <div css={styles.column} />
    <div css={styles.column} />
  </section>
)
```

</details>

## Interpolation workaround

`babel`의 제한으로 인해 tailwind 클래스와 임의 프로퍼티는 그 어떤 부분도 동적으로 생성할 수 없습니다.

따라서 이와 같은 보간된 값은 작동하지 않습니다:

```js
<div tw="mt-${spacing === 'sm' ? 2 : 4}" /> // tailwind에서는 작동하지 않습니다.
<div tw="[margin-top:${spacing === 'sm' ? 2 : 4}rem]" /> // 임의 속성으로는 작동하지 않습니다
```

왜냐하면 babel은 변수의 값을 모르기 때문에 twin은 css로 변환할 수 없기 때문입니다.

대신 객체에 클래스를 정의하고 Props을 사용하여 클래스를 가져옵니다:

```js
import tw from 'twin.macro'

const styles = { sm: tw`mt-2`, lg: tw`mt-4` }

const Component = ({ spacing = 'sm' }) => <div css={styles[spacing]} />
```

또는 바닐라 `css`와 `twins theme` 가져오기를 결합합니다:

```js
import { theme } from 'twin.macro'

// tailwind 구성의 테마 값 사용
const styles = { sm: theme`spacing.2`, lg: theme`spacing.4` }

const Component = ({ spacing = 'sm' }) => (
  <div css={{ marginTop: styles[spacing] }} />
)
```

또는 우리는 항상 바닐라 css로 돌아갈 수 있습니다. 이것은 무엇이든 보간할 수 있습니다:

```js
import 'twin.macro'

const Component = ({ width = 5 }) => <div css={{ maxWidth: `${width}rem` }} />
```

## Custom selectors (Arbitrary variants)

대괄호로 묶인 임의의 변형을 사용하여 사용자 지정 선택기로 요소의 스타일을 지정합니다

```js
import tw from 'twin.macro'

const buttonStyles = tw`
  bg-black
  [> i]:block
  [> span]:(text-blue-500 w-10)
`

const Component = () => (
  <button css={buttonStyles}>
    <i>Icon</i>
    <span>Label</span>
  </button>
)
```

<details>
  <summary>More examples</summary>

<br/>

```js
// theming/scoping "클래스 이름"을 기준으로 현재 요소 스타일 지정
;<body className="dark-theme">
  <div tw="[.dark-theme &]:(bg-black text-white)">Dark theme</div>
</body>

// 사용자 지정 그룹 선택기 추가
;<button className="group" disabled>
  <span tw="[.group:disabled &]:text-gray-500">Text gray</span>
</button>

// 사용자 지정 높이 쿼리 추가
;<div tw="[@media (min-height: 800px)]:hidden">
  This window is less than 800px height
</div>

// @supports와 같은 사용자 지정 "at-rules" 사용
;<div tw="[@supports (display: grid)]:grid">A grid</div>

// Style the current element based on a dynamic className
const Component = ({ isLarge }) => (
  <div className={isLarge && 'is-large'} tw="text-base [&.is-large]:text-lg">
    ...
  </div>
)
```

</details>

## Custom class values (Arbitrary values)

사용자 정의 값은 대괄호를 사용하여 사용자 정의 값을 정의함으로써 많은 tailwind 클래스에 추가할 수 있습니다:

```js
;<div tw="top-[calc(100vh - 2rem)]" />
// ↓ ↓ ↓ ↓ ↓ ↓
<div css={{
  "top": "calc(100vh - 2rem)"
}} />
```

[Read more about Arbitrary values →](https://github.com/ben-rogerson/twin.macro/blob/master/docs/arbitrary-values.md)

## Custom css

Basic css is added using [arbitrary properties](https://tailwindcss.com/docs/adding-custom-styles#arbitrary-properties) or within vanilla css which supports more advanced use cases like dynamic/interpolated values.

### Simple css styling

To add simple custom styling, use [arbitrary properties](https://tailwindcss.com/docs/adding-custom-styles#arbitrary-properties):

```js
// Set css variables
<div tw="[--my-width-variable:calc(100vw - 10rem)]" />

// Set vendor prefixes
<div tw="[-webkit-line-clamp:3]" />

// Set grid areas
<div tw="[grid-area:1 / 1 / 4 / 2]" />
```
variants 또는 twins grouping features과 함께 임의의 속성을 사용합니다:
Use arbitrary properties with variants or twins grouping features:

```js
<div tw="block md:(relative [grid-area:1 / 1 / 4 / 2])" />
```

임의 속성은 'tw' 가져오기에서도 작동합니다

```js
import tw from 'twin.macro'
;<div
  css={tw`
    block
    md:(relative [grid-area:1 / 1 / 4 / 2])
  `}
/>
```

- Add a bang to make the custom css !important: `![grid-area:1 / 1 / 4 / 2]`
- Arbitrary properties can have camelCase properties: `[gridArea:1 / 1 / 4 / 2]`

### Advanced css styling

css prop은 sass와 같은 구문을 사용하여 사용자 지정 css와 테일윈드 스타일을 모두 허용하며, 테일윈드 구성에서 얻을 수 있는 값을 사용자 지정 css와 테일윈드 스타일을 사용할 수 있습니다:

```js
import tw, { css, theme } from 'twin.macro'

const Components = () => (
  <input
    css={[
      tw`text-blue-500 border-2`,
      css`
        -webkit-tap-highlight-color: transparent; /* add css styles */
        background-color: ${theme`colors.red.500`}; /* use the theme import to add config values */
        &::selection {
          ${tw`text-purple-500`}; /* style with tailwind classes */
        }
      `,
    ]}
  />
)
```

그러나 위의 보간을 피하기 때문에 객체를 사용하여 스타일을 추가하는 것이 더 좋습니다:

```js
import tw, { css, theme } from 'twin.macro'

const Components = () => (
  <input
    css={[
      tw`text-blue-500 border-2`,
      css({
        WebkitTapHighlightColor: 'transparent', // css 속성은 camelCase입니다
        backgroundColor: theme`colors.red.500`, // 값은 보간이 필요하지 않습니다
        '&::selection': tw`text-purple-500`, // single line tailwind selector styling
      }),
    ]}
  />
)
```

## Learn more

- [Styled component guide](https://github.com/ben-rogerson/twin.macro/blob/master/docs/styled-component-guide.md) - A must-read guide on getting productive with styled-components

## Resources

- [babel-plugin-twin](https://github.com/ben-rogerson/babel-plugin-twin) - Use the tw and css props without adding an import
- [React + Tailwind breakpoint syncing](https://gist.github.com/ben-rogerson/b4b406dffcc18ae02f8a6c8c97bb58a8) - Sync your tailwind.config.js breakpoints with react
- [Twin VSCode snippits](https://gist.github.com/ben-rogerson/c6b62508e63b3e3146350f685df2ddc9) - For devs who want to type less
- [Twin VSCode extensions](https://github.com/ben-rogerson/twin.macro/discussions/227) - For faster class suggestions and feedback

---

[&lsaquo; Documentation](https://github.com/ben-rogerson/twin.macro/blob/master/docs/index.md)
