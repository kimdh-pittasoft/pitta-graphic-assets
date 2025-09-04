import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/lottie/camera-profile-change.json';

export interface CameraProfileChangeProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  loop?: boolean;
  autoplay?: boolean;
  onComplete?: () => void;
  onLoopComplete?: () => void;
  style?: React.CSSProperties;
}

const CameraProfileChange: React.FC<CameraProfileChangeProps> = ({
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

export default CameraProfileChange;
