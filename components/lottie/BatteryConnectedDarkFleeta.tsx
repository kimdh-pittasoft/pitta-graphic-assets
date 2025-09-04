import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/lottie/battery-connected-dark-fleeta.json';

export interface BatteryConnectedDarkFleetaProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  loop?: boolean;
  autoplay?: boolean;
  onComplete?: () => void;
  onLoopComplete?: () => void;
  style?: React.CSSProperties;
}

const BatteryConnectedDarkFleeta: React.FC<BatteryConnectedDarkFleetaProps> = ({
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

export default BatteryConnectedDarkFleeta;
