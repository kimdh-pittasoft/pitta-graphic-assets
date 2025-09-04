# AI Developer Guide for Pitta Graphic Assets

AI 개발자가 `@pittaofficial/pitta-graphic-assets` 패키지를 효과적으로 활용할 수 있도록 하는 가이드입니다.

## 🤖 AI를 위한 패키지 구조 이해

### 📁 디렉토리 구조

```
@pittaofficial/pitta-graphic-assets/
├── assets/
│   ├── images/          # 원본 이미지 파일 (72개)
│   └── lottie/          # 원본 Lottie JSON 파일 (50개)
├── components/
│   ├── images/          # 생성된 이미지 React 컴포넌트 (72개)
│   └── lottie/          # 생성된 Lottie React 컴포넌트 (50개)
└── docs/
    ├── lottie-metadata.json    # Lottie 파일 메타데이터
    ├── lottie-catalog.md       # 카탈로그 문서
    └── ai-developer-guide.md   # 이 가이드
```

### 🎯 컴포넌트 네이밍 규칙

#### 이미지 컴포넌트
- **패턴**: `{DescriptiveName}Image`
- **예시**: `BuildInSimImage`, `ConnectedGraphicImage`
- **해상도별**: `BuildInSim2xImage`, `BuildInSim3xImage`

#### Lottie 컴포넌트  
- **패턴**: `{DescriptiveName}` (접미사 없음)
- **예시**: `SpinnerLight`, `AosWifiConnectDark`
- **테마별**: `{Name}Dark`, `{Name}Light`
- **브랜드별**: `{Name}Blackvue`, `{Name}Fleeta`

## 🔍 Lottie 애니메이션 분석 및 활용

### 메타데이터 활용

```javascript
// 1. 전체 메타데이터 로드
const metadata = require('@pittaofficial/pitta-graphic-assets/docs/lottie-metadata.json');

// 2. 카테고리별 필터링
const connectivityAnimations = metadata.files.filter(f => f.category === 'connectivity');
const loadingAnimations = metadata.files.filter(f => f.category === 'loading');

// 3. 테마별 필터링
const darkThemeAnimations = metadata.files.filter(f => f.theme === 'dark');
const lightThemeAnimations = metadata.files.filter(f => f.theme === 'light');

// 4. 성능별 필터링
const simpleAnimations = metadata.files.filter(f => f.complexity === 'low');
const complexAnimations = metadata.files.filter(f => f.complexity === 'high');
```

### 카테고리별 사용 사례

#### 🌐 Connectivity (8개)
**목적**: WiFi, 네트워크 연결 상태 표시

```tsx
import { AosWifiConnectDark, IosWifiConnectLight } from '@pittaofficial/pitta-graphic-assets';

// Android WiFi 연결 (다크 테마)
<AosWifiConnectDark width={100} height={100} loop={false} />

// iOS WiFi 연결 (라이트 테마)  
<IosWifiConnectLight width={100} height={100} onComplete={() => console.log('연결 완료')} />
```

#### 🔋 Power (8개)
**목적**: 배터리, 전원 관련 상태

```tsx
import { BatteryConnectedDarkBlackvue, BatteryOnboardingLight } from '@pittaofficial/pitta-graphic-assets';

// BlackVue 브랜드 배터리 연결 (다크)
<BatteryConnectedDarkBlackvue width={120} height={120} />

// 배터리 온보딩 (라이트 테마)
<BatteryOnboardingLight width={200} height={150} loop={true} />
```

#### ⏳ Loading (2개)
**목적**: 로딩, 대기 상태 표시

```tsx
import { SpinnerDark, SpinnerLight } from '@pittaofficial/pitta-graphic-assets';

// 다크 테마 스피너 (무한 루프)
<SpinnerDark width={40} height={40} loop={true} />

// 라이트 테마 스피너 (일회성)
<SpinnerLight width={60} height={60} loop={false} />
```

#### 🎉 Feedback (2개)
**목적**: 성공, 완료 피드백

```tsx
import { PaidComplete, ConfettiParticles } from '@pittaofficial/pitta-graphic-assets';

// 결제 완료 애니메이션
<PaidComplete width={150} height={150} loop={false} />

// 축하 파티클 효과
<ConfettiParticles width={300} height={200} loop={false} autoplay={true} />
```

## 🖼️ 이미지 컴포넌트 활용

### 해상도별 이미지 선택

