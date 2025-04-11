import type { LogoLayout } from "@/types/product";
import { cloudinaryLoader } from "@/utils/image/cloudinary";
import Image from "next/image";
import type { ImageProps } from "next/image";
import React from "react";

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
    alt = "Brand Logo",
    className = "",
    priority = false,
    layout = "wide",
    baseHeight = 32,
}) => {
    if (!src) return null;

    const isSvg = src.toLowerCase().endsWith(".svg");

    // Convert height string to number for logic
    const adjustedHeight =
        layout === "square"
            ? baseHeight + 24
            : layout === "tall"
                ? baseHeight + 24
                : baseHeight;

    const containerStyle = { height: `${adjustedHeight}px` };
    const defaultContainerClass = `relative flex bg-pr-100 border-4 border-white pb-4 pt-5 px-6 rounded-sm items-center`;

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
