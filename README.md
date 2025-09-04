# @pittaofficial/pitta-graphic-assets

포괄적인 그래픽 에셋 컬렉션 - 이미지와 Lottie 애니메이션을 React 컴포넌트로 제공합니다.

## 📦 설치

```bash
npm install @pittaofficial/pitta-graphic-assets
```

## 🎨 제공 에셋

### 🖼️ 이미지 컴포넌트 (72개)
- **BlackVue 관련**: 대시캠, 센서, 배터리 이미지
- **Fleeta 관련**: 브랜드별 UI 이미지  
- **연결 상태**: WiFi, SIM, 클라우드 연결 그래픽
- **업로드 상태**: 다크/라이트 테마별 업로드 상태 이미지
- **해상도 지원**: @1x, @2x, @3x 고해상도 이미지

### ✨ Lottie 애니메이션 (50개)
- **WiFi 연결**: iOS/Android WiFi 상태 애니메이션
- **배터리**: 배터리 연결 및 충전 상태 (BlackVue/Fleeta)
- **로딩**: 스피너 및 로딩 애니메이션 (다크/라이트)
- **UI 피드백**: 성공, 실패, 진행 상태
- **브랜딩**: 로고 스플래시 및 프로모션 배너
- **센서**: 터치센서 및 원격 버튼 상태

## 🚀 사용법

### 이미지 컴포넌트 사용

```tsx
import React from 'react';
import { 
  BuildInSimImage, 
  DashCamBlacklistedImage,
  FleetadriveuploadlightImage 
} from '@pittaofficial/pitta-graphic-assets';

export const ImageExample = () => {
  return (
    <div>
      {/* 기본 사용 */}
      <BuildInSimImage width={200} height={150} />
      
      {/* 커스텀 CDN 및 lazy loading */}
      <DashCamBlacklistedImage 
        width={300} 
        height={200}
        lazy={false}
        onLoad={() => console.log('이미지 로드 완료')}
        cdnBase="https://your-cdn.com/assets/"
      />
      
      {/* 에러 처리 */}
      <FleetadriveuploadlightImage 
        placeholder={<div>로딩중...</div>}
        onError={() => console.log('로드 실패')}
      />
    </div>
  );
};
```

### Lottie 애니메이션 사용

```tsx
import React from 'react';
import { 
  SpinnerLight,
  AosWifiConnectDark, 
  BatteryConnectedDarkBlackvue,
  ConfettiParticles 
} from '@pittaofficial/pitta-graphic-assets';

export const LottieExample = () => {
  return (
    <div>
      {/* 기본 로딩 스피너 */}
      <SpinnerLight width={50} height={50} />
      
      {/* WiFi 연결 애니메이션 */}
      <AosWifiConnectDark 
        width={200} 
        height={200}
        loop={false}
        onComplete={() => console.log('연결 완료!')}
      />
      
      {/* 배터리 연결 상태 */}
      <BatteryConnectedDarkBlackvue 
        width={100} 
        height={100}
        autoplay={true}
      />
      
      {/* 일회성 축하 애니메이션 */}
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

## 🎛️ 컴포넌트 Props

### 이미지 컴포넌트 Props

```tsx
interface ImageProps {
  className?: string;           // CSS 클래스명
  width?: number | string;      // 너비
  height?: number | string;     // 높이
  alt?: string;                // 대체 텍스트
  style?: React.CSSProperties; // 인라인 스타일
  onClick?: () => void;        // 클릭 이벤트
  onLoad?: () => void;         // 로드 완료 콜백
  onError?: () => void;        // 로드 실패 콜백
  lazy?: boolean;              // 지연 로딩 (기본값: true)
  placeholder?: React.ReactNode; // 로딩 플레이스홀더
  cdnBase?: string;            // 커스텀 CDN 베이스 URL
}
```

### Lottie 컴포넌트 Props

```tsx
interface LottieProps {
  className?: string;           // CSS 클래스명
  width?: number | string;      // 너비 (기본값: '100%')
  height?: number | string;     // 높이 (기본값: '100%')
  loop?: boolean;              // 반복 재생 (기본값: true)
  autoplay?: boolean;          // 자동 재생 (기본값: true)
  onComplete?: () => void;     // 완료 콜백
  onLoopComplete?: () => void; // 루프 완료 콜백
  style?: React.CSSProperties; // 인라인 스타일
}
```

## 📋 사용 가능한 에셋

### 🖼️ 이미지 컴포넌트

#### SIM & 연결
- `BuildInSimImage`, `BuildInSim2xImage`, `BuildInSim3xImage`
- `Cm100glteImage`, `Cm100glte2xImage`, `Cm100glte3xImage`
- `WifiHotspotImage`, `WifiHotspot2xImage`, `WifiHotspot3xImage`

#### 연결 상태 그래픽
- `ConnectedGraphicImage` (다양한 해상도)
- `SimIccidImage345Image`, `SimiccidpositionImage`

#### 대시캠 상태
- `DashCamBlacklistedImage`, `DashCamFailedImage`
- `DashcamerablackvueImage` (다양한 해상도)

#### 업로드 상태
- `FleetadriveuploadlightImage`, `FleetadriveuploaddarkImage`
- `MydriveuploadlightImage`, `MydriveuploaddarkImage`
- `LiveeventuploadImage`, `LiveeventuploaddarkImage`

#### 센서 터치
- `SensortouchlightblackvueImage`, `SensortouchdarkblackvueImage`
- `SensortouchlightfleetaImage`, `SensortouchdarkfleetaImage`

### ✨ Lottie 애니메이션

#### WiFi 연결 (OS별)
- **Android**: `AosWifiConnectDark`, `AosWifiConnectLight`
- **iOS**: `IosWifiConnectDark`, `IosWifiConnectLight`
- **연결 해제**: `AosWifiDisconnectionDark`, `IosWifiDisconnectionDark`

#### 배터리 관련
- **BlackVue**: `BatteryConnectedDarkBlackvue`, `BatteryConnectedLightBlackvue`
- **Fleeta**: `BatteryConnectedDarkFleeta`, `BatteryConnectedLightFleeta`
- **온보딩**: `BatteryOnboardingDark`, `BatteryOnboardingLight`
- **원격 체크**: `RemoteBatteryCheckDark`, `RemoteBatteryCheckLight`

#### UI 요소
- **로딩**: `SpinnerDark`, `SpinnerLight`
- **성공**: `PaidComplete`, `ConfettiParticles`
- **브랜딩**: `LogoSplashDark`, `LogoSplashLight`

#### 센서 & 버튼
- **터치센서**: `TouchSensorsDarkBlackvue`, `TouchSensorsLightBlackvue`
- **원격버튼**: `RemoteButtonBeepDarkBlackvue`, `RemoteButtonBeepLightBlackvue`
- **회전 화살표**: `RotationArrowDarkBlackvue`, `RotationArrowLightBlackvue`

## 🤖 AI 개발자를 위한 가이드

### Lottie 파일 분석 방법

```javascript
// 1. 에셋 정보 가져오기
const lottieAssets = require('@pittaofficial/pitta-graphic-assets/assets/lottie');

