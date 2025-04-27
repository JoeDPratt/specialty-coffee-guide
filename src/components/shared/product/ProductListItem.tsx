// components/shared/product/ProductListItem.tsx
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
import { XMarkIcon, CheckIcon, NoSymbolIcon, FireIcon } from "@heroicons/react/16/solid";
import { useBreakpointStore } from '@/stores/useBreakpointStore'
import { cn } from "@/utils/classes/merge";
import {
    Tooltip,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { DefaultTooltip } from "@/components/tooltips/DefaultTooltip";
import { useState } from "react";

import { useSearchStore } from "@/stores/useSearchStore";

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


    const selectedWeight = useSearchStore((s) => s.selectedWeight);
    const router = useRouter();
    // const variantDisplayWeight = 250;

    const isXs = useBreakpointStore((s) => s.isXs)
    const isSm = useBreakpointStore((s) => s.isSm)
    const imageUrl = images?.[0]?.image_url || "/placeholder.png";
    const blurredImage = getBlurURL(imageUrl);

    const variant =
        product_variants?.find((v) => { return v.weight === parseInt(selectedWeight) })
        ?? product_variants?.[0];

    const pricePerKg = variant?.price_per_kg
        ? `£${variant?.price_per_kg.toFixed(2)}`
        : null;
    const flavourText = flavours?.join(", ");
    const isBestValue = false; // Add logic for best value
    const isInStock = variant?.is_instock ?? false;
    const hasRoasts = roasts && roasts.length > 0;


    return (
        <div
            onClick={() => router.push(getProductPath(slug))}
            className={cn(
                "@container/card group w-full flex flex-col items-center transition-all overflow-hidden cursor-pointer rounded-md hover:shadow-md",
                "sm:flex-row sm:items-stretch sm:bg-card-200",
                "xs:max-sm:items-end")}
        >
            {/* Image */}
            <motion.div
                layoutId={`product-image-${product.slug}`}
                transition={subtleSpring}
                className={cn(
                    "relative aspect-square",
                    "max-xs:w-24 max-xs:-mb-12 max-sm:border-4 max-sm:border-card-100 max-sm:rounded-sm ",
                    "xs:max-sm:mr-4 xs:max-sm:w-25 xs:max-sm:-mb-21",
                    "sm:w-auto sm:h-[198px] xl:h-[136px]"
                )}
            >
                <Image
                    loader={cloudinaryLoader}
                    src={imageUrl}
                    alt={product_name}
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 768px) 25vw, 100vw"
                    placeholder="blur"
                    blurDataURL={blurredImage}
                />
            </motion.div>
            {/* Text Content */}
            <div className={cn(
                "grid grid-cols-1 grid-rows-[auto_auto_auto] w-full",
                "max-sm:gap-y-0 max-sm:bg-card-100 max-sm:rounded-md max-sm:border-4 max-sm:border-card-100",
                "sm:p-4",
                "sm:max-md:gap-x-3.5",
                "md:px-6 md:py-5",
                "sm:max-xl:grid-cols-[1fr_auto] sm:max-xl:grid-rows-[auto_auto] md:max-xl:gap-x-5",
                "xl:grid-cols-[4fr_3fr_auto] xl:grid-rows-1 xl:gap-5 xl:pt-5 xl:pb-4.75"
            )}>
                <div className={cn(
                    "flex items-start w-full",
                    "max-sm:bg-card-200 max-xs:px-4 max-xs:pt-16.25 max-sm:rounded-t-sm",
                    "xs:max-sm:pt-4 xs:max-sm:pl-4 xs:max-sm:pr-32",
                    "sm:max-xl:border-b-2 sm:max-xl:border-card-100 md:max-xl:pb-2.75 md:max-xl:mb-1.75 sm:max-md:pb-1.75 sm:max-md:mb-0.75",
                    "xs:max-xl:col-span-2",
                    "xl:items-center xl:mt-0.25")}>
                    <div className="flex-1">
                        {/* Product name */}
                        <h3 className={cn(
                            "mt-0.75 mb-0.75 mr-2 text-2xl font-semibold text-pr-900 leading-6 line-clamp-2 tracking-wide",
                            "max-xs:text-center max-sm:mr-0 max-xs:text-4xl max-xs:leading-8 max-xs:line-clamp-none",
                            "xs:max-sm:text-left xs:max-sm:text-3xl xs:max-sm:leading-7",
                            "sm:max-xl:line-clamp-1 md:text-3xl md:leading-7",
                            "sm:max-xl:mb-0.5",
                            "xl:mb-0.5 xl:mt-1.75")}>
                            {product_name.toUpperCase()}
                        </h3>

                        {/* Roaster */}
                        <div className={cn(
                            "flex items-center justify-between w-full ",
                            "max-xs:justify-center max-sm:-mt-0.25",
                            "xs:max-sm:justify-start",
                            "xl:flex-row-reverse xl:justify-end")}>
                            <Link
                                href={getRoasterPath(roaster.slug)}
                                onClick={(e) => e.stopPropagation()}
                                className="p-0 m-0 xl:pb-0.25"
                            >
                                <span className="text-base font-medium text-pr-800 hover:text-pr-500 leading-5">{roaster.name}</span>
                            </Link>
                            {(!isSm && isBestValue && isInStock) && <span className="font-extrabold text-pr-600 pr-1 leading-5">
                                Best Value
                                <span className="xl:inline hidden"> - </span>
                            </span>}
                        </div>
                    </div>
                </div>
                <div className={cn(
                    "flex flex-col items-start justify-between gap-3.5 pt-2.5 -mb-0.5 w-full",
                    "max-xs:items-center max-sm:px-4 max-sm:pb-5 max-sm:bg-card-200 max-sm:pt-4.5 max-sm:gap-4.5",
                    "xs:max-sm:col-span-2 xs:max-sm:items-start xs:max-sm:pt-2.5",
                    "sm:max-xl:gap-0.25",
                    "xl:flex-col-reverse xl:gap-0.75 xl:pt-0 xl:justify-center xl:mb-1.25")}>

                    <div className={cn(
                        "flex items-center gap-1",
                        "max-xs:pb-1 max-sm:flex-wrap max-sm:w-full max-xs:justify-center",
                        "xs:max-sm:items-start xs:max-sm:pb-0")}>
                        {/* Roasts */}
                        {hasRoasts && (
                            <RoastLabel roasts={roasts} limit={2} size={"sm"} variant={"text"} className={"max-xs:justify-center max-sm:gap-1 max-sm:inline-flex"} />
                        )}
                        {/* Flavours */}
                        {flavourText && (
                            <div className={cn(
                                "text-base text-left capitalize text-pr-800 sm:line-clamp-1",
                                "max-xs:text-center max-sm:inline-flex max-sm:text-pr-900",
                                "xs:max-sm:text-left"
                            )}>{flavourText}</div>
                        )}
                    </div>
                    {(isXs && sca_cup_score) && <CupScoreBadge
                        score={sca_cup_score}
                        variant={"card"}
                        className={"mb-1.5"}
                        hasBackground={true}
                        hasTitle={true}
                    />}

                    <div className={cn(
                        "flex items-center gap-2 sm:-ml-2",
                        "max-sm:gap-4",
                        "max-sm:w-full max-xs:flex-col max-sm:border-t-2 max-sm:border-card-100 max-sm:pt-5 max-sm:mt-1",
                        'xs:max-sm:flex-wrap'
                    )}>
                        {((!isXs) && (sca_cup_score || !isSm)) && <CupScoreBadge
                            score={sca_cup_score}
                            variant={"card"}
                            className={"flex-shrink mt-1 mr-1"}
                            hasBackground={isSm}
                            hasTitle={isSm}
                            isStacked={isSm}
                        />}
                        <AttributeSection
                            attributeData={attributes}
                            variant={"icon"}
                            className={cn(
                                "-ml-2 gap-1 flex",
                                "sm:max-xl:px-0 sm:max-xl:gap-0",
                                "max-sm:gap-y-4 max-sm:px-0 max-sm:flex-wrap max-sm:items-start max-sm:ml-0 max-xs:w-full xs:max-sm:w-2/3",
                                "xs:max-sm:flex-1 xs:max-sm:min-w-0"
                            )}
                            iconSize={"md"}
                            hasBackground={false}
                            hasLabel={isSm ? true : false}
                            showInactive={isSm ? true : false}
                            hasColorIcons={isSm}
                        />

                    </div>
                </div>

                {/* Comparison section */}
                <div className={cn(
                    "flex flex-col items-end justify-end gap-1.75 pb-0.75",
                    "max-sm:py-4 max-sm:px-4",
                    "max-xl:justify-end",
                    "xl:justify-center xl:pt-2.5 xl:pb-3.5 xl:gap-1.5"
                )}>
                    <Tooltip>

                        <TooltipTrigger asChild >
                            <div className={cn(
                                "flex items-center gap-2 mt-1.5",
                                "max-sm:w-full",
                                isInStock ? "max-sm:justify-end" : "max-sm:justify-between"
                            )}>
                                {(isSm && !isInStock) &&
                                    <span className="text-disabled-400 uppercase text-lg font-bold mt-0.75">
                                        Out of Stock
                                    </span>}
                                <div className="flex items-end gap-2">
                                    <span className={cn(
                                        "text-3xl font-bold leading-9 -mb-0.5",
                                        isInStock ? "text-pr-900" : "text-disabled-400"
                                    )}>
                                        £{variant?.price?.toFixed(2) ?? "--.--"}
                                    </span>
                                    <span className={cn(
                                        "mb-1.25 py-1.25 px-0.25 rounded-xs",
                                        isInStock ? "border-green-400 border-1 text-green-400" : "bg-disabled-400 text-white")}>
                                        {isInStock ? (
                                            <CheckIcon className="w-3 h-3" title="In stock" />
                                        ) : (
                                            <XMarkIcon className="w-3 h-3" title="Out of stock" />
                                        )}
                                    </span>
                                </div>
                            </div>
                        </TooltipTrigger>
                        <DefaultTooltip description={isInStock ? "In-stock" : "Out of stock"} align="end" />
                    </Tooltip>
                    <div className={cn(
                        "flex max-sm:w-full max-sm:items-center",
                        isBestValue && isInStock
                            ? "max-sm:justify-between"
                            : "max-sm:justify-end"
                    )}>
                        {(isSm && isInStock && isBestValue) && <BestValueTag variant="outline" />}

                        <div className="flex items-center gap-1 border-1 border-pr-300 rounded-sm">
                            <span className={cn(
                                "bg-pr-300 px-2 pt-0.25",
                                isInStock ? "text-pr-700" : "text-card-100"
                            )}>
                                {selectedWeight === "1000" ? "1kg" : selectedWeight + "g"}
                            </span>
                            <span className={cn(
                                "text-base leading-4 font-normal px-2 pt-0.25",
                                isInStock ? "text-pr-700" : "text-disabled-400"
                            )}>{pricePerKg} /kg
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
