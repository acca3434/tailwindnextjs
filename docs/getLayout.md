# getLayout

### 개요

내 Next.js에서 사용하는 app디렉토리 구조에는 layout이 적용되지 않는다...  
따라서 해결해야함.

이 이슈를 해결한 문서를 보기 전, 선행 학습이 필요함

-   [Next.js 그리고 클라이언트 컴포넌트](Nextjs/clientComponents.md)

### @/app/components/test/layout.tsx

나는 twin.macro를 활용한다. 먼저 기존 코드를 보자면,

```javascript
'use client'

export default function TestLayout({ children }: { children: React.ReactNode }) {
    return (
        <div tw="flex flex-col items-center p-25">
            <div tw="rounded-lg bg-white shadow-lg">
                <div tw="p-18 [border-bottom: 1px solid rgb(221, 221, 221)]">
                    <div tw="items-center flex justify-start">
                        <p tw="text-xl  font-NanumGothic font-bold">버튼모음</p>
                        <div>X</div>
                    </div>
                </div>
                <div>{children}</div>
            </div>
        </div>
    )
}
```

tw를 사용함.  
하지만, 화면 출력에는 전혀 보이질 않는다. 즉, layout이 적용되질 않는다.

### 해결 방안

```javascript
'use client'
import tw from 'twin.macro'

export default function TestLayout({ children }: { children: React.ReactNode }) {
    return (
        <div css={tw`flex flex-col items-center p-25`}>
            <div css={tw`rounded-lg bg-white shadow-lg`}>
                <div css={tw`p-18 [border-bottom: 1px solid rgb(221, 221, 221)]`}>
                    <div css={tw`items-center flex justify-start`}>
                        <p css={tw`text-xl  font-NanumGothic font-bold`}>버튼모음</p>
                        <div>X</div>
                    </div>
                </div>
                <div>{children}</div>
            </div>
        </div>
    )
}
```