// 2. 컴포넌트 메타데이터 분석
import { SpinnerLight } from '@pittaofficial/pitta-graphic-assets';
// - 동적 JSON 로딩 (fetch 기반)
// - 메모리 효율적 (JSON 인라인하지 않음)
// - 로딩 상태 UI 포함

// 3. 파일 구조 이해
// assets/lottie/*.json - 원본 Lottie JSON 파일
// components/lottie/*.tsx - React 컴포넌트 (동적 로딩)
```

### 커스터마이징 방법

```tsx
// 1. 커스텀 CDN 사용
<BuildInSimImage 
  cdnBase="https://your-cdn.com/assets/" 
  width={200} 
/>

// 2. 로딩 상태 커스터마이징
<SpinnerLight 
  onComplete={() => {
    // 애니메이션 완료 후 로직
  }}
/>

// 3. 에러 처리
<AnyImage 
  onError={() => {
    // 이미지 로드 실패 처리
  }}
  placeholder={<YourCustomLoader />}
/>
```

## 📁 프로젝트 구조

```
pitta-graphic-assets/
├── assets/
│   ├── images/          # 원본 이미지 파일 (72개)
│   └── lottie/          # 원본 Lottie JSON 파일 (50개)
├── components/
│   ├── images/          # 이미지 React 컴포넌트 (72개)
│   └── lottie/          # Lottie React 컴포넌트 (50개)
├── dist/                # 빌드된 패키지
├── scripts/             # 자동화 스크립트
│   ├── generate-optimized-lottie.js
│   ├── generate-image-components.js
│   └── update-exports.js
└── examples/            # 사용 예제
```

## 🛠️ 개발 & 빌드

```bash
# 의존성 설치
npm install

# Lottie 컴포넌트 재생성
npm run generate-lottie

# 이미지 컴포넌트 재생성  
npm run generate-images

# 전체 빌드
npm run build

# 개발 모드 (watch)
npm run dev
```

## 🔧 기술적 특징

### 🚀 성능 최적화
- **Lottie**: 동적 JSON 로딩으로 번들 크기 최소화
- **이미지**: CDN 기반 로딩 + lazy loading 지원
- **TypeScript**: 완전한 타입 안전성

### 📱 반응형 지원
- 다양한 해상도 이미지 (@1x, @2x, @3x)
- 다크/라이트 테마별 애니메이션
- 모바일 최적화된 로딩 전략

### 🎯 사용성
- 직관적인 컴포넌트 네이밍
- 일관된 Props 인터페이스
- 풍부한 콜백 및 이벤트 지원

## 🤝 기여하기

1. 저장소 포크
2. 기능 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'Add amazing feature'`)
4. 브랜치 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 생성

## 📄 라이선스

MIT 라이선스로 배포됩니다. [LICENSE](LICENSE) 파일 참조.

## 🙋‍♂️ 지원

문제나 기능 요청은 [GitHub Issues](https://github.com/kimdh-pittasoft/pitta-graphic-assets/issues)에 등록해주세요.

---

**버전**: 0.1.5  
**최종 업데이트**: 2024년  
**패키지 크기**: 최적화된 동적 로딩으로 경량화