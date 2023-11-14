**Linting in a Monorepo**

**모노레포에서의 린팅**

린팅(코드 검사)은 모노레포에서 까다로울 수 있습니다. 대부분의 작업 영역에는 린트가 필요한 코드가 있을 것이므로 가장 효율적인 린트 방법을 찾는 것은 어려울 수 있습니다.

이 가이드에서는 Turborepo의 강점에 중점을 둔 방법을 제안합니다:

1. 루트가 아닌 작업 영역 내에서 린트 작업 실행
2. 작업 영역 간에 가능한 많은 구성 공유

**작업 실행**

turborepo.json에 하나의 린트 작업을 지정하는 것을 권장합니다.

```json
// turborepo.json
{
    "pipeline": {
        "lint": {}
    }
}
```

그런 다음 린트가 필요한 각 작업 영역 내에서 린트 스크립트를 추가하세요. TypeScript을 예로 들어보겠습니다.

```json
// packages/*/package.json
{
    "scripts": {
        "lint": "tsc"
    }
}
```

이 패턴에는 두 가지 이점이 있습니다:

1. **병렬화:** 린트 작업은 병렬로 실행되어 속도를 높일 수 있습니다.
2. **캐싱:** 린트 작업은 변경된 작업 영역에 대해서만 다시 실행됩니다.

이는 다음 명령을 사용하여 전체 리포지토리를 린트할 수 있음을 의미합니다:

```bash
turbo run lint
```

**설정 파일 공유**

모노레포 전체에서 구성을 공유하면 개발 환경을 일관되게 유지할 수 있습니다. 대부분의 린터는 다른 파일 간에 구성을 공유하거나 구성을 확장하는 시스템을 가지고 있을 것입니다.

지금까지 TypeScript 및 ESLint에 대한 구성 공유를 위한 가이드를 작성했습니다.

-   [TypeScript](https://www.turbo.dev/guides/sharing-config/typescript)
-   [ESLint](https://www.turbo.dev/guides/sharing-config/eslint)

마지막 업데이트: 2023년 1월 11일
