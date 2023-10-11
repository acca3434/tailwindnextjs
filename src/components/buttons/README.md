# 버튼 컴포넌트

기준은 재사용성 및 유지 보수의 용이함

```jsx
import { cn } from '@/app/lib/utils'
```

[Title](../../lib/README.md) 참조 바람

### ButtonProps 타입 및 색깔 크기

ButtonProps 타입은 Button 컴포넌트에 전달되는 예상 속성을 정의합니다. isLoading, isDarkBg, disabled, variant, size와 같은 선택적 속성을 포함하며, 기타 버튼 관련 속성도 포함합니다.

```typescript
const ButtonVariant = ['primary', 'outline', 'ghost', 'light', 'dark'] as const
const ButtonSize = ['sm', 'base'] as const

type ButtonProps = {
    isLoading?: boolean
    isDarkBg?: boolean
    disabled?: boolean
    variant?: keyof typeof ButtonVariant
    size?: keyof typeof ButtonSize
} & React.ComponentPropsWithRef<'button'>
```

## 조건부 렌더링으로 컴포넌트 생성

각 props에 따라서 버튼의 특성을 달리하여 재사용성을 높히기 위한 색깔과 타입을 정함

```jsx
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'base',
      isDarkBg = false,
    },
    ref
  ) => {
  return (
    <div className="relative overflow-auto rounded-xl p-8">
      <div className="flex items-center justify-center">
        <span className="relative inline-flex">
          <button
            ref={ref}
            type="button"
            className={cn(
                "inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold leading-6 text-sky-500 shadow ring-1 ring-slate-900/10 transition duration-150 ease-in-out",
              [
                size === 'base' && ['px-4 py-2', 'text-sm md:text-base'],
                size === 'sm' && ['px-2 py-1', 'text-xs md:text-sm'],
              ],
            [
            variant === 'primary' && [
              'bg-primary-500 text-black',
              'border-primary-600 border',
              'hover:bg-primary-600 hover:text-sky-400',
              'active:bg-primary-700',
              'disabled:bg-primary-700',
            ],
            variant === 'outline' && [
              'text-primary-500',
              'border-primary-500 border',
              'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
            isDarkBg &&
                'hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800',
            ],
            variant === 'ghost' && [
              'text-primary-500',
              'shadow-none',
              'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
            isDarkBg &&
                'hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800',
            ],
            variant === 'light' && [
              'bg-white text-gray-700',
              'border border-gray-300',
              'hover:text-dark hover:bg-gray-100',
              'active:bg-white/80 disabled:bg-gray-200',
            ],
            variant === 'dark' && [
              'bg-gray-900 text-white',
              'border border-gray-600',
              'hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-700',
            ],
          ],
            )}
            // disabled={disabled}
          >
            Transactions
          </button>
          <span className="absolute right-[-5%] top-[-10%] -mr-1 -mt-1 flex h-5 w-5">
            <span className="absolute inline-flex h-full w-full animate-bounce rounded-full bg-sky-400"></span>
          </span>
        </span>
      </div>
    </div>
    );
  }
);
export default Button;
```

### 아무래도 이렇게 작성하면 유지보수에 별로 좋지 않음...

# 동적 버튼 컴포넌트

이 컴포넌트는 React와 Tailwind CSS를 활용하여 만든 동적 버튼 컴포넌트입니다. 이 컴포넌트를 사용하면 제공된 속성에 기반하여 다양한 스타일과 크기의 버튼을 동적으로 생성할 수 있습니다.

## 코드 설명

아래는 `Button` 컴포넌트 코드에서 주요 부분을 설명한 것입니다.

### ButtonVariant 객체 구조

`ButtonVariant` 객체는 선택한 크기에 따라 해당 버튼 스타일(변형)을 정의하며 각각의 클래스를 포함합니다.

```jsx
const ButtonVariant = {
    primary: {
        base: [
            // ... 기본 크기의 주 버튼 클래스
        ],
        sm: [
            // ... 작은 크기의 주 버튼 클래스
        ],
        // ... 다른 변형과 크기
    },
    // ... 다른 변형
}
```

### ButtonSize 객체 구조

마찬가지로 `ButtonSize` 객체는 버튼 크기와 해당 클래스를 정의합니다.

```jsx
const ButtonSize = {
    base: ['px-4 py-2', 'text-sm md:text-base'],
    sm: ['px-2 py-1', 'text-xs md:text-sm'],
}
```

### Button 컴포넌트

Button 컴포넌트는 제공된 속성을 사용하여 버튼의 스타일을 동적으로 생성합니다. cn 유틸리티 함수를 사용하여 클래스 이름을 연결합니다. 버튼의 스타일은 선택한 variant, size, isDarkBg 속성에 따라 결정됩니다.

```jsx
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'base',
      isDarkBg = false,
    },
    ref
  ) => {
    return (
      <div className="relative overflow-auto rounded-xl p-8">
        <div className="flex items-center justify-center">
          <span className="relative inline-flex">
            <button
              ref={ref}
              type="button"
              className={cn(
                // ... 기본 버튼 클래스
                ButtonSize[size],
                ...ButtonVariant[variant][size], // 스프레드 연산자를 사용하여 클래스 포함
                isDarkBg && ['hover:bg-gray-900', 'active:bg-gray-800', 'disabled:bg-gray-800'], // 여기에 isDarkBg 클래스 추가
              )}
              // disabled={disabled}
            >
              Transactions
            </button>
            <span className="absolute right-[-5%] top-[-10%] -mr-1 -mt-1 flex h-5 w-5">
              <span className="absolute inline-flex h-full w-full animate-bounce rounded-full bg-sky-400"></span>
            </span>
          </span>
        </div>
      </div>
    );
  }
);

export default Button;
```
