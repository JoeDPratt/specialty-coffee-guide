import { LogoLayout } from '@/types/product';
import { cloudinaryLoader } from '@/utils/image/cloudinaryLoader';
import Image from 'next/image';
import { ImageProps } from 'next/image';
import React from 'react';

interface BrandLogoProps extends Partial<ImageProps> {
    src: string;
    alt?: string;
    className?: string;
    containerClassName?: string;
    priority?: boolean;
    layout?: LogoLayout;
    baseHeight?: number;
  }

const BrandLogo: React.FC<BrandLogoProps> = ({
    src,
    alt = 'Brand Logo',
    className = '',
    priority = false,
    layout = 'wide',
    baseHeight = 32
}) => {
    if (!src) return null;

    const isSvg = src.toLowerCase().endsWith('.svg');

    // Convert height string to number for logic
    const adjustedHeight =
        layout === 'square'
            ? baseHeight + 24
            : layout === 'tall' 
            ? baseHeight + 24
            : baseHeight;

    const containerStyle = { height: `${adjustedHeight}px` };
    const defaultContainerClass = `relative inline-block dark:bg-white dark:border-4 dark:border-white dark:p-1`;

    if (isSvg) {
        return (
            <div className={defaultContainerClass}>
                <img
                    src={src}
                    alt={alt}
                    className={`object-contain w-auto h-full ${className}`}
                    style={containerStyle}
                />
            </div>
        );
    }

    return (
        <div className={defaultContainerClass}>
            <Image
                priority={priority}
                loader={cloudinaryLoader}
                src={src}
                alt={alt}
                width={0}
                height={0}
                className={`object-contain w-auto h-full ${className}`}
                sizes="(max-width: 768px) 100vw, 50vw"
                style={containerStyle}
            />
        </div>
    );
};

export default BrandLogo;