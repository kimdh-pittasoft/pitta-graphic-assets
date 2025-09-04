import React, { useState } from 'react';

export interface Liveeventuploaddark2xImageProps {
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
const imagePath = "LiveEventUploadDark@2x.png";

export const Liveeventuploaddark2xImage: React.FC<Liveeventuploaddark2xImageProps> = ({
  className,
  width,
  height,
  alt = "LiveEventUploadDark@2x.png",
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
        className={`image-error ${className || ''}`}
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
          className={`image-placeholder ${className || ''}`}
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

export default Liveeventuploaddark2xImage;