```tsx
import { 
  BuildInSimImage,     // @1x (기본)
  BuildInSim2xImage,   // @2x (고해상도)
  BuildInSim3xImage    // @3x (초고해상도)
} from '@pittaofficial/pitta-graphic-assets';

// 반응형 이미지 (디바이스에 따라 자동 선택)
const ResponsiveImage = () => {
  const pixelRatio = window.devicePixelRatio || 1;
  
  if (pixelRatio >= 3) return <BuildInSim3xImage width={200} height={150} />;
  if (pixelRatio >= 2) return <BuildInSim2xImage width={200} height={150} />;
  return <BuildInSimImage width={200} height={150} />;
};
```

### CDN 및 로딩 최적화

```tsx
import { ConnectedGraphicImage } from '@pittaofficial/pitta-graphic-assets';

// 커스텀 CDN 사용
<ConnectedGraphicImage 
  cdnBase="https://your-custom-cdn.com/assets/"
  lazy={true}                    // 지연 로딩 활성화
  placeholder={<LoadingSkeleton />}  // 로딩 플레이스홀더
  onLoad={() => console.log('이미지 로드 완료')}
  onError={() => console.log('이미지 로드 실패')}
/>
```

## 🎨 테마 및 브랜드별 선택 가이드

### 테마 매칭

```tsx
// 다크 모드 감지 및 자동 테마 선택
const ThemeAwareSpinner = () => {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  return isDarkMode ? 
    <SpinnerDark width={50} height={50} /> : 
    <SpinnerLight width={50} height={50} />;
};

// WiFi 연결 상태 (OS + 테마 조합)
const WiFiStatusIndicator = ({ os, theme }) => {
  const animations = {
    'android-dark': AosWifiConnectDark,
    'android-light': AosWifiConnectLight,
    'ios-dark': IosWifiConnectDark,
    'ios-light': IosWifiConnectLight,
  };
  
  const Animation = animations[`${os}-${theme}`];
  return <Animation width={100} height={100} />;
};
```

### 브랜드별 선택

```tsx
// BlackVue vs Fleeta 브랜드별 컴포넌트
const BrandedBatteryStatus = ({ brand, theme }) => {
  const components = {
    'blackvue-dark': BatteryConnectedDarkBlackvue,
    'blackvue-light': BatteryConnectedLightBlackvue,
    'fleeta-dark': BatteryConnectedDarkFleeta,
    'fleeta-light': BatteryConnectedLightFleeta,
  };
  
  const Component = components[`${brand}-${theme}`];
  return <Component width={120} height={120} />;
};
```

## 🚀 성능 최적화 가이드

### Lottie 애니메이션 최적화

```tsx
import { SpinnerLight } from '@pittaofficial/pitta-graphic-assets';

// 1. 조건부 렌더링으로 메모리 절약
const ConditionalAnimation = ({ isLoading }) => {
  return isLoading ? <SpinnerLight width={40} height={40} /> : null;
};

// 2. React.memo로 불필요한 리렌더링 방지
const MemoizedAnimation = React.memo(({ isVisible }) => {
  return isVisible ? <ConfettiParticles width={300} height={200} /> : null;
});

// 3. 애니메이션 완료 후 언마운트
const OneTimeAnimation = () => {
  const [isComplete, setIsComplete] = useState(false);
  
  if (isComplete) return null;
  
  return (
    <PaidComplete 
      width={150} 
      height={150} 
      loop={false}
      onComplete={() => setIsComplete(true)}
    />
  );
};
```

### 이미지 로딩 최적화

```tsx
// 1. Intersection Observer를 활용한 지연 로딩
const LazyImage = ({ src, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <div ref={ref}>
      {isVisible && <BuildInSimImage {...props} />}
    </div>
  );
};

// 2. 프리로딩 전략
const preloadImages = () => {
  const images = [
    'Build-in SIM.png',
    'Connected Graphic.png',
    // ... 기타 중요 이미지들
  ];
  
  images.forEach(src => {
    const img = new Image();
    img.src = `https://cdn.jsdelivr.net/npm/@pittaofficial/pitta-graphic-assets@latest/assets/images/${src}`;
  });
};
```

## 🔧 동적 컴포넌트 선택

### 런타임 컴포넌트 로딩

```tsx
// 메타데이터 기반 동적 선택
const DynamicLottieComponent = ({ category, theme }) => {
  const [Component, setComponent] = useState(null);
  
  useEffect(() => {
    import('@pittaofficial/pitta-graphic-assets/docs/lottie-metadata.json')
      .then(metadata => {
        const suitable = metadata.files.find(f => 
          f.category === category && f.theme === theme
        );
        
        if (suitable) {
          import('@pittaofficial/pitta-graphic-assets')
            .then(module => {
              setComponent(() => module[suitable.componentName]);
            });
        }
      });
  }, [category, theme]);
  
  return Component ? <Component width={100} height={100} /> : null;
};

