# clsx

### [clsx](https://github.com/lukeed/clsx)

clsx의 깃허브는 다음 링크를 타고 가면 됩니다.
JavaScript로 작성된 228B의 작은 라이브러리입니다.

## 사용 방법

`npm install --save clsx`

```javascript
import clsx from 'clsx';
// or
import { clsx } from 'clsx';

// Strings (variadic)
clsx('foo', true && 'bar', 'baz');
//=> 'foo bar baz'

// Objects
clsx({ foo:true, bar:false, baz:isTrue() });
//=> 'foo baz'

// Objects (variadic)
clsx({ foo:true }, { bar:false }, null, { '--foobar':'hello' });
//=> 'foo --foobar'

// Arrays
clsx(['foo', 0, false, 'bar']);
//=> 'foo bar'

// Arrays (variadic)
clsx(['foo'], ['', 0, false, 'bar'], [['baz', [['hello'], 'there']]]);
//=> 'foo bar baz hello there'

// Kitchen sink (with nesting)
clsx('foo', [1 && 'bar', { baz:false, bat:null }, ['hello', ['world']]], 'cya');
//=> 'foo bar hello world cya'
```

## 장점

이 clsx는 조건부 렌더를 작성하기 쉬워지는 장점을 제공해줍니다.

## TypeScript에서는?

```javascript
import { ClassValue, clsx } from 'clsx';
```
ClassValue 타입을 import해올 수 있습니다.
이 ClassValue에 대한 정의로 가보면 굉장히 심플한 타입을 갖고 있는 것을 볼 수 있습니다.

```jsx
export type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];

export declare function clsx(...inputs: ClassValue[]): string;
export default clsx;
```

대충 여러가지를 유니온타입으로 받을 수 있게 해두었는데
import해서 사용할 수 있게 제공을 해주네요!
대부분 유저들은 유틸함수화 시켜 사용하고 있답니다

