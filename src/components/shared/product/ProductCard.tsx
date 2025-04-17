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
        likes_count = 190,
        attributes,
        roasts,
        sca_cup_score
    } = product;

    const imageUrl = images?.[0]?.image_url || "/placeholder.png";
    const blurredImage = getBlurURL(imageUrl);
    const pricePerKg = lowest_price_per_kg
        ? `£${lowest_price_per_kg.toFixed(2)}`
        : null;
    const flavourText = flavours?.join(" · ");
    const cup_score = 90
    console.log("CUP SCORE", cup_score);
    const isBestValue = false // Add logic for best value

    return (
        <Link
            href={getProductPath(slug)}
            className="group flex flex-col h-full bg-card-200 hover:shadow-xl transition-all overflow-hidden border-1 border-card-100  rounded-md"
        >
            {/* Image */}
            <motion.div
                layoutId={`product-image-${product.slug}`}
                transition={subtleSpring}
                className="relative w-full aspect-[1/1] bg-card-200 border-8 border-card-200"
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

            {/* Text Content */}
            <div className="px-6 pt-0 flex flex-col flex-grow overflow-hidden min-h-45">

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
            <div className="bg-card-100 px-6 py-2">

                {/* Attriibutes and tags */}
                <div className="flex justify-between items-center mt-1">
                    {/* Tags (optional icons) */}
                    <AttributeSection attributeData={attributes} variant={"icon"} className={"-ml-2 gap-3"} />
                    {isBestValue && <BestValueTag />}
                </div>

                {/* Cup Score Price */}
                <div className="flex justify-between items-baseline">
                    <CupScoreBadge score={cup_score} variant={"card"} />

                    {pricePerKg && (
                        <div className="flex justify-between items-baseline-last">
                            <div className="pt-1 text-right text-sm font-medium text-pr-800">
                                from <span className="text-2xl font-bold">{pricePerKg}</span> /kg
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>

        </Link>
    );
}
