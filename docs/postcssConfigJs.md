### 개요

사실...꽤 오래된 코드라 왜 이렇게 설정했는지 모르겠음

나중에 제대로 R&D해야겠음

> 전체 코드

```javascript
module.exports = {
    plugins: [
        'tailwindcss',
        ...(process.env.NODE_ENV === 'production'
            ? [
                  [
                      '@fullhuman/postcss-purgecss',
                      {
                          content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
                          defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
                      },
                  ],
              ]
            : []),
        'postcss-preset-env',
    ],
}
```

> 이 소스 코드중 얘네가 이상함

```javascript
        [
            '@fullhuman/postcss-purgecss',
            {
                content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
                defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
            },
        ],
```

-   왜 얘네를 사용하려고 했지??

> @fullhuman/postcss-purgecss란?

fullhuman/postcss-purgecss는 PostCSS를 사용하여 CSS 파일을 최적화하는 도구 중 하나입니다.  
이 라이브러리는 사용되지 않는 CSS 스타일을 자동으로 제거하여 웹 페이지의 로딩 속도를 향상시키고 파일 크기를 줄이는 데 도움을 줍니다.  
주로 웹 개발자와 웹 디자이너들이 웹 애플리케이션의 성능을 최적화하는 데 사용합니다.

fullhuman/postcss-purgecss는 PurgeCSS를 PostCSS 플러그인으로 사용하며, PurgeCSS는 웹 페이지에서 사용되지 않는 CSS 클래스와 스타일을 탐지하고 제거하는 기능을 제공합니다.  
이는 프로덕션 환경에서 사용되는 웹 페이지의 CSS 파일 크기를 줄여 불필요한 데이터 전송을 방지하고 웹 페이지의 로딩 속도를 향상시킬 수 있습니다.  
따라서, 이 라이브러리를 사용하면 불필요한 CSS 코드를 자동으로 정리하여 더 효율적인 웹 페이지를 구축할 수 있습니다.

> CSS사용 파일 사용 안하니까 삭제해도 되겠지?

-   build에러 터짐

### 이슈 발생

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

여기에서 에러가 발생함.  
css를 사용하지는 않지만, 최적화나 그 외 설정들에 사용하는 문구이다.  
일단 에러가 터지지 않으니 놔두겠다.  
나중에 R&D해야됌

> 다음 코드는 무엇인가?

```javascript

    content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],

```

@fullhuman/postcss-purgecss에서 나오는 이 부분은 CSS 파일에서 사용된 클래스를 식별하고 불필요한 클래스를 제거하기 위한 설정입니다. 이 설정은 defaultExtractor 및 content로 구성됩니다.  
각 부분에 대한 설명은 다음과 같습니다:

content: 이 부분은 어떤 파일들에서 CSS 클래스가 사용될 것인지를 나타냅니다. 이것은 glob 패턴을 사용하여 파일을 지정합니다.  
위의 설정에서는 ./pages/**/\*.{js,jsx,ts,tsx} 및 ./components/**/\*.{js,jsx,ts,tsx}과 같은 파일 패턴을 사용하고 있습니다.  
이 파일 패턴은 프로젝트 내의 페이지 및 컴포넌트 디렉토리에 포함된 JavaScript 및 TypeScript 파일을 대상으로 합니다.  
즉, 이 설정은 이러한 파일에서 사용된 CSS 클래스만 추출하려고 합니다.

defaultExtractor: 이 부분은 CSS 파일에서 클래스를 추출하는 함수를 정의합니다. defaultExtractor는 정규식을 사용하여 CSS 클래스를 식별하고 반환합니다.  
기본값은 /[\w-/:]+(?<!:)/g이며, 이 정규식은 보편적인 CSS 클래스 이름을 찾아냅니다. 만약 다른 클래스 패턴이 사용된다면 이 부분을 사용자 정의로 수정할 수 있습니다.

-   [공식 문서](https://purgecss.com/guides/next.html)
-   [예제](https://snyk.io/advisor/npm-package/@fullhuman/postcss-purgecss/example)
