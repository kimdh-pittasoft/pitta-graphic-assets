# @pittaofficial/pitta-graphic-assets

포괄적인 그래픽 에셋 컬렉션 - SVG 아이콘, 이미지, 로티 애니메이션을 React 컴포넌트로 제공합니다.

## 📦 설치

```bash
npm install @pittaofficial/pitta-graphic-assets
```

## 🎨 제공 에셋

### SVG 아이콘 (249개)
- **Background**: 배경 및 레이아웃 아이콘
- **Brand**: 브랜드 특화 아이콘 
- **Duo**: 듀얼 컬러 아이콘
- **Mono**: 단색 아이콘

### 로티 애니메이션 (50개)
- **WiFi 연결**: 다양한 WiFi 상태 애니메이션
- **배터리**: 배터리 연결 및 충전 상태
- **로딩**: 스피너 및 로딩 애니메이션
- **UI 피드백**: 성공, 실패, 진행 상태
- **브랜딩**: 로고 및 스플래시 애니메이션

## 🚀 사용법

### SVG 아이콘 사용

```tsx
import React from 'react';
import { AddIcon, UserIcon, SettingsIcon } from '@pittaofficial/pitta-graphic-assets';

export const MyComponent = () => {
  return (
    <div>
      <AddIcon width={24} height={24} />
      <UserIcon className="user-icon" />
      <SettingsIcon style={{ color: '#007bff' }} />
    </div>
  );
};
```

### 로티 애니메이션 사용

```tsx
import React from 'react';
import { 
  AosWifiConnectDark, 
  SpinnerLight, 
  ConfettiParticles 
} from '@pittaofficial/pitta-graphic-assets';

export const AnimationExample = () => {
  return (
    <div>
      {/* 기본 사용 */}
      <AosWifiConnectDark width={200} height={200} />
      
      {/* 커스텀 옵션 */}
      <SpinnerLight 
        width={100} 
        height={100}
        speed={1.5}
        loop={true}
        onComplete={() => console.log('완료!')}
      />
      
      {/* 일회성 애니메이션 */}
      <ConfettiParticles 
        width={300} 
        height={200}
        loop={false}
        autoplay={true}
      />
    </div>
  );
};
```

## 🎛️ 로티 컴포넌트 Props

모든 로티 컴포넌트는 다음 공통 props를 지원합니다:

```tsx
interface LottieProps {
  className?: string;           // CSS 클래스명
  width?: number | string;      // 너비 (기본값: '100%')
  height?: number | string;     // 높이 (기본값: '100%')
  loop?: boolean;              // 반복 재생 (기본값: true)
  autoplay?: boolean;          // 자동 재생 (기본값: true)
  speed?: number;              // 재생 속도 (기본값: 1)
  direction?: 1 | -1;          // 재생 방향 (기본값: 1)
  onComplete?: () => void;     // 완료 콜백
  onLoopComplete?: () => void; // 루프 완료 콜백
  style?: React.CSSProperties; // 인라인 스타일
}
```

## 📋 사용 가능한 로티 애니메이션

### WiFi & 연결
- `AosWifiConnectDark` / `AosWifiConnectLight`
- `AosWifiDisconnectionDark` / `AosWifiDisconnectionLight`
- `IosWifiConnectDark` / `IosWifiConnectLight`
- `IosWifiDisconnectionDark` / `IosWifiDisconnectionLight`

### 배터리
- `BatteryConnectedDarkBlackvue` / `BatteryConnectedLightBlackvue`
- `BatteryConnectedDarkFleeta` / `BatteryConnectedLightFleeta`
- `BatteryOnboardingDark` / `BatteryOnboardingLight`
- `RemoteBatteryCheckDark` / `RemoteBatteryCheckLight`

### UI 요소
- `SpinnerDark` / `SpinnerLight`
- `ConfettiParticles`
- `PaidComplete`
- `VoiceCallPopup`

### 브랜딩
- `LogoSplashDark` / `LogoSplashLight`
- `SmartPromoBanner`

### 기타
- `CameraProfileChange`
- `CloudUploadingLight`
- `FotaArrowDark` / `FotaArrowLight`
- `PlayPreloadBlackvue` / `PlayPreloadFleeta`
- `RotationArrowDarkBlackvue` / `RotationArrowLightBlackvue`

*전체 목록은 [여기](#)에서 확인하세요.*

## 🛠️ 개발

```bash
# 의존성 설치
npm install

# 로티 컴포넌트 생성
npm run generate-lottie

# 빌드
npm run build

# 개발 모드
npm run dev
```

## 📁 프로젝트 구조

```
pitta-graphic-assets/
├── assets/
│   ├── images/          # 이미지 에셋
│   └── lottie/          # 로티 JSON 파일
├── components/
│   ├── images/          # 이미지 React 컴포넌트
│   └── lottie/          # 로티 React 컴포넌트
├── icons/               # SVG 아이콘 컴포넌트
├── icon-svg/            # 원본 SVG 파일
├── scripts/             # 빌드 스크립트
└── examples/            # 사용 예제
```

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📄 라이선스

MIT 라이선스로 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙋‍♂️ 지원

문제가 있거나 기능 요청이 있다면 [Issues](https://github.com/kimdh-pittasoft/pitta-icon-assets/issues)에 등록해주세요.