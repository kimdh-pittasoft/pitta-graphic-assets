import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/lottie/aos-wifi-connect-dark.json';

export interface AosWifiConnectDarkProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  loop?: boolean;
  autoplay?: boolean;
  onComplete?: () => void;
  onLoopComplete?: () => void;
  style?: React.CSSProperties;
}

const AosWifiConnectDark: React.FC<AosWifiConnectDarkProps> = ({
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

export default AosWifiConnectDark;
