const fs = require('fs');
const path = require('path');

/**
 * Lottie JSON 파일을 분석하여 AI가 읽기 쉬운 메타데이터를 생성합니다.
 */

const lottieDir = path.join(__dirname, '..', 'assets', 'lottie');
const outputDir = path.join(__dirname, '..', 'docs');

// 출력 디렉토리 생성
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function analyzeLottieFile(filePath, fileName) {
  try {
    const jsonContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    const metadata = {
      filename: fileName,
      componentName: toPascalCase(fileName.replace('.json', '')),
      
      // 기본 정보
      version: jsonContent.v || 'unknown',
      frameRate: jsonContent.fr || 30,
      duration: jsonContent.op ? (jsonContent.op / (jsonContent.fr || 30)).toFixed(2) + 's' : 'unknown',
      width: jsonContent.w || 'unknown',
      height: jsonContent.h || 'unknown',
      
      // 애니메이션 특성
      totalFrames: jsonContent.op || 0,
      inPoint: jsonContent.ip || 0,
      outPoint: jsonContent.op || 0,
      isLoop: true, // 대부분의 Lottie는 루프
      
      // 콘텐츠 분석
      layerCount: jsonContent.layers ? jsonContent.layers.length : 0,
      hasShapes: jsonContent.layers ? jsonContent.layers.some(layer => layer.shapes) : false,
      hasText: jsonContent.layers ? jsonContent.layers.some(layer => layer.t) : false,
      hasImages: jsonContent.assets ? jsonContent.assets.some(asset => asset.p) : false,
      
      // 색상 분석 (대략적)
      colors: extractColors(jsonContent),
      
      // 사용 목적 추론
      category: categorizeAnimation(fileName),
      theme: inferTheme(fileName),
      
      // 파일 크기
      fileSize: fs.statSync(filePath).size,
      fileSizeKB: Math.round(fs.statSync(filePath).size / 1024) + 'KB',
      
      // AI를 위한 설명
      description: generateDescription(fileName, jsonContent),
      useCases: generateUseCases(fileName),
      
      // 기술적 메타데이터
      complexity: assessComplexity(jsonContent),
      performance: assessPerformance(jsonContent),
    };
    
    return metadata;
  } catch (error) {
    console.error(`Error analyzing ${fileName}:`, error.message);
    return null;
  }
}

