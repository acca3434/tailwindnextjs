## 사용한 라이브러리

<div align="center">

| 라이브러리                      | 버전     | 라이브러리         | 버전     |
| ------------------------------- | -------- | ------------------ | -------- |
| @babel/core                     | ^7.22.11 | clsx               | ^2.0.0   |
| @babel/plugin-syntax-typescript | ^7.22.5  | eslint             | 8.47.0   |
| @babel/preset-env               | ^7.22.10 | eslint-config-next | 13.4.19  |
| @types/node                     | 20.5.6   | lucide-react       | ^0.268.0 |
| @types/react                    | 18.2.21  | next               | 13.4.19  |
| @types/react-dom                | 18.2.7   | postcss            | 8.4.28   |
| autoprefixer                    | 10.4.15  | react              | 18.2.0   |
| babel-jest                      | ^29.6.4  | react-dom          | 18.2.0   |
| babel-loader                    | ^9.1.3   | react-icons        | ^4.10.1  |
| babel-plugin-macros             | ^3.1.0   | tailwind-merge     | ^1.14.0  |
| babel-plugin-styled-components  | ^2.1.4   | tailwindcss        | 3.3.3    |
| babel-plugin-twin               | ^1.1.0   | twin.macro         | ^3.4.0   |

</div>

## Font 컨벤션

### 글씨체

`나눔스퀘어`와 `나눔고딕`사용

-   globals.css

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

-   next.config.js

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

## docs파일에 정리

-   pxr이란? [자세히보기](docs/pxr.md)

-   twin.macro 도입 [자세히보기](docs/twinmacro.md)

-   clsx & tailwind-merge [자세히보기](src/app/lib/README.md)

-   clsx & tailwind-merge을 활용한 버튼 예제 [자세히보기](src/components/buttons/README.md)

-   twin.macro & tailwind를 이용한 props 동적 할당 guide [자세히보기](docs/twinPropStylingGuide.md)

-   troubleShoot [자세히보기](docs/troubleshooting.md)
