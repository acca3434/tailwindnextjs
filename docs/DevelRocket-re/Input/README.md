```tsx
import React, { ChangeEvent, HTMLInputTypeAttribute, useState } from 'react'
import { cn } from '@/app/_util/clsx/utils'

type InputValueType = string | number
type InputType = HTMLInputTypeAttribute | undefined

type TextInputProps<InputType, InputValueType> = {
    readOnly?: boolean
    type?: InputType
    label?: string
    value?: InputValueType
    defaultValue?: InputValueType
    onChange?: (value: InputValueType) => void
}

const TextInput: React.FC<TextInputProps<InputType, InputValueType>> = ({
    label,
    type = 'text',
    defaultValue,
    onChange,
}) => {
    const [value, setValue] = useState<InputValueType>(
        defaultValue !== undefined ? defaultValue : '', // 빈 문자열 또는 다른 적절한 기본값
    )

    const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value as InputValueType
        setValue(newValue)
        if (onChange) {
            onChange(newValue)
        }
    }

    if (defaultValue === undefined) return <>입력값이 없습니다.</>

    return (
        <div className="relative">
            <input
                className={cn(
                    'w-[500px] h-[53px] m-10 border border-gray-300',
                    'rounded-md shadow-sm',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                )}
                name="textfield"
                id="textfield"
                type={type}
                onChange={(e) => handleValue(e)}
                value={value as string} // value를 string으로 캐스팅
            />
            <label className="absolute top-2 left-15 bg-white px-1 text-xs text-gray-500" htmlFor="textfield">
                {label}
            </label>
        </div>
    )
}

export default TextInput
```

## TextInput Component 수정 기록

### 개요

TextInput 컴포넌트의 수정 기록 및 설명

### 수정 이전

**제네릭 타입 설정 수정하기 전의 값**

```tsx
type TextInputProps = {
    readOnly?: boolean
    type?: 'text' | 'number'
    label?: string
    value?: string | number
    defaultValue?: string | number
    onChange?: (value: string | number) => void
}
```

**초기값 설정 수정하기 전의 값**

```tsx
const [value, setValue] = useState<string | number>('')
```

**입력값 처리 수정하기 전의 값**

```tsx
const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value as string | number
    setValue(newValue)
    if (onChange) {
        onChange(newValue)
    }
}
```

### 코드 수정 이유

#### 1. 제네릭 타입 설정

**제네릭 타입 설정 수정한 후의 값**

```tsx
type InputValueType = string | number
type InputType = HTMLInputTypeAttribute | undefined

type TextInputProps<InputType, InputValueType> = {
    readOnly?: boolean
    type?: InputType
    label?: string
    value?: InputValueType
    defaultValue?: InputValueType
    onChange?: (value: InputValueType) => void
}
```

-   `TextInput` 컴포넌트에 제네릭 타입 `InputValueType`와 `InputType`를 도입하여 유연성을 확보했습니다. `InputValueType`는 `string` 또는 `number` 타입이 가능하고, `InputType`는 `HTMLInputTypeAttribute` 또는 `undefined`일 수 있습니다. 이를 통해 사용자는 원하는 타입을 `TextInput` 컴포넌트에 전달할 수 있으며 `type` 속성도 더 유연하게 설정할 수 있습니다.

#### 2. 초기값 설정

**초기값 설정 수정한 후의 값**

```tsx
const [value, setValue] = useState<InputValueType>(
    defaultValue !== undefined ? defaultValue : '', // 빈 문자열 또는 다른 적절한 기본값
)
```

-   `useState`를 사용하여 `value` 상태를 초기화하는 부분입니다. `defaultValue`가 `undefined`이 아닌 경우에는 `defaultValue`를 사용하고, 그렇지 않은 경우 빈 문자열 또는 다른 적절한 기본값을 사용합니다. 이로써 `TextInput` 컴포넌트를 더 유연하게 사용할 수 있도록 변경되었습니다.

#### 3. 입력값 처리

\*\*입력값 처리 수정한 후의 값

\*\*

```tsx
const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value as InputValueType
    setValue(newValue)
    if (onChange) {
        onChange(newValue)
    }
}
```

-   `handleValue` 함수에서는 입력된 값(`e.target.value`)을 `InputValueType` 타입으로 캐스팅한 다음 `value` 상태를 업데이트합니다. 이와 함께 `onChange` 콜백 함수가 제공된 경우, 입력값의 변경을 콜백 함수에도 전달합니다. 이로써 입력값을 처리하는 로직이 더 일반적이고 유연해졌습니다.

## 사용 방법

수정된 `TextInput` 컴포넌트는 다음과 같이 사용할 수 있습니다.

```tsx
<TextInput type="text" label="Name" defaultValue="John" />
<TextInput type="number" label="Age" />
```

코드 수정으로 인해 `TextInput` 컴포넌트가 더욱 유연하게 사용 가능해졌으며, 제네릭 타입을 통해 다양한 타입의 값과 타입을 지정할 수 있게 되었습니다.