```jsx
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

# tailwind-merge

[https://github.com/dcastil/tailwind-merge](https://github.com/dcastil/tailwind-merge)
[github.com](https://github.com/dcastil/tailwind-merge)

github는 다음 링크를 따라가면 확인하실 수 있습니다.
대체로 typescript를 이용하여 작성되었고
현재 포스트를 작성하는 시점에는 v.3.0 up to v3.3까지 지원이 되네요
(참고로 2023/05/20 기준 tailwindcss는 3.3~ version까지 나와있는 상태입니다.)
버전 지원도 잘 되고 있고

[https://www.npmjs.com/package/tailwind-merge](https://www.npmjs.com/package/tailwind-merge)
[tailwind-merge](https://www.npmjs.com/package/tailwind-merge)

npm을 확인해보면 주간 다운로드수가 30만 가까이 나오고 있네요
꽤 믿을만한 오픈소스 프로젝트로 보입니다.
사용법은 먼저 install을 하는것으로 시작됩니다.

    npm i tailwind-merge
    yarn add tailwind-merge

각자 사용하고 있는 패키지매니저에 맞는 명령어를 입력해주면 됩니다.
물론 tailwind를 사용하는 환경이어야 하겠죠?

* * *

[😙이거 왜 사용하면 좋은 것일까요?](https://xionwcfm.tistory.com/322#%F0%9F%98%99%EC%9D%B4%EA%B1%B0%20%EC%99%9C%20%EC%82%AC%EC%9A%A9%ED%95%98%EB%A9%B4%20%EC%A2%8B%EC%9D%80%20%EA%B2%83%EC%9D%BC%EA%B9%8C%EC%9A%94%3F-1)
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

tailwind-merge의 What is it for 문서를 읽어보면 다음과 같은 근거를 들어 설명합니다.

> React, Vue와 같은 컴포넌트 기반 라이브러리와 함께 tailwind css 를 사용하는 경우에는  
> 컴포넌트의 일부 스타일을 오직 한곳에서만 변경하고 싶은 상황에 익숙할 것입니다!

    // React components with JSX syntax used in this example
    
    function MyGenericInput(props) {
        const className = `border rounded px-2 py-1 ${props.className || ''}`
        return <input {...props} className={className} />
    }
    
    function MySlightlyModifiedInput(props) {
        return (
            <MyGenericInput
                {...props}
                className="p-3" // ← Only want to change some padding
            />
        )
    }

바로 이런 상황을 이야기합니다.

저도 실제로 tailwindcss를 사용하면서 많이 겪는 상황 중 하나인데

이미 MyGenericInput은 px-2, py-1을 가지고 있습니다.

className에 있는 순서는 하나도 중요하지않다는 것은 쉽게 알 수 있습니다.

[https://fe-developers.kakaoent.com/2022/220303-tailwind-tips/](https://fe-developers.kakaoent.com/2022/220303-tailwind-tips/)

혹시 이에대한 참고가 필요하신 분들은 위 링크를 참고하시기 바랍니다.

하여간 그런 탓에 위 예제에서 p-3를 props로 넘겨주었고

p-3가 적용되기를 기대하지만 css의 캐스케이딩 방식 때문에 적용되지 않습니다.

여기서 p-3스타일을 적용시키기 위해서는 px-2와 py-1을 제거해야만 합니다.

이러한 문제를 tailwind-merge가 해결해주는거에요!

    function MyGenericInput(props) {
        // ↓ Now `props.className` can override conflicting classes
        const className = twMerge('border rounded px-2 py-1', props.className)
        return <input {...props} className={className} />
    }

tailwind-merge가 제공하는 twMerge함수를 이용하면 다음과 같은 작성할 수 있습니다.

이렇게 기존 클래스와 충돌하게 되는 클래스를 tailwind-merge는 override를 수행해주고

우리가 기대한것처럼 p-3로 패딩값을 바꾸어서 렌더링합니다.

* * *

[Features](https://xionwcfm.tistory.com/322#Features-1)
-------------------------------------------------------

기본적으로 result는 캐싱되기 때문에 불필요한 리렌더링을 걱정하지 않아도 됩니다.

이 라이브러리는 내부적으로 LRU cache 알고리즘을 사용하고 있고

캐시 사이즈를 만약 수정하고 싶다면 extendTailwindMerge를 사용하면 됩니다.

캐시힛 없이 twMerge호출이 빠르게 유지될 수 있도록 비싼 계산은 upfront로 수행한다고하네요

이부분은 구현에 가까운 내용이니 일단은 이정도만 알고 넘어가도록 합시다.

이 tailwind-merge가 제공하는 강력한 기능은 다음과 같습니다.

실제로는 더 많은 기능을 제공해주고 있지만

당장 사용하고 싶은 사람의 입장에서 크게 눈에 띄는 기능은 이것입니다.

Last Conflicting Class Wins

이름에서 눈치 챌 수 있듯이 맨 마지막에 적용시킨 클래스가  
win , 적용된다는 뜻입니다.

나머지 기능들은 대부분 tailwindcss에서도 지원해주는 기능을 호환시켜주는 내용인데

맨 마지막에 적용시킨 클래스가 적용되는 기능이 아주 매력적이죠!

    twMerge('p-5 p-2 p-4') // → 'p-4'

이러한 tailwind-merge는 별도의 설정 없이 일반적으로 tailwind css를 사용하고 있는 경우에는

바로 사용할 수 있기 때문에 설치하고 import해서 바로 사용하면 끝입니다.

다만 이것저것 커스텀해서 사용하고 계신 경우에는

라이브러리에서 제공해주는 extendTailwindMerge 함수를 사용해야 할 수 있습니다.

이에 관해서는 공식문서를 참고해보시기 바랍니다.

주의사항으로는 tailwind-merge로 충분한 클래스에

**@apply 지시문을 사용하는 것이 추천되지 않는다는 것**입니다.

* * *

[실제 사용법](https://xionwcfm.tistory.com/322#%EC%8B%A4%EC%A0%9C%20%EC%82%AC%EC%9A%A9%EB%B2%95-1)
---------------------------------------------------------------------------------------------

    import { twMerge } from 'tailwind-merge'
    const className = twMerge('p-2 p-3 p-4')
    return <div className={className}>안녕하세요</div>

굉장히 간단합니다. 클래스 충돌 시병합을 도와주는 twMerge 이외에도

충돌을 해결하지 않으면서 조건부로 join을 하는 것을 도와주는 twJoin도 있습니다.

twJoin의 사용방법은 다음과 같습니다.

    twJoin(
        'border border-red-500',
        hasBackground && 'bg-red-100',
        hasLargeText && 'text-lg',
        hasLargeSpacing && ['p-2', hasLargeText ? 'leading-8' : 'leading-7'],
    )

twJoin도 굉장히 유용하게 사용할 수 있겠다는 생각이 들지 않나요?

저걸.. 하나하나 다 쌩 tailwind로 구현하려고하면 꽤나 귀찮아지지만

훨씬 읽기 쉽게 코드가 변한것을 알 수 있습니다.

* * *

[😐마치며](https://xionwcfm.tistory.com/322#%F0%9F%98%90%EB%A7%88%EC%B9%98%EB%A9%B0-1)
-----------------------------------------------------------------------------------

tailwindcss를 사용하면서 편하다는 생각이 있었지만

이 병합충돌 문제가 많이 불편하게 느껴졌었습니다.

이러한 문제를 해결할 수 있는 라이브러리를 찾아서 기분이 좋네요!

이후에 더 유용하게 tailwind merge를 사용하는 방법도 포스트하겠습니다.

1.  [참고사이트](https://xionwcfm.tistory.com/322)
2.  [참고사이트](https://xionwcfm.tistory.com/323)
3.  [참고사이트](https://xionwcfm.tistory.com/325)


