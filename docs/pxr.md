# 새로운 단위 정의하기

대부분의 브라우저는 디폴트 폰트 사이즈로 16px의 폰트 크기를 가지지만, 브라우저의 접근성 설정에서 디폴트 폰트 크기를 바꿀 수 있는 기능을 제공합니다.
하지만 유저가 웹사이트의 글씨를 더 크게 보고 싶어서 이 설정을 조정한다고 해도 웹사이트의 모든 단위가 px로 설정되어 있다면 아무것도 바뀌지 않게 됩니다.
디폴트 폰트 사이즈가 변경된다고 해서 우리가 직접 요소들에 넣어준 px 크기가 변경되지 않기 때문입니다.

카카오팀에서 집중했던 부분은 rem입니다. rem은 최상위 엘리먼트(html)에 지정된 폰트 사이즈를 기준으로 크기가 결정되는데
최상위 엘리먼트에 폰트 사이즈를 임의로 명시하지 않으면 브라우저 기본값 (보통 16px)을 기준으로 크기가 결정됩니다.
(1rem = 16px). rem을 사용한다면 유저가 브라우저 설정의 ‘접근성’ 기능을 통해 디폴트 텍스트 크기를 조정했을 때
그에 따라 rem의 크기도 함께 변경되기 때문에 유저가 의도한 동작을 지원할 수 있게 됩니다.

카카오 팀은 `pxr`이라는 새로운 단위를 만들어 도입.
이 pxr 단위를 사용하면 디자인에 명시된 px 값을 그대로 사용할 수 있으며
(16pxr = 16px), 실제 페이지에는 rem 단위로 치환되어 적용되게 됩니다 (16pxr = 1rem).

```javascript
// tailwind.config.js

const pxToRem = (px, base = 16) => `${px / base}rem`;

module.export = {
  ...
  theme: {
    ...
    spacing: {
      ...range(1, 100).reduce((acc, px) => {
        acc[`${px}pxr`] = pxToRem(px);
        return acc;
      }, {}),
    }
  }
}
```

우린 카카오팀에서 만든 pxr의 설정을 조금 바꾸어 변경하였습니다.

```javascript
const pxToRem = (px, base = 16) => `${px / base}rem`
const range = (start, end) => Array.from({ length: end - start + 1 }, (_, index) => index + start)
const getPxr = (end) => range(1, end).map((_, i) => pxToRem(i))
const pxr10 = getPxr(10)
const pxr100 = getPxr(100)
const pxr200 = getPxr(200)
const pxr500 = getPxr(500)

(...)

        extend: {
            spacing: pxr500,
            fontSize: pxr100,
            borderWidth: pxr10,
            lineHeight: pxr100,
            minWidth: pxr200,
            minHeight: pxr100,
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [require('flowbite/plugin')],
}
export default config
```

자세한 내용은 다음 출처를 확인하세요.

[FE개발그룹에서는 Tailwind CSS를 왜 도입했고, 어떻게 사용했을까?](https://fe-developers.kakaoent.com/2022/221013-tailwind-and-design-system/)
