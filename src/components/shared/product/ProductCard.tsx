'use client';

import Image from 'next/image';
import Link from 'next/link';
import { JSX } from 'react';
import { ProductCard } from '@/types/product'; // Replace with your actual type
import { cloudinaryLoader } from '@/utils/image/cloudinaryLoader';
import BrandLogo from '@/components/product/BrandLogo';
import { getProductPath } from '@/utils/navigation/paths';

interface ProductCardProps {
    product: ProductCard;
}

export default function ProductCard({ product }: ProductCardProps): JSX.Element {
    const {
        slug,
        product_name,
        images,
        flavours,
        lowest_price_per_kg,
        roaster,
        likes_count,
    } = product;

    const imageUrl = images?.[0]?.image_url || '/placeholder.png';
    const roasterLogo = roaster?.logo_img_url || '/roaster-placeholder.png';
    const pricePerKg = lowest_price_per_kg ? `£${lowest_price_per_kg.toFixed(2)} /kg` : null;
    const flavourText = flavours?.join(' · ');

    return (
        <Link href={getProductPath(slug)} className="group block bg-white hover:shadow-xl transition-all overflow-hidden border-2 border-pr-300 shadow-b-neumorphic">
            {/* Image */}
            <div className="relative w-full aspect-[1/1] bg-pr-100 border-16 border-pr-100">
                <Image
                    loader={cloudinaryLoader}
                    src={imageUrl}
                    alt={product_name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 25vw, 100vw"
                />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-1">
                {/* Roaster + likes */}
                <div className="flex justify-between items-center">
                    <BrandLogo
                        src={roasterLogo}
                        alt={roaster?.alt_text || 'Roaster logo'}
                        layout={roaster?.logo_layout || 'wide'}
                        baseHeight={24}
                    />

                    {likes_count != null && (
                        <div className="text-pr-800 text-sm flex items-center gap-1">
                            <span>♥</span>
                            <span>{likes_count}</span>
                        </div>
                    )}
                </div>

                {/* Product name */}
                <h3 className="mt-4 -mb-1 text-3xl font-medium text-pr-900 leading-6 tracking-wide">{product_name.toUpperCase()}</h3>

                {/* Flavours */}
                {flavourText && (
                    <p className="text-base font-light text-pr-800">{flavourText}</p>
                )}

                {/* Tags (optional icons) */}
                {/* <div className="flex gap-2 pt-2">
                    <OrganicIcon />
                    <LowCafIcon />
                    <TestedIcon />
                </div> */}

                {/* Price */}
                {pricePerKg && (
                    <div className="pt-1 text-right text-sm font-medium text-pr-800">
                        from <span className="text-xl font-bold">{pricePerKg}</span>
                    </div>
                )}
            </div>
        </Link>
    );
}