function toPascalCase(str) {
  return str
    .replace(/[@=;:,()[\]{}]/g, '')
    .replace(/[+&]/g, 'And')
    .replace(/[%]/g, 'Percent')
    .replace(/[#]/g, 'Hash')
    .replace(/[!]/g, 'Bang')
    .replace(/[?]/g, 'Question')
    .replace(/[<>]/g, '')
    .replace(/['"]/g, '')
    .replace(/[|\\]/g, '')
    .split(/[-_\s.~]/)
    .filter(part => part.length > 0)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function extractColors(jsonContent) {
  const colors = new Set();
  
  function extractFromLayers(layers) {
    if (!layers) return;
    
    layers.forEach(layer => {
      if (layer.shapes) {
        extractFromShapes(layer.shapes);
      }
      if (layer.ef) {
        // Effects may contain colors
        layer.ef.forEach(effect => {
          if (effect.ef) {
            effect.ef.forEach(param => {
              if (param.v && Array.isArray(param.v) && param.v.length >= 3) {
                const [r, g, b] = param.v;
                if (r <= 1 && g <= 1 && b <= 1) {
                  colors.add(`rgb(${Math.round(r*255)}, ${Math.round(g*255)}, ${Math.round(b*255)})`);
                }
              }
            });
          }
        });
      }
    });
  }
  
  function extractFromShapes(shapes) {
    shapes.forEach(shape => {
      if (shape.it) {
        extractFromShapes(shape.it);
      }
      if (shape.c && shape.c.k) {
        const color = shape.c.k;
        if (Array.isArray(color) && color.length >= 3) {
          const [r, g, b] = color;
          colors.add(`rgb(${Math.round(r*255)}, ${Math.round(g*255)}, ${Math.round(b*255)})`);
        }
      }
    });
  }
  
  extractFromLayers(jsonContent.layers);
  
  return Array.from(colors).slice(0, 10); // 최대 10개 색상
}

function categorizeAnimation(fileName) {
  const name = fileName.toLowerCase();
  
  if (name.includes('wifi')) return 'connectivity';
  if (name.includes('battery')) return 'power';
  if (name.includes('spinner') || name.includes('loading')) return 'loading';
  if (name.includes('logo') || name.includes('splash')) return 'branding';
  if (name.includes('button') || name.includes('touch')) return 'interaction';
  if (name.includes('arrow') || name.includes('rotation')) return 'navigation';
  if (name.includes('confetti') || name.includes('paid')) return 'feedback';
  if (name.includes('upload') || name.includes('cloud')) return 'upload';
  if (name.includes('camera') || name.includes('profile')) return 'camera';
  
  return 'general';
}

function inferTheme(fileName) {
  const name = fileName.toLowerCase();
  
  if (name.includes('dark')) return 'dark';
  if (name.includes('light')) return 'light';
  if (name.includes('blackvue')) return 'blackvue';
  if (name.includes('fleeta')) return 'fleeta';
  
  return 'neutral';
}

function generateDescription(fileName, jsonContent) {
  const category = categorizeAnimation(fileName);
  const theme = inferTheme(fileName);
  const duration = jsonContent.op ? (jsonContent.op / (jsonContent.fr || 30)).toFixed(1) : 'unknown';
  
  const descriptions = {
    connectivity: `WiFi 연결 상태를 나타내는 ${theme} 테마 애니메이션 (${duration}초)`,
    power: `배터리 관련 상태를 표시하는 ${theme} 테마 애니메이션 (${duration}초)`,
    loading: `로딩 상태를 나타내는 ${theme} 테마 스피너 애니메이션 (${duration}초)`,
    branding: `브랜드 로고 또는 스플래시 ${theme} 테마 애니메이션 (${duration}초)`,
    interaction: `사용자 인터랙션 피드백 ${theme} 테마 애니메이션 (${duration}초)`,
    navigation: `방향 지시 또는 회전을 나타내는 ${theme} 테마 애니메이션 (${duration}초)`,
    feedback: `성공/완료 피드백을 위한 ${theme} 테마 애니메이션 (${duration}초)`,
    upload: `업로드/클라우드 상태를 나타내는 ${theme} 테마 애니메이션 (${duration}초)`,
    camera: `카메라 관련 기능을 나타내는 ${theme} 테마 애니메이션 (${duration}초)`,
    general: `범용 ${theme} 테마 애니메이션 (${duration}초)`
  };
  
  return descriptions[category] || `일반적인 Lottie 애니메이션 (${duration}초)`;
}

function generateUseCases(fileName) {
  const category = categorizeAnimation(fileName);
  
  const useCases = {
    connectivity: ['WiFi 연결 진행 표시', '네트워크 상태 피드백', '연결 대기 화면'],
    power: ['배터리 충전 상태', '전원 연결 표시', '배터리 레벨 애니메이션'],
    loading: ['데이터 로딩', '페이지 전환', '처리 중 표시'],
    branding: ['앱 시작 화면', '브랜드 인트로', '로고 애니메이션'],
    interaction: ['버튼 터치 피드백', '제스처 안내', '인터랙션 가이드'],
    navigation: ['방향 안내', '페이지 이동', '화면 회전'],
    feedback: ['성공 메시지', '완료 알림', '축하 효과'],
    upload: ['파일 업로드', '클라우드 동기화', '백업 진행'],
    camera: ['카메라 전환', '녹화 상태', '설정 변경'],
    general: ['일반적인 UI 피드백', '상태 표시', '장식 효과']
  };
  
  return useCases[category] || ['범용 애니메이션'];
}

function assessComplexity(jsonContent) {
  let score = 0;
  
  // 레이어 수
  const layerCount = jsonContent.layers ? jsonContent.layers.length : 0;
  if (layerCount > 20) score += 3;
  else if (layerCount > 10) score += 2;
  else if (layerCount > 5) score += 1;
  
  // 프레임 수
  const frameCount = jsonContent.op || 0;
  if (frameCount > 200) score += 3;
  else if (frameCount > 100) score += 2;
  else if (frameCount > 50) score += 1;
  
  // 에셋 수
  const assetCount = jsonContent.assets ? jsonContent.assets.length : 0;
  if (assetCount > 10) score += 2;
  else if (assetCount > 5) score += 1;
  
  if (score >= 6) return 'high';
  if (score >= 3) return 'medium';
  return 'low';
}

function assessPerformance(jsonContent) {
  const complexity = assessComplexity(jsonContent);
  const frameRate = jsonContent.fr || 30;
  const duration = jsonContent.op ? (jsonContent.op / frameRate) : 0;
  const layerCount = jsonContent.layers ? jsonContent.layers.length : 0;
  
  let recommendation = '';
  
  if (complexity === 'high') {
    recommendation = '복잡한 애니메이션 - 모바일에서 성능 주의';
  } else if (complexity === 'medium') {
    recommendation = '중간 복잡도 - 일반적인 사용에 적합';
  } else {
    recommendation = '단순한 애니메이션 - 모든 디바이스에서 원활';
  }
  
  if (frameRate > 30) {
    recommendation += ', 높은 프레임레이트';
  }
  
  if (duration > 3) {
    recommendation += ', 긴 재생시간';
  }
  
  return recommendation;
}

// 메인 실행
console.log('🔍 Lottie 파일 메타데이터 분석 시작...');

const lottieFiles = fs.readdirSync(lottieDir).filter(file => file.endsWith('.json'));
const allMetadata = [];

lottieFiles.forEach(file => {
  const filePath = path.join(lottieDir, file);
  const metadata = analyzeLottieFile(filePath, file);
  
  if (metadata) {
    allMetadata.push(metadata);
    console.log(`✅ ${file} 분석 완료`);
  }
});

// 전체 메타데이터 저장
const metadataOutput = {
  generatedAt: new Date().toISOString(),
  totalFiles: allMetadata.length,
  categories: [...new Set(allMetadata.map(m => m.category))],
  themes: [...new Set(allMetadata.map(m => m.theme))],
  files: allMetadata.sort((a, b) => a.componentName.localeCompare(b.componentName))
};

fs.writeFileSync(
  path.join(outputDir, 'lottie-metadata.json'),
  JSON.stringify(metadataOutput, null, 2)
);

// 마크다운 카탈로그 생성
const catalogMd = generateMarkdownCatalog(metadataOutput);
fs.writeFileSync(
  path.join(outputDir, 'lottie-catalog.md'),
  catalogMd
);

console.log(`🎉 완료! ${allMetadata.length}개 파일 분석 완료`);
console.log(`📄 메타데이터: docs/lottie-metadata.json`);
console.log(`📋 카탈로그: docs/lottie-catalog.md`);

function generateMarkdownCatalog(metadata) {
  let md = `# Lottie Animation Catalog\n\n`;
  md += `**Generated**: ${new Date(metadata.generatedAt).toLocaleString()}\n`;
  md += `**Total Files**: ${metadata.totalFiles}\n\n`;
  
  // 카테고리별 분류
  metadata.categories.forEach(category => {
    const filesInCategory = metadata.files.filter(f => f.category === category);
    if (filesInCategory.length === 0) return;
    
    md += `## ${category.charAt(0).toUpperCase() + category.slice(1)} (${filesInCategory.length}개)\n\n`;
    
    filesInCategory.forEach(file => {
      md += `### ${file.componentName}\n\n`;
      md += `- **파일**: \`${file.filename}\`\n`;
      md += `- **테마**: ${file.theme}\n`;
      md += `- **크기**: ${file.width}x${file.height}px\n`;
      md += `- **재생시간**: ${file.duration}\n`;
      md += `- **파일크기**: ${file.fileSizeKB}\n`;
      md += `- **복잡도**: ${file.complexity}\n`;
      md += `- **설명**: ${file.description}\n`;
      md += `- **사용사례**: ${file.useCases.join(', ')}\n`;
      md += `- **성능**: ${file.performance}\n`;
      
      if (file.colors.length > 0) {
        md += `- **주요색상**: ${file.colors.slice(0, 5).join(', ')}\n`;
      }
      
      md += `\n**사용법**:\n`;
      md += `\`\`\`tsx\n`;
      md += `import { ${file.componentName} } from '@pittaofficial/pitta-graphic-assets';\n\n`;
      md += `<${file.componentName} \n`;
      md += `  width={${file.width}} \n`;
      md += `  height={${file.height}}\n`;
      md += `  loop={${file.isLoop}}\n`;
      md += `/>\n`;
      md += `\`\`\`\n\n`;
      md += `---\n\n`;
    });
  });
  
  return md;
}
