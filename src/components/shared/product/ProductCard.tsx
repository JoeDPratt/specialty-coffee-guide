"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { JSX } from "react";
import type { ProductCard } from "@/types/product";
import { cloudinaryLoader, getBlurURL } from "@/utils/image/cloudinary";
import { getProductPath, getRoasterPath } from "@/utils/navigation/paths";
import { motion } from "framer-motion";
import { subtleSpring } from "@/utils/animation";
import AttributeSection from "@/components/product/AttributeSection";
import RoastLabel from "@/components/shared/product/RoastLabel";
import BestValueTag from "@/components/shared/product/BestValueTag";
import CupScoreBadge from "@/components/shared/product/CupScoreBadge";
import { FireIcon } from "@heroicons/react/16/solid";
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
        product_variants,
        roaster,
        attributes,
        roasts,
        sca_cup_score
    } = product;

    const router = useRouter();
    const variantDisplayWeight = 250;

    const isSm = useBreakpointStore((s) => s.isSm)
    const imageUrl = images?.[0]?.image_url || "/placeholder.png";
    const blurredImage = getBlurURL(imageUrl);

    const variant =
        product_variants?.find((v) => { return v.weight === variantDisplayWeight })
        ?? product_variants?.[0];

    const pricePerKg = variant?.price_per_kg
        ? `£${variant?.price_per_kg.toFixed(2)}`
        : null;
    const flavourText = flavours?.join(" · ");
    const isBestValue = false // Add logic for best value

    return (
        <div
            onClick={() => router.push(getProductPath(slug))}
            className="group flex flex-col h-full bg-card-100 hover:shadow-xl transition-all overflow-hidden border-none border-card-100 rounded-md cursor-pointer"
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
            <div className="flex justify-between items-center gap-2 px-4 py-1 sm:px-6 bg-card-200 inset-shadow-xs">
                {/* Tags (optional icons) */}
                <AttributeSection attributeData={attributes} variant={"icon"} className={"-ml-3 gap-2 sm:gap-4"} />
                <CupScoreBadge score={sca_cup_score} variant={"card"} />
            </div>

            {/* Text Content */}
            <div className={cn(
                "px-4 sm:px-6 pt-4 flex flex-col flex-grow overflow-hidden",
                isSm ? "mb-5" : "min-h-40"
            )}>

                {/* Product name */}
                <h3 className="mt-2.75 mb-0 text-3xl font-semibold text-pr-900 leading-7 line-clamp-2">
                    {product_name.toUpperCase()}
                </h3>

                {/* Roaster + likes */}
                <Link
                    href={getRoasterPath(roaster.slug)}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="text-base hover:text-pr-500"><FireIcon className="w-4 h-4 inline -mt-0.75 mr-0.5" />by {roaster.name}</div>
                </Link>
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
                        <div className="flex flex-col items-end text-right gap-1">
                            <div className="pt-1 font-medium text-pr-800 -mb-1">
                                <span className="text-3xl font-bold">£{variant?.price?.toFixed(2) ?? "--.--"}</span>
                            </div>
                            <div className="text-base font-light">{variant?.weight}g - {pricePerKg} /kg</div>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    );
}
