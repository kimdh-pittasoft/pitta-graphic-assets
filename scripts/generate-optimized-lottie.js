#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 디렉토리 경로 설정
const jsonDir = path.join(__dirname, '..', 'assets', 'lottie');
const outputDir = path.join(__dirname, '..', 'components', 'lottie');

// 파일명을 PascalCase로 변환하는 함수
function toPascalCase(str) {
  return str
    .split(/[-_\s]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

// 패키지 포함 React 컴포넌트 템플릿 생성 함수
function createOptimizedComponentTemplate(componentName, jsonFileName) {
  return `import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/lottie/${jsonFileName}';

export interface ${componentName}Props {
  className?: string;
  width?: number | string;
  height?: number | string;
  loop?: boolean;
  autoplay?: boolean;
  onComplete?: () => void;
  onLoopComplete?: () => void;
  style?: React.CSSProperties;
}

const ${componentName}: React.FC<${componentName}Props> = ({
  className,
  width,
  height,
  loop = true,
  autoplay = true,
  onComplete,
  onLoopComplete,
  style,
  ...props
}) => {
  const lottieStyle = {
    width: width || '100%',
    height: height || '100%',
    ...style,
  };

  return (
    <Lottie
      className={className}
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      onComplete={onComplete}
      onLoopComplete={onLoopComplete}
      style={lottieStyle}
      {...props}
    />
  );
};

export default ${componentName};
`;
}

// 메인 실행 함수
function generateOptimizedLottieComponents() {
  try {
    console.log('🚀 경량화된 로티 컴포넌트 생성 시작...');

    // JSON 디렉토리 확인
    if (!fs.existsSync(jsonDir)) {
      console.error(`❌ JSON 디렉토리를 찾을 수 없습니다: ${jsonDir}`);
      return;
    }

    // 출력 디렉토리 생성
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // assets/lottie 디렉토리는 이미 최신 JSON 파일들이 있음

    // JSON 파일들 처리
    const jsonFiles = fs.readdirSync(jsonDir).filter(file => file.endsWith('.json'));

    if (jsonFiles.length === 0) {
      console.log('⚠️  JSON 파일이 없습니다.');
      return;
    }

    const exports = [];

    jsonFiles.forEach(jsonFile => {
      const componentName = toPascalCase(path.parse(jsonFile).name);
      const componentFile = `${componentName}.tsx`;
      const componentPath = path.join(outputDir, componentFile);

      // assets/lottie에 이미 최신 JSON 파일이 있으므로 복사 불필요

      // 경량화된 React 컴포넌트 생성
      const componentContent = createOptimizedComponentTemplate(componentName, jsonFile);
      fs.writeFileSync(componentPath, componentContent);

      exports.push(`export { default as ${componentName} } from './${componentName}';`);

      console.log(`✅ ${componentName} (${jsonFile}) → 경량화된 컴포넌트 생성`);
    });

    // index.ts 파일 생성
    const indexContent = exports.join('\n') + '\n';
    fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent);

    console.log(`🎉 총 ${jsonFiles.length}개의 경량화된 로티 컴포넌트 생성 완료!`);
    console.log(`📦 용량 절약: JSON 동적 로딩으로 번들 크기 대폭 감소`);

  } catch (error) {
    console.error('❌ 에러 발생:', error);
    process.exit(1);
  }
}

// 스크립트 직접 실행 시
if (require.main === module) {
  generateOptimizedLottieComponents();
}

module.exports = generateOptimizedLottieComponents;
