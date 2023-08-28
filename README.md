# tailwindnextjs

## 사용한 라이브러리(굵직한)

1.  Next.js 13
2.  Tailwind
3.  twin.macro
4.  styled-components
5.  clsx
6.  tailwind-merge

## Font 컨벤션

### 글씨체

`나눔스퀘어`와 `나눔고딕`사용
globals.css

```css
@font-face {
    font-family: 'NanumGothic';
    src: url('http://fonts.googleapis.com/earlyaccess/nanumgothic.css') format('css');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'NanumSquare';
    src: url('https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@2.0/nanumsquare.css') format('css');
    font-weight: normal;
    font-style: normal;
}
```

### fontWeight 및 pxr 설정

```javascript
        fontFamily: {
            NanumGothic: ['NanumGothic'],
            NanumSquare: ['NanumSquare'],
        },
        fontWeight: {
            tiny: '200',
            normal: '400',
            bold: '800',
        },
```

### pxr이란?

[pxr](docs/pxr.md)

### twin.macro 도입

[twin.macro](docs/twinmacro.md)

### clsx & tailwind-merge

[clsx & tailwind-merge](src/app/lib/utils.ts)

### clsx & tailwind-merge을 활용한 버튼 예제

[button](src/components/buttons/README.md)

### twin.macro & tailwind를 이용한 props 동적 할당 guide

[props 동적 할당](docs/twinPropStylingGuide.md)

### troubleShoot

[troubleShoot](docs/troubleshooting.md)
