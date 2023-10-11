# 빌드 에러 이슈 모음

### Postcss 관련 이슈

1.  git clone https://github.com/acca3434/tailwindnextjs.git

2.  npm install

3.  npm run build

> Error: Cannot find module '@fullhuman/postcss-purgecss'

1.  npm install @fullhuman/postcss-purgecss

2.  npm run build

> 해결 안됌

-   npm run start

> Error : Cannot find module postcss-preset-env

1.  npm install postcss-preset-env

2.  npm run build

> 됌

-   npm run start

> 됌

### npm run dev 후 npm run start한다면?

```bash
[Error: ENOENT: no such file or directory, open '/Users/jubyeonghyeon/tailwindnextjs/.next/BUILD_ID'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/Users/jubyeonghyeon/tailwindnextjs/.next/BUILD_ID'
}
```

-   npm run build 직후 npm run start 조져야 됌
-   정확한 이유는 나중에 봐야함.

### tail-merge 와 tw가 적용이 안됌

개발 환경에서는 tw를 적용한 css가 화면에 정상적으로 출력. 하지만 빌드만 하면 화면에 출력이 안됌.

<details>
<summary>기존 코드</summary>

```tsx
'use client'
import React from 'react'
import { cn } from '@/app/lib/utils'
import tw from 'twin.macro'

const ButtonVariant = {
    primary: [
        'bg-primary-500 text-black',
        'border-primary-600 border',
        'hover:bg-primary-600 hover:text-sky-400',
        'active:bg-primary-700',
        'disabled:bg-primary-700',
    ],
    outline: [
        'text-primary-500',
        'border-primary-500 border',
        'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
    ],
    ghost: [
        'text-black',
        'shadow-none',
        'hover:bg-primary-600 hover:text-sky-400 active:bg-primary-100 disabled:bg-primary-100',
    ],
    light: [
        'bg-white text-gray-700',
        'border border-gray-300',
        'hover:text-dark hover:bg-gray-100',
        'active:bg-white/80 disabled:bg-gray-200',
    ],
    dark: [
        'bg-gray-900 text-white',
        'border border-gray-600',
        'hover:bg-sky-400 hover:text-black hover:border-sky-400 active:bg-gray-700 disabled:bg-gray-700',
    ],
}
const ButtonSize = {
    base: ['px-10 py-8', 'text-sm md:text-base', 'w-100 h-50'],
    sm: ['px-5 py-2.5', 'text-xs md:text-sm', 'w-80 h-35'],
}

type ButtonProps = {
    isLoading?: boolean
    isDarkBg?: boolean
    disabled?: boolean
    variant?: keyof typeof ButtonVariant
    size?: keyof typeof ButtonSize
    title?: string
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'base',
    isDarkBg = false,
    title = '거래하기',
}) => {
    return (
        <div className="rounded-xl p-8">
            <div className="flex">
                <span className="relative inline-flex">
                    <button
                        type="button"
                        className={cn(
                            'flex items-center justify-center rounded-md text-sm font-semibold leading-6 text-sky-500 shadow ring-1 ring-slate-900/10 transition duration-150 ease-in-out',
                            ButtonSize[size],
                            ...ButtonVariant[variant], // Use spread operator to include the classes
                            isDarkBg && ['hover:bg-gray-900', 'active:bg-gray-800', 'disabled:bg-gray-800'], // Add isDarkBg classes here
                        )}
                        // disabled={disabled}
                    >
                        <h2 css={tw`[font-size: medium] text-center font-NanumGothic font-bold`}>{title}</h2>
                    </button>
                    <span tw="absolute right-[-5%] top-[-10%] -mr-1 -mt-1 flex h-15 w-15">
                        <span tw="absolute inline-flex h-full w-full animate-bounce rounded-full bg-sky-400"></span>
                    </span>
                </span>
            </div>
        </div>
    )
}

export default Button
```

</details>

<details>
<summary>수정 후 코드</summary>

```tsx
Tw 관련 css적용 완료 코드

'use client'
import React from 'react'
import { cn } from '@/app/lib/utils'
import tw from 'twin.macro'

const ButtonVariant = {
    primary: [
        tw`bg-gray-500 text-black`,
        tw`border-gray-600 border`,
        tw`hover:bg-gray-600 hover:text-sky-400`,
        tw`active:bg-black`,
        tw`disabled:bg-black`,
    ],
    outline: [
        tw`text-gray-500`,
        tw`border-gray-500 border`,
        tw`hover:bg-gray-50 active:bg-gray-100 disabled:bg-gray-100`,
    ],
    ghost: [
        tw`text-black`,
        tw`shadow-none`,
        tw`hover:bg-black hover:text-sky-400 active:bg-black disabled:bg-black`,
        tw`active:bg-black`,
        tw`disabled:bg-black`,
    ],
    light: [
        tw`bg-white text-gray-700`,
        tw`border border-gray-300`,
        tw`hover:text-right hover:bg-gray-100`,
        tw`active:bg-white/80 disabled:bg-gray-200`,
    ],
    dark: [
        tw`bg-gray-900 text-white`,
        tw`border border-gray-600`,
        tw`hover:bg-sky-400 hover:text-black hover:border-sky-400 active:bg-gray-700 disabled:bg-gray-700`,
    ],
}

interface ButtonSizeProps {
    base: string[]
    sm: string[]
}

const ButtonSize = {
    base: tw`px-10 py-8 text-sm [font-size: large] w-100 h-50`,
    sm: tw`px-5 py-2.5 text-xs [font-size: small]  w-80 h-35`,
}
type ButtonProps = {
    isLoading?: boolean
    isDarkBg?: boolean
    disabled?: boolean
    variant?: keyof typeof ButtonVariant
    size?: keyof typeof ButtonSize
    title?: string
    width?: number
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'base', isDarkBg = true, title = '거래하기' }) => {
    return (
        <div tw="rounded-xl p-8">
            <div tw="flex">
                <span tw="relative inline-flex">
                    <button
                        type="button"
                        css={[
                            tw`
                                flex items-center justify-center rounded-md text-sm font-bold leading-6 text-sky-500 shadow ring-1 ring-slate-900/10 transition duration-150 ease-in-out
                            `,
                            ButtonSize[size],
                            ButtonVariant[variant],
                            `${isDarkBg && tw`hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800`}`,
                        ]}
                        // disabled={disabled}
                    >
                        <h2 css={tw`[font-size: medium] text-center font-NanumGothic font-bold`}>{title}</h2>
                    </button>
                    <span tw="absolute right-[-5%] top-[-10%] -mr-1 -mt-1 flex h-15 w-15">
                        <span tw="absolute inline-flex h-full w-full animate-bounce rounded-full bg-sky-400"></span>
                    </span>
                </span>
            </div>
        </div>
    )
}

export default Button


```

</details>
