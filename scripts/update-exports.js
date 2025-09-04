#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 기존 generate-exports.js를 확장하여 로티 컴포넌트도 포함
const iconsDir = path.join(__dirname, '..', 'icons');
const lottieDir = path.join(__dirname, '..', 'components', 'lottie');
const outputFile = path.join(__dirname, '..', 'index.ts');

function updateExports() {
  try {
    console.log('📦 exports 업데이트 시작...');

    let exports = [];

    // 로티 컴포넌트 exports
    if (fs.existsSync(lottieDir)) {
      const lottieIndexPath = path.join(lottieDir, 'index.ts');
      if (fs.existsSync(lottieIndexPath)) {
        exports.push('// Lottie Animations');
        exports.push('export * from \'./components/lottie\';');
        exports.push('');
      }
    }

    // 이미지 컴포넌트 exports
    const imageDir = path.join(__dirname, '..', 'components', 'images');
    if (fs.existsSync(imageDir)) {
      const imageIndexPath = path.join(imageDir, 'index.ts');
      if (fs.existsSync(imageIndexPath)) {
        exports.push('// Image Components');
        exports.push('export * from \'./components/images\';');
        exports.push('');
      }
    }

    const content = exports.join('\n');
    fs.writeFileSync(outputFile, content);

    console.log('✅ exports 업데이트 완료');
    console.log(`📍 위치: ${path.relative(path.join(__dirname, '..'), outputFile)}`);
  } catch (error) {
    console.error('❌ exports 업데이트 중 오류:', error);
    throw error;
  }
}

// 스크립트 직접 실행 시
if (require.main === module) {
  updateExports();
}

module.exports = { updateExports };
