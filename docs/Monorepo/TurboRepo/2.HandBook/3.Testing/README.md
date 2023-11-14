**Testing in a Monorepo**

테스트는 프로덕션에 준비된 모노레포의 중요한 부분입니다. 엔드 투 엔드 테스트 또는 유닛 테스트 스위트를 사용하더라도 Turborepo와 통합하면 엄청난 속도 향상을 기대할 수 있습니다.

**테스트 러너와 함께 작업하기**

다음과 같은 구조의 모노레포가 있다고 가정해 봅시다.

```plaintext
├── apps
│   └── web
│       └── package.json
└── packages
    └── shared
        └── package.json
```

apps/web과 packages/shared는 각각 자체 테스트 스위트를 가지고 있습니다. 그들의 package.json 파일은 다음과 같습니다.

**apps/web/package.json**

```json
{
    "scripts": {
        "test": "jest"
    }
}
```

루트 turbo.json 내에서 파이프라인에 테스트 작업을 설정하는 것이 좋습니다.

**turbo.json**

```json
{
    "pipeline": {
        "test": {}
    }
}
```

이제 turbo test를 실행하여 Turborepo가 전체 저장소에 대한 테스트를 수행할 수 있습니다.

Turborepo의 캐싱 덕분에 변경된 파일만 테스트되므로 시간을 아낄 수 있습니다.

**감시 모드(Watch Mode)에서 테스트 실행**

테스트 스위트를 일반적으로 실행하면 완료되고 stdout에 출력됩니다. 이는 Turborepo와 함께 캐시할 수 있음을 의미합니다.

그러나 감시 모드에서 테스트를 실행하면 프로세스가 종료되지 않습니다. 이는 감시 작업이 개발 작업과 더 유사하게 만듭니다.

이 차이 때문에 테스트를 실행하는 두 가지 별도의 Turborepo 작업을 지정하는 것이 좋습니다. 하나는 테스트를 실행하고 다른 하나는 감시 모드에서 테스트를 실행하는 것입니다.

예를 들면 다음과 같습니다.

**apps/web/package.json**

```json
{
    "scripts": {
        "test": "jest",
        "test:watch": "jest --watch"
    }
}
```

**turbo.json**

```json
{
    "pipeline": {
        "test": {},
        "test:watch": {
            "cache": false
        }
    }
}
```

**package.json**

```json
{
    "scripts": {
        "test": "turbo run test",
        "test:watch": "turbo run test:watch"
    }
}
```

**마지막 업데이트: 2023년 8월 30일**