// 사용 예시
<DynamicLottieComponent category="loading" theme="dark" />
<DynamicLottieComponent category="connectivity" theme="light" />
```

## 📊 사용 통계 및 분석

### 메타데이터 기반 분석

```javascript
// 카테고리별 통계
const getCategoryStats = (metadata) => {
  return metadata.categories.map(category => ({
    category,
    count: metadata.files.filter(f => f.category === category).length,
    avgDuration: metadata.files
      .filter(f => f.category === category)
      .reduce((sum, f) => sum + parseFloat(f.duration), 0) / 
      metadata.files.filter(f => f.category === category).length
  }));
};

// 성능별 분포
const getComplexityDistribution = (metadata) => {
  const dist = { low: 0, medium: 0, high: 0 };
  metadata.files.forEach(f => dist[f.complexity]++);
  return dist;
};

// 테마별 분포
const getThemeDistribution = (metadata) => {
  const dist = {};
  metadata.files.forEach(f => {
    dist[f.theme] = (dist[f.theme] || 0) + 1;
  });
  return dist;
};
```

## 💡 베스트 프랙티스

### 1. 컴포넌트 선택 기준

```tsx
// ✅ 좋은 예: 목적에 맞는 컴포넌트 선택
const LoadingState = () => <SpinnerLight width={40} height={40} />;
const WiFiConnection = () => <AosWifiConnectDark width={100} height={100} />;

// ❌ 나쁜 예: 목적과 맞지 않는 컴포넌트 사용
const LoadingState = () => <ConfettiParticles width={40} height={40} />; // 축하용을 로딩용으로
```

### 2. 테마 일관성

```tsx
// ✅ 좋은 예: 전체 앱 테마와 일치
const ThemedComponents = ({ isDark }) => (
  <>
    {isDark ? <SpinnerDark /> : <SpinnerLight />}
    {isDark ? <LogoSplashDark /> : <LogoSplashLight />}
  </>
);

// ❌ 나쁜 예: 테마 불일치
const MixedTheme = () => (
  <>
    <SpinnerDark />      {/* 다크 */}
    <LogoSplashLight />  {/* 라이트 */}
  </>
);
```

### 3. 성능 고려사항

```tsx
// ✅ 좋은 예: 필요할 때만 렌더링
const ConditionalAnimation = ({ showAnimation }) => (
  showAnimation ? <ConfettiParticles loop={false} /> : null
);

// ❌ 나쁜 예: 항상 렌더링 (숨김 처리만)
const HiddenAnimation = ({ showAnimation }) => (
  <div style={{ display: showAnimation ? 'block' : 'none' }}>
    <ConfettiParticles loop={true} />  {/* 숨겨져도 계속 실행 */}
  </div>
);
```

## 🔍 디버깅 및 문제해결

### 일반적인 문제들

```tsx
// 1. Lottie JSON 로딩 실패
const SafeLottieComponent = () => {
  const [error, setError] = useState(null);
  
  return (
    <SpinnerLight 
      onError={() => setError('Lottie 로딩 실패')}
      fallback={<div>로딩 실패: 기본 스피너</div>}
    />
  );
};

// 2. 이미지 CDN 접근 불가
const SafeImageComponent = () => (
  <BuildInSimImage 
    cdnBase="https://backup-cdn.com/assets/"  // 백업 CDN
    onError={() => console.log('메인 CDN 실패, 백업 사용')}
  />
);

// 3. 컴포넌트 import 실패
const DynamicImport = async (componentName) => {
  try {
    const module = await import('@pittaofficial/pitta-graphic-assets');
    return module[componentName];
  } catch (error) {
    console.error('컴포넌트 로딩 실패:', error);
    return null;
  }
};
```

이 가이드를 통해 AI 개발자는 Pitta Graphic Assets 패키지를 효과적으로 활용할 수 있습니다. 메타데이터를 활용한 동적 선택, 성능 최적화, 테마 일관성 등을 고려하여 최적의 사용자 경험을 제공할 수 있습니다.
