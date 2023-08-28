# tailwindnextjs

## eslint

Next.js, React 및 TypeScript를 사용하는 프로젝트를 위해 구성

1.  "extends": 이 부분은 프로젝트의 설정이 확장하는 ESLint 구성 목록을 지정합니다. 이 경우 다음 구성을 확장하고 있습니다:
2.  "next/core-web-vitals": 아마도 Next.js와 웹 화면의 사용자 경험을 측정하는 웹 화면 지표에 관련된 규칙들을 포함하고 있을 것입니다.
    - "plugin:react/recommended": React에 대한 권장 ESLint 규칙으로 React 개발의 모범 사례를 적용합니다.
    - "plugin:@typescript-eslint/recommended": TypeScript에 대한 권장 ESLint 규칙으로 TypeScript 개발의 모범 사례를 적용합니다.
    - "prettier": 코드 서식을 일관된 스타일로 포맷팅하는 코드 서식 도구인 Prettier를 통합합니다.
3.  "overrides": 이 부분은 특정 파일 패턴이나 환경에 대한 구성 재정의를 정의할 수 있게 해줍니다. 여기에서는 제공된 스니펫에선 비어 있습니다.
4.  "parser": 코드를 구문 분석하는 데 사용하는 파서를 지정합니다. 이 경우 "@typescript-eslint/parser"로 TypeScript 코드를 파싱하는 파서를 사용하고 있습니다.
5.  "parserOptions": 파서의 구성 옵션입니다.
    - "ecmaVersion": "latest": 이는 파싱에 사용할 ECMAScript 버전을 지정합니다. "latest"는 최신 ECMAScript 버전을 사용하라는 것을 나타냅니다.
    - "sourceType": "module": 코드를 모듈로 파싱해야 함을 나타냅니다.
6.  "plugins": 이 부분은 추가 규칙과 기능을 제공하는 ESLint 플러그인 목록을 나열합니다. 여기에서는 "react"와 @typescript-eslint 플러그인을 사용하고 있습니다.
7.  "rules": 이 부분은 특정 ESLint 규칙과 그 구성을 지정하는 곳입니다. 현재 비어 있으므로 확장된 구성에서 제공하는 규칙 외에 추가 규칙을 강제로 적용하고 있지 않습니다.

## prettier

1.  "printWidth": 100: 한 줄의 최대 길이를 100으로 설정합니다. 코드가 이 길이를 초과하면 Prettier는 줄 바꿈을 추가하여 코드를 여러 줄에 나눕니다.
2.  "singleQuote": true: 작은따옴표(')를 사용하도록 설정합니다. 이 설정을 true로 하면 문자열을 작은따옴표로 감싸게 됩니다.
3.  "trailingComma": "all": 후행 쉼표를 모든 가능한 위치에 추가하도록 설정합니다. 후행 쉼표를 사용하면 배열이나 객체의 마지막 요소 뒤에 쉼표를 붙일 수 있습니다.
4.  "tabWidth": 2: 탭 문자를 2칸으로 설정합니다. 코드를 들여쓸 때 탭 대신에 스페이스 2개를 사용하게 됩니다.
5.  "bracketSameLine": true: 객체나 배열 리터럴의 여는 중괄호({ 또는 \[)를 같은 줄에 위치시키도록 설정합니다. 이 설정을 true로 하면 중괄호를 여는 라인과 그 다음의 내용이 같은 줄에 위치하게 됩니다.

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

[Title](docs/pxr.md)

### twin.macro 도입

[Title](docs/twinmacro.md)

