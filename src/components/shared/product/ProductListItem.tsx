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
import { CheckCircleIcon, XCircleIcon, FireIcon } from "@heroicons/react/16/solid";
import { useBreakpointStore } from '@/stores/useBreakpointStore'
import { useSearchStore } from "@/stores/useSearchStore";
import { cn } from "@/utils/classes/merge";
import {
    Tooltip,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { DefaultTooltip } from "@/components/tooltips/DefaultTooltip";
import { useState } from "react";
import { WeightToggle } from "./WeightToggle";

interface ProductCardProps {
    product: ProductCard;
}

export default function ProductListItem({
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

    const [selectedWeight, setSelectedWeight] = useState<250 | 1000>(250);
    const router = useRouter();
    // const variantDisplayWeight = 250;

    const isSm = useBreakpointStore((s) => s.isSm)
    const imageUrl = images?.[0]?.image_url || "/placeholder.png";
    const blurredImage = getBlurURL(imageUrl);

    const variant =
        product_variants?.find((v) => { return v.weight === selectedWeight })
        ?? product_variants?.[0];

    const pricePerKg = variant?.price_per_kg
        ? `£${variant?.price_per_kg.toFixed(2)}`
        : null;
    const flavourText = flavours?.join(" · ");
    const isBestValue = false; // Add logic for best value
    const isInStock = variant?.is_instock ?? false;
    const hasRoasts = roasts && roasts.length > 0;



    return (
        <div
            onClick={() => router.push(getProductPath(slug))}
            className="@container/card group w-full flex flex-row bg-card-100 hover:shadow-xl transition-all overflow-hidden rounded-md cursor-pointer"
        >
            {/* Image */}
            <motion.div
                layoutId={`product-image-${product.slug}`}
                transition={subtleSpring}
                className="relative h-full aspect-[1/1] bg-card-200"
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
            <AttributeSection attributeData={attributes} variant={"icon"} className={"gap-3 flex-col pt-4 pb-4 px-3 bg-card-200"} />
            {/* Text Content */}
            <div className={cn(
                "flex flex-col flex-1 justify-between overflow-hidden pt-4 pb-6 ml-6"
            )}>
                <div className="flex flex-col">
                    {/* Product name */}
                    <h3 className="mt-2.75 mb-0 text-3xl font-semibold text-pr-900 leading-7 line-clamp-2">
                        {product_name.toUpperCase()}
                    </h3>

                    {/* Roaster */}
                    <Link
                        href={getRoasterPath(roaster.slug)}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-base text-pr-800/80 hover:text-pr-500 mt-0.25"><FireIcon className="w-4 h-4 inline -mt-0.75 mr-0.5" />by {roaster.name}</div>
                    </Link>
                    <div className="flex items-center gap-2 mt-2.75">
                        {/* Roasts */}
                        {hasRoasts && (
                            <RoastLabel roasts={roasts} limit={2} size={"sm"} variant={"outline"} />
                        )}
                        {/* Flavours */}
                        {flavourText && (
                            <div className="text-base font-light text-pr-800/80 tracking-wide mt-0.25 mb-1.25">{flavourText}</div>
                        )}
                    </div>
                </div>
                <CupScoreBadge score={sca_cup_score} variant={"card"} />

            </div>
            {/* Comparison section */}

            <div className="flex flex-col items-end justify-between px-4 @min-card-sm/card:px-6 pt-6 pb-6 bg-card-100">

                <div className={cn("mt-0.5",
                    !isBestValue && "opacity-0"
                )}
                >
                    <BestValueTag />
                </div>
                <div className="flex flex-col items-end gap-1">
                    {/* <WeightToggle value={selectedWeight} onChange={setSelectedWeight} /> */}
                    {/* <div className="flex gap-1 items-center">
                        <span className="text-sm leading-1 mb-1.25 bg-white p-2 rounded-full shadow-xs">250g</span>
                        <span className="text-sm leading-1 mb-1.25 bg-white p-2 rounded-full ">1kg</span>
                    </div> */}
                    <Tooltip>
                        <TooltipTrigger asChild >
                            <div className="flex flex-col items-end text-right gap-1 mb-1">

                                <span className={cn(
                                    "text-3xl font-bold leading-9 -mb-0.25",
                                    isInStock ? "text-pr-900" : "text-disabled-400"
                                )}>
                                    £{variant?.price?.toFixed(2) ?? "--.--"}
                                </span>


                                <div className="flex items-end gap-1.25 font-medium text-pr-900">
                                    <div className={cn(
                                        "text-base leading-4 font-light",
                                        isInStock ? "text-pr-900" : "text-disabled-400"
                                    )}>{pricePerKg} /kg
                                    </div>
                                    <span className="">
                                        {isInStock ? (
                                            <CheckCircleIcon className="w-4 h-4 text-green-400" title="In stock" />
                                        ) : (
                                            <XCircleIcon className="w-4 h-4 text-disabled-400" title="Out of stock" />
                                        )}
                                    </span>
                                </div>
                            </div>
                        </TooltipTrigger>
                        <DefaultTooltip description={isInStock ? "In-stock" : "Out of stock"} align="end" />
                    </Tooltip>
                    <div onClick={(e) => e.stopPropagation()}>
                        <WeightToggle value={selectedWeight} onChange={setSelectedWeight} />
                    </div>
                </div>
            </div>
        </div>
    );
}
