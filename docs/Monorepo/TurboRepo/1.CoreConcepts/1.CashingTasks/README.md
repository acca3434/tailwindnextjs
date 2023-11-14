**캐싱 작업**

JavaScript 또는 TypeScript 코드베이스는 모두 build, test 및 lint와 같은 package.json 스크립트를 실행해야 합니다. Turborepo에서는 이러한 것들을 작업이라고 부릅니다.

Turborepo는 작업의 결과 및 로그를 캐시할 수 있으며 이로 인해 느린 작업에 대한 엄청난 가속이 가능합니다.

**캐시 누락**

코드베이스의 각 작업에는 입력과 출력이 있습니다.

-   빌드 작업은 입력으로 소스 파일을 가지고 stderr 및 stdout에 로그를 출력하며 번들 파일을 출력합니다.
-   lint 또는 test 작업은 입력으로 소스 파일을 가지고 stderr 및 stdout에 로그를 출력합니다.

예를 들어 Turborepo를 사용하여 `turbo run build`로 빌드 작업을 실행한다고 가정해 봅시다.

<img src="https://turbo.build/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcache-miss.21d45e92.png&w=3840&q=75"/>

1. Turborepo는 작업에 대한 입력을 평가하고 해당 입력을 해시로 변환합니다(예: 78awdk123).

2. 지정된 해시에 해당하는 캐시 아티팩트를 로컬 파일 시스템 캐시에서 찾습니다(예: ../node_modules/.cache/turbo/78awdk123.tar.zst).

3. Turborepo가 계산된 해시에 대한 일치하는 아티팩트를 찾지 못하면 Turborepo는 작업을 실행합니다.

4. 작업이 성공적으로 완료되면 Turborepo는 모든 지정된 출력(파일 및 로그 포함)을 새로운 캐시 아티팩트에 저장합니다. 이는 해시로 주소 지정됩니다.

Turborepo는 해시를 생성할 때 종속성 그래프, 의존하는 작업, 소스 파일, 환경 변수 등 많은 정보를 고려합니다.

**캐시 사용**

이제 입력을 변경하지 않고 작업을 다시 실행한다고 가정해 봅시다.

<img src="https://turbo.build/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcache-hit.3bac1eb9.png&w=3840&q=75"/>

1. 입력이 변경되지 않았기 때문에 해시는 동일할 것입니다(예: 78awdk123).

2. Turborepo는 일치하는 해시를 가진 캐시 아티팩트를 찾을 것입니다(예: ./node_modules/.cache/turbo/78awdk123.tar.zst).

3. 작업을 실행하는 대신 Turborepo는 저장된 로그를 stdout에 인쇄하고 저장된 출력 파일을 파일 시스템의 해당 위치로 복원합니다.

파일 및 로그를 캐시에서 복원하는 것은 거의 즉각적으로 발생합니다. 이로 인해 빌드 시간이 분 또는 시간에서 초 또는 밀리초로 줄어들 수 있습니다. 특정 결과는 코드베이스의 종속성 그래프의 모양과 세분성에 따라 다를 수 있지만 대부분의 팀은 Turborepo의 캐싱으로 전반적인 월간 빌드 시간을 약 40-85% 정도 줄일 수 있다는 것을 발견합니다.

**캐싱 비활성화**

일부 환경에서는 캐시 출력을 작성하지 않으려는 경우 `--no-cache`를 명령어에 추가하면 됩니다. 예를 들어, 다음 명령어는 dev(및 그에 의존하는 모든 작업)를 모든 워크스페이스에서 실행하지만 출력을 캐시하지 않습니다.

```bash
turbo run dev --no-cache
```

참고로 `--no-cache`는 캐시 쓰기를 비활성화하지만 캐시 읽기를 비활성화하지 않습니다. 캐시 읽기를 비활성화하려면 `--force` 플래그를 사용하십시오.

또한 특정 작업이 캐시 쓰기를 건너뛰도록 하려면 `pipeline.<task>.cache` 구성을 `false`로 설정하면 됩니다.

```json
{
    "$schema": "https://turbo.build/schema.json",
    "pipeline": {
        "dev": {
            "cache": false,
            "persistent": true
        }
    }
}
```

**캐시 강제 덮어쓰기**

반대로 캐시 읽기를 비활성화하고 이전에 캐시된 작업을 강제로 다시 실행하려면 `--force` 플래그를 추가하십시오.

```bash
# 모든 워크스페이스에서 `build` npm 스크립트를 캐시를 무시하고 다시 실행합니다.
turbo run build --force
```

`--force`는 캐시 읽기를 비활성화하지만 캐시 쓰기를 비활성화하지는 않습니다. 캐시 쓰기를 비활성화하려면 `--no-cache` 플래그를 사용하십시오.

**로그**

turborepo는 작업의 출력뿐만 아니라 터미널 출력(즉, stderr와 stdout의 결합)을 기록하여 (`<package>/.turbo/run-<command>.log`)합니다. turborepo는 캐시된 작업을 만날 때 저장된 로그를 사용하여 패키지 이름을 약간 어둡게 조정하여 이전에 기록된 로그를 즉시 재생합니다.

**해싱**

이제 아마도 turborepo가 주어진 작업에 대한 캐시 히트 및 미스를 어떻게 결정하는지 궁금할 것입니다. 좋은 질문입니다!

먼저 turborepo는 코드베이스의 현재 전역 상태의 해시를 구성합니다. 이에는 다음과 같은 것들이 포함됩니다.

-   globalDependencies의 glob 패턴을 충족하는 파일의 내용의 해시
-   globalEnv에서 나열된 환경 변수의 값
-   turbo.json, package.json 및 lockfile에서 선택한 정보
-   등등

그런 다음 작업을 위해 특정 작업의 경우에 관련된 더 많은 요소를 추가합니다.

-   워크스페이스 폴더의 모든 버전 컨트롤 파일 내용의 해시(또는 구성된 입력 glob과 일치하는 파일)
-   pipeline에서 구성된 출력
-   모든 설치된 종속성, devDependencies 및 optionalDependencies의 해결된 버전 세트
-   워크스페이스 작업의 이름
-   `pipeline.<task>.env` 목록에서 구성된 환경 변수 키-값 쌍의 정렬된 목록
-   등등

한 번 turborepo가 실행 중인 작업에서 특정 작업을 만나면 계산된 해시와 일치하는 캐시(로컬 및 원격 모두)를 확인합니다. 일치하는 경우 해당 작업을 실행하지 않고 캐시된 출력을 이동하거나 다운로드하여 저장된 로그를 즉시 재생합니다. 계산된 해시에 대한 로컬 또는 원격 캐시에 (로컬이나 원격 모두) 일치하는 것이 없으면 turborepo는 해당 작업을 로컬에서 실행하고 지정된 출력을 캐시에 저장합니다.

주어진 작업의 해시는 실행 시간에 해당 작업에 대한 환경 변수 `TURBO_HASH`로 사용할 수 있습니다. 이 값은 출력을 돌리거나 Dockerfile에 태그를 지정하는 데 유용할 수 있습니다.
