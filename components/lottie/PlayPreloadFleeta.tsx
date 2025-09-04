import React from 'react';
import Lottie from 'lottie-react';

export interface PlayPreloadFleetaProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  loop?: boolean;
  autoplay?: boolean;
  onComplete?: () => void;
  onLoopComplete?: () => void;
  style?: React.CSSProperties;
}

const PlayPreloadFleeta: React.FC<PlayPreloadFleetaProps> = ({
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
  const [animationData, setAnimationData] = React.useState<any>(null);

  React.useEffect(() => {
    // 동적으로 JSON 파일 로드
    import(`../../assets/lottie/play-preload-fleeta.json`)
      .then(module => setAnimationData(module.default))
      .catch(err => console.error('Lottie 로딩 실패:', err));
  }, []);

  const lottieStyle = {
    width: width || '100%',
    height: height || '100%',
    ...style,
  };

  if (!animationData) {
    return (
      <div 
        className={className}
        style={{
          ...lottieStyle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f0f0',
          color: '#666'
        }}
      >
        Loading...
      </div>
    );
  }

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

export default PlayPreloadFleeta;
