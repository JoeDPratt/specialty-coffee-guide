"use client";

import Image from "next/image";
import Link from "next/link";
import type { JSX } from "react";
import type { ProductCard } from "@/types/product";
import { cloudinaryLoader, getBlurURL } from "@/utils/image/cloudinary";
import { getProductPath } from "@/utils/navigation/paths";
import { motion } from "framer-motion";
import { subtleSpring } from "@/utils/animation";
import { HeartIcon } from "@heroicons/react/16/solid";
import AttributeSection from "@/components/product/AttributeSection";
import RoastLabel from "@/components/shared/product/RoastLabel";
import BestValueTag from "@/components/shared/product/BestValueTag";
import CupScoreBadge from "@/components/shared/product/CupScoreBadge";
import { useBreakpointStore } from '@/stores/useBreakpointStore'
import { cn } from "@/utils/classes/merge";

interface ProductCardProps {
    product: ProductCard;
}

export default function ProductCard({
    product,
}: ProductCardProps): JSX.Element {
    const {
        slug,
        product_name,
        images,
        flavours,
        lowest_price_per_kg,
        roaster,
        attributes,
        roasts,
        sca_cup_score
    } = product;

    const isSm = useBreakpointStore((s) => s.isSm)
    const imageUrl = images?.[0]?.image_url || "/placeholder.png";
    const blurredImage = getBlurURL(imageUrl);
    const pricePerKg = lowest_price_per_kg
        ? `£${lowest_price_per_kg.toFixed(2)}`
        : null;
    const flavourText = flavours?.join(" · ");
    const isBestValue = true // Add logic for best value

    return (
        <Link
            href={getProductPath(slug)}
            className="group flex flex-col h-full bg-card-100 hover:shadow-xl transition-all overflow-hidden border-1 border-card-100 rounded-md"
        >
            {/* Image */}
            <motion.div
                layoutId={`product-image-${product.slug}`}
                transition={subtleSpring}
                className="relative w-full aspect-[1/1] bg-card-100"
            >
                <Image
                    loader={cloudinaryLoader}
                    src={imageUrl}
                    alt={product_name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 25vw, 100vw"
                    placeholder="blur"
                    blurDataURL={blurredImage}
                />
            </motion.div>

            {/* Attriibutes and tags */}
            <div className="flex justify-between items-center gap-2 px-4 sm:px-6 bg-card-200">
                {/* Tags (optional icons) */}
                <AttributeSection attributeData={attributes} variant={"icon"} className={"-ml-3 gap-2 sm:gap-4"} />
                <CupScoreBadge score={90} variant={"card"} />
            </div>

            {/* Text Content */}
            <div className={cn(
                "px-4 sm:px-6 pt-4 flex flex-col flex-grow overflow-hidden",
                isSm ? "mb-9" : "min-h-45"
            )}>

                {/* Product name */}
                <h3 className="mt-2.75 mb-0 text-3xl font-medium text-pr-900 leading-7 tracking-wide line-clamp-2">
                    {product_name.toUpperCase()}
                </h3>

                {/* Roaster + likes */}
                <div className="text-base">{roaster.name}</div>

                {/* Flavours */}
                {flavourText && (
                    <div className="text-base font-light text-pr-800 mt-0.25 mb-1.25">{flavourText}</div>
                )}

                {/* Roasts */}
                {roasts && (
                    <RoastLabel roasts={roasts} limit={2} size={"sm"} variant={"outline"} />
                )}
            </div>
            {/* Comparison section */}
            <div className="px-4 sm:px-6 pt-2 pb-4">

                {/* Cup Score Price */}
                <div className="flex justify-between items-end">

                    <div className={cn("pb-1.75",
                        !isBestValue && "opacity-0"
                    )}
                    >
                        <BestValueTag />
                    </div>
                    {pricePerKg && (
                        <div className="flex flex-col items-end text-right">
                            <div className="pt-1 font-medium text-pr-800 -mb-1">
                                <span className="text-3xl font-bold">£12.50</span>
                            </div>
                            <div className="text-base font-light">250g - {pricePerKg} /kg</div>
                        </div>
                    )
                    }
                </div>
            </div>

        </Link>
    );
}
