import Image from 'next/image';
import React from 'react';

interface BrandLogoProps {
  src: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}

const BrandLogo: React.FC<BrandLogoProps> = ({
  src,
  alt = 'Brand Logo',
  className = '',
  width = 40,
  height = 40,
}) => {
  if (!src) return null;

  const isSvg = src.toLowerCase().endsWith('.svg');

  if (isSvg) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default BrandLogo;
