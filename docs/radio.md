# radio 컴포넌트

<details>

<summary>radio 컴포넌트 구현</summary>

#### @/components/radio/index.tsx

```jsx
import tw from 'twin.macro'

const RadioGroup: React.FC<RadioGroupProps> = ({ options }) => {
    return (
        <fieldset tw="flex justify-center gap-4 p-10">
            {options.map((option) => (
                <label key={option.value} tw="flex items-center">
                    <input
                        type="radio"
                        name="contact"
                        value={option.value}
                        defaultChecked={option.value === 'email'}
                        disabled={option.disabled}
                        tw="appearance-none border-[2px] border-gray-500 rounded-full w-5 h-5 transition border-opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-transparent focus-visible:border-transparent"
                    />
                    <span tw="ml-2 text-base">{option.label}</span>
                </label>
            ))}
        </fieldset>
    )
}

export default RadioGroup
```

#### @/app/page.tsx 이전 코드

```jsx
'use client'
import Button from '@/components/buttons/Button'
import TextInput from '@/components/input/TextInput'
import Divider from '@/components/dIvider'
import tw from 'twin.macro'
import Label from '@/components/label'
import { SetStateAction, useState } from 'react'

const Wrapper: React.FC<BasicLayoutProps> = ({ title, children, close }) => {
    return (
        <div css={tw`flex mt-20 items-center justify-center`}>
            <div css={tw`rounded-lg bg-white shadow-lg`}>
                <h2 css={tw`text-xl font-bold`}>
                    <div css={tw`border-black p-18 [border-bottom: 1px solid rgb(221, 221, 221)] `}>
                        <div css={tw`items-center flex justify-start`}>
                            <p css={tw`font-NanumGothic font-bold`}>{title}</p>
                            {close && <div>X</div>}
                        </div>
                    </div>
                </h2>
                <div>{children}</div>
            </div>
        </div>
    )
}

const Login: React.FC<LoginLayoutProps> = () => {
    const [selectedValue, setSelectedValue] = useState('')

    const handleRadioChange = (value: SetStateAction<string>) => {
        setSelectedValue(value)
    }
    return (
        <>
            <Wrapper title="로그인">
                <div css={tw`flex flex-col items-center p-30`}>
                    <div css={tw`flex flex-col mb-4`}>
                        <TextInput labelContent="아이디" type="text" />
                        <TextInput labelContent="패스워드" type="password" />
                    </div>
                    <div css={tw`flex items-center justify-between w-full p-10`}>
                        <div css={tw`flex items-center`}>
                            <input type="checkbox" css={tw`mr-2`} />
                            <label css={tw`text-gray-500 text-sm`}>로그인 저장</label>
                        </div>
                        <div css={tw`flex flex-row`}>
                            {/* <Label labelContent={'운영자'} type={'radio'} userType={'admin'} />
                            <Label labelContent={'교강사'} type={'radio'} userType={'user'} /> */}
                            <Label
                                labelContent="운영자"
                                checked={selectedValue === '운영자'}
                                onChange={() => handleRadioChange('운영자')}
                            />
                            <Label
                                labelContent="교강사"
                                checked={selectedValue === '교강사'}
                                onChange={() => handleRadioChange('교강사')}
                            />
                        </div>
                    </div>
                </div>
                <Divider />
                <div css={tw`flex items-center justify-center m-20`}>
                    <Button size="base" variant="primary" title="로그인" disabled={true} />
                </div>
            </Wrapper>
        </>
    )
}

export default function Home() {
    return <Login />
}
```

#### @/app/page.tsx 수정 코드

```jsx
const RadioGroup: React.FC<RadioGroupProps> = ({ options }) => {
    return (
        <fieldset tw="flex justify-center gap-4 p-10">
            {options.map((option) => (
                <label key={option.value} tw="font-NanumGothic font-normal [line-height: 2rem] pt-[0.2em] pr-[0.4em]">
                    <input
                        type="radio"
                        name="contact"
                        value={option.value}
                        defaultChecked={option.value === 'email'}
                        disabled={option.disabled}
                        tw="align-middle appearance-none border-2 [border-radius: 50%] w-[1.25em] h-[1.25em]
                            focus-visible:(outline-[2px, 0.1em, dotted tomato] outline-offset-[2px, 0.1em])
                            hover:([box-shadow: 4px,0.2em,lightgray] [cursor: pointer])
                            disabled:(bg-gray-500 shadow-none opacity-70)
                            transition-[border 0.5s ease-in-out]
                        "
                        css={`
                            ${option.value === 'email'
                                ? tw`border-t-stone-50 hover:border-t-stone-50 hover:cursor-pointer opacity-70 `
                                : ''},
                        `}
                    />
                    <span tw="align-middle [cursor: pointer] disabled:(opacity-70 cursor-not-allowed)">
                        {option.label}
                    </span>
                </label>
            ))}
        </fieldset>
    )
}

export default RadioGroup
```

#### 안해 그냥 CSS 코드로 작성



</details>
