# 모노레포

## Turborepo에서의 모노레포

### 문제

<img src="https://turbo.build/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fwhy-turborepo-problem.863cb824.png&w=3840&q=75"/>

모노레포는 많은 이점을 가지고 있지만 확장하기 어려울 수 있습니다. 각 워크스페이스는 고유한 테스트 스위트, 고유한 린팅 및 고유한 빌드 프로세스를 가지고 있습니다. 단일 모노레포에는 수백 개의 실행해야 할 작업이 있을 수 있습니다.

<img src="https://turbo.build/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fwhy-turborepo-solution.a980f9ae.png&w=3840&q=75"/>

### 해결책

Turborepo는 모노레포의 확장성 문제를 해결합니다. 원격 캐시는 모든 작업의 결과를 저장하므로 CI가 동일한 작업을 두 번 수행할 필요가 없습니다.

모노레포에서 작업 스케줄링은 어려울 수 있습니다. 예를 들어 yarn build가 모든 워크스페이스에서 yarn test보다 먼저 실행되어야 하는 경우를 상상해보세요. Turborepo는 모든 사용 가능한 코어를 효과적으로 활용하여 최대 속도로 작업을 예약할 수 있습니다.

Turborepo는 점진적으로 적용될 수 있습니다. 이미 작성한 package.json 스크립트, 이미 선언한 종속성 및 단일 turbo.json 파일을 사용합니다. npm, yarn 또는 pnpm과 같은 모든 패키지 매니저와 함께 사용할 수 있으며 몇 분 안에 모든 모노레포에 추가할 수 있습니다.

### Turborepo가 아닌 것

Turborepo는 패키지 설치를 처리하지 않습니다. 이미 뛰어난 npm, pnpm 또는 yarn과 같은 도구들이 그 역할을 훌륭히 수행합니다. 그러나 이러한 도구들은 작업을 비효율적으로 실행하여 느린 CI 빌드를 유발할 수 있습니다.

Turborepo는 작업을 실행하고 선호하는 패키지 매니저가 패키지를 설치하도록 권장합니다.
