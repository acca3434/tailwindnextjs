**문제 해결**

패키지 버전이 일치하지 않는 경우 처리

모노레포가 커질수록 서로 다른 워크스페이스에서 다른 버전의 패키지를 가질 수 있습니다.

예를 들어, app은 react@18.0.0을 사용할 수 있지만 web은 react@17.0.0을 사용할 수 있습니다. 특히 멀티 레포 설정에서 마이그레이션한 경우에 이러한 문제가 발생할 수 있습니다.

다른 리포지토리에서 불일치하는 종속성은 코드가 예상치 못하게 실행되는 경우가 있습니다. 예를 들어 둘 이상의 버전이 설치된 경우 React에서 오류가 발생할 수 있습니다.

**@manypkg/cli**

이 문제를 처리하는 권장 방법은 [@manypkg/cli](https://www.npmjs.com/package/@manypkg/cli)를 사용하는 것입니다. 이 CLI는 리포지토리 전체에서 종속성이 일치하는지 확인할 수 있습니다.

다음은 빠른 예제입니다. package.json의 루트에 postinstall 스크립트를 추가하십시오.

```json
{
    "scripts": {
        // 각 설치 후 종속성이 일치하는지 확인합니다.
        "postinstall": "manypkg check"
    },
    "dependencies": {
        // @manypkg/cli를 설치하는지 확인합니다.
        "@manypkg/cli": "latest"
    }
}
```

또한 manypkg fix를 실행하여 리포지토리 전체에서 자동으로 업데이트할 수 있습니다.
