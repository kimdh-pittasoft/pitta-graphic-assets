import React from 'react';
import { 
  AosWifiConnectDark, 
  SpinnerLight, 
  ConfettiParticles,
  LogoSplashDark 
} from '@pittaofficial/pitta-graphic-assets';

export const LottieExampleApp: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Pitta Lottie Animations</h1>
      
      {/* WiFi 연결 애니메이션 */}
      <div style={{ marginBottom: '40px' }}>
        <h2>WiFi 연결</h2>
        <AosWifiConnectDark 
          width={200} 
          height={200}
          onComplete={() => console.log('WiFi 연결 완료!')}
        />
      </div>

      {/* 스피너 애니메이션 */}
      <div style={{ marginBottom: '40px' }}>
        <h2>로딩 스피너</h2>
        <SpinnerLight 
          width={100} 
          height={100}
          speed={1.5}
        />
      </div>

      {/* 축하 애니메이션 */}
      <div style={{ marginBottom: '40px' }}>
        <h2>축하 효과</h2>
        <ConfettiParticles 
          width={300} 
          height={200}
          loop={false}
          onComplete={() => console.log('축하 애니메이션 완료!')}
        />
      </div>

      {/* 로고 스플래시 */}
      <div style={{ marginBottom: '40px' }}>
        <h2>로고 스플래시</h2>
        <LogoSplashDark 
          width={250} 
          height={150}
          className="logo-splash"
          style={{ border: '1px solid #ccc', borderRadius: '8px' }}
        />
      </div>
    </div>
  );
};

export default LottieExampleApp;
