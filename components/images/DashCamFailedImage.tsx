import React from 'react';

export interface DashCamFailedImageProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onLoad?: () => void;
  onError?: () => void;
}

const imageData = "data:image/png;base64,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";

export const DashCamFailedImage: React.FC<DashCamFailedImageProps> = ({
  className,
  width,
  height,
  alt = "Dash Cam - Failed.png",
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

export default DashCamFailedImage;
