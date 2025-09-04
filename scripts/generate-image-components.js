#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// 디렉토리 경로 설정
const imagesDir = path.join(__dirname, '..', 'assets', 'images');
const outputDir = path.join(__dirname, '..', 'components', 'images');

// 이미지 크기 임계값 (바이트)
const INLINE_SIZE_LIMIT = 10 * 1024; // 10KB

// 파일명을 PascalCase로 변환 (특수문자 제거)
function toPascalCase(str) {
  return str
    // 특수문자들을 제거하거나 대체
    .replace(/[@=;:,()[\]{}]/g, '') // @, =, ;, :, ,, (), [], {} 제거
    .replace(/[+&]/g, 'And')        // +, & → And
    .replace(/[%]/g, 'Percent')     // % → Percent
    .replace(/[#]/g, 'Hash')        // # → Hash
    .replace(/[!]/g, 'Bang')        // ! → Bang
    .replace(/[?]/g, 'Question')    // ? → Question
    .replace(/[<>]/g, '')           // <, > 제거
    .replace(/['"]/g, '')           // 따옴표 제거
    .replace(/[|\\]/g, '')          // |, \ 제거
    .split(/[-_\s.~]/)              // 일반적인 구분자로 분할
    .filter(part => part.length > 0)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

// Base64 인코딩
function encodeBase64(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const mimeType = getMimeType(path.extname(filePath));
  return `data:${mimeType};base64,${fileBuffer.toString('base64')}`;
}

// MIME 타입 결정
function getMimeType(ext) {
  const mimeTypes = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml'
  };
  return mimeTypes[ext.toLowerCase()] || 'image/png';
}

// 이미지 컴포넌트 템플릿 (Base64 인라인)
function createInlineImageTemplate(componentName, base64Data, originalName) {
  return `import React from 'react';

export interface ${componentName}Props {
  className?: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onLoad?: () => void;
  onError?: () => void;
}

const imageData = "${base64Data}";

export const ${componentName}: React.FC<${componentName}Props> = ({
  className,
  width,
  height,
  alt = "${originalName}",
  style,
  onClick,
  onLoad,
  onError,
  ...props
}) => {
  return (
    <img
      src={imageData}
      alt={alt}
      className={className}
      width={width}
      height={height}
      style={style}
      onClick={onClick}
      onLoad={onLoad}
      onError={onError}
      {...props}
    />
  );
};

export default ${componentName};
`;
}

// 이미지 컴포넌트 템플릿 (CDN URL)
function createCDNImageTemplate(componentName, imagePath, originalName) {
  return `import React, { useState } from 'react';

export interface ${componentName}Props {
  className?: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onLoad?: () => void;
  onError?: () => void;
  lazy?: boolean;
  placeholder?: React.ReactNode;
  cdnBase?: string;
}

const defaultCDNBase = 'https://cdn.jsdelivr.net/npm/@pittaofficial/pitta-graphic-assets@latest/assets/images/';
const imagePath = "${imagePath}";

export const ${componentName}: React.FC<${componentName}Props> = ({
  className,
  width,
  height,
  alt = "${originalName}",
  style,
  onClick,
  onLoad,
  onError,
  lazy = true,
  placeholder,
  cdnBase = defaultCDNBase,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(lazy);
  const [hasError, setHasError] = useState(false);
  
  const imageUrl = cdnBase + imagePath;

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <div 
        className={\`image-error \${className || ''}\`}
        style={{ width, height, ...style }}
      >
        ❌ 이미지 로드 실패
      </div>
    );
  }

  if (isLoading && placeholder) {
    return <>{placeholder}</>;
  }

  return (
    <>
      {lazy && isLoading && (
        <div 
          className={\`image-placeholder \${className || ''}\`}
          style={{ width, height, background: '#f0f0f0', ...style }}
        >
          Loading...
        </div>
      )}
      <img
        src={imageUrl}
        alt={alt}
        className={className}
        width={width}
        height={height}
        style={{ display: isLoading ? 'none' : 'block', ...style }}
        onClick={onClick}
        onLoad={handleLoad}
        onError={handleError}
        loading={lazy ? 'lazy' : 'eager'}
        {...props}
      />
    </>
  );
};

export default ${componentName};
`;
}

// 인덱스 파일 생성
function createIndexFile(components) {
  const exports = components
    .map(comp => `export { ${comp.name}, default as ${comp.name}Default } from './${comp.name}';`)
    .join('\n');
  
  const typeExports = components
    .map(comp => `export type { ${comp.name}Props } from './${comp.name}';`)
    .join('\n');

  return `// Auto-generated Image components
${exports}

// Type exports
${typeExports}

// Utility types
export interface ImageComponentProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onLoad?: () => void;
  onError?: () => void;
}

export interface LazyImageProps extends ImageComponentProps {
  lazy?: boolean;
  placeholder?: React.ReactNode;
  cdnBase?: string;
}
`;
}

async function generateImageComponents() {
  try {
    console.log('🖼️  이미지 컴포넌트 생성 시작...');

    // 디렉토리 존재 확인
    if (!fs.existsSync(imagesDir)) {
      console.log('📁 images 폴더가 없습니다. 생성합니다...');
      fs.mkdirSync(imagesDir, { recursive: true });
      
      // 샘플 이미지 정보 파일 생성
      const sampleInfo = `# 이미지 에셋 폴더

이 폴더에 이미지 파일을 추가하면 자동으로 React 컴포넌트가 생성됩니다.

## 지원 형식
- PNG
- JPG/JPEG  
- GIF
- WebP
- SVG

## 크기 기준
- 10KB 미만: Base64 인라인 (즉시 로드)
- 10KB 이상: CDN URL (지연 로드)

## 파일명 규칙
- kebab-case: logo-dark.png → LogoDark
- snake_case: user_avatar.jpg → UserAvatar
- 공백: profile image.png → ProfileImage
`;
      fs.writeFileSync(path.join(imagesDir, 'README.md'), sampleInfo);
      console.log('📝 README.md 파일을 생성했습니다.');
      return;
    }

    // 출력 디렉토리 생성
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 이미지 파일 목록 읽기
    const imageFiles = fs.readdirSync(imagesDir)
      .filter(file => /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(file))
      .filter(file => file !== 'README.md');
    
    if (imageFiles.length === 0) {
      console.log('❌ 이미지 파일을 찾을 수 없습니다.');
      console.log('💡 assets/images/ 폴더에 이미지 파일을 추가해주세요.');
      return;
    }

    console.log(`📁 ${imageFiles.length}개의 이미지 파일 발견:`);
    
    const components = [];
    let inlineCount = 0;
    let cdnCount = 0;

    // 각 이미지 파일 처리
    for (const imageFile of imageFiles) {
      try {
        const imagePath = path.join(imagesDir, imageFile);
        const stats = fs.statSync(imagePath);
        const fileSize = stats.size;
        
        const componentName = toPascalCase(path.parse(imageFile).name) + 'Image';
        const componentPath = path.join(outputDir, `${componentName}.tsx`);
        
        let componentContent;
        let strategy;

        if (fileSize <= INLINE_SIZE_LIMIT) {
          // 작은 파일: Base64 인라인
          const base64Data = encodeBase64(imagePath);
          componentContent = createInlineImageTemplate(componentName, base64Data, imageFile);
          strategy = 'inline';
          inlineCount++;
        } else {
          // 큰 파일: CDN URL
          componentContent = createCDNImageTemplate(componentName, imageFile, imageFile);
          strategy = 'cdn';
          cdnCount++;
        }
        
        fs.writeFileSync(componentPath, componentContent);
        
        components.push({
          name: componentName,
          fileName: imageFile,
          fileSize: fileSize,
          strategy: strategy,
          componentPath: path.relative(path.join(__dirname, '..'), componentPath)
        });

        console.log(`   - ${imageFile} (${Math.round(fileSize/1024)}KB) → ${componentName} [${strategy}]`);
      } catch (error) {
        console.error(`❌ ${imageFile} 처리 중 오류:`, error.message);
      }
    }

    // 인덱스 파일 생성
    const indexContent = createIndexFile(components);
    const indexPath = path.join(outputDir, 'index.ts');
    fs.writeFileSync(indexPath, indexContent);

    console.log('\n📦 생성된 컴포넌트 요약:');
    console.log(`   - Base64 인라인: ${inlineCount}개 (즉시 로드)`);
    console.log(`   - CDN URL: ${cdnCount}개 (지연 로드)`);
    console.log(`   - 총 컴포넌트: ${components.length}개`);
    console.log(`📍 위치: ${path.relative(path.join(__dirname, '..'), outputDir)}`);
    
    return components;
  } catch (error) {
    console.error('❌ 이미지 컴포넌트 생성 중 오류:', error);
    throw error;
  }
}

// 스크립트 직접 실행 시
if (require.main === module) {
  generateImageComponents()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = { generateImageComponents };
