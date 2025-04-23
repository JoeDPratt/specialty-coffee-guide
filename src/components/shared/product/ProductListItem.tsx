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

import { useLongPress } from "@/hooks/useLongPress";

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

    const [tooltipOpen, setTooltipOpen] = useState(false);
    const longPressEvents = useLongPress(() => setTooltipOpen(true), 600);

    const [selectedWeight, setSelectedWeight] = useState<250 | 1000>(250);
    const router = useRouter();
    // const variantDisplayWeight = 250;

    const isXs = useBreakpointStore((s) => s.isXs)
    const imageUrl = images?.[0]?.image_url || "/placeholder.png";
    const blurredImage = getBlurURL(imageUrl);

    const variant =
        product_variants?.find((v) => { return v.weight === selectedWeight })
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
                "@container/card group w-full flex flex-col items-start transition-all overflow-hidden cursor-pointer rounded-md hover:shadow-md",
                "sm:flex-row xs:bg-card-200")}
        >
            {/* Image */}
            <motion.div
                layoutId={`product-image-${product.slug}`}
                transition={subtleSpring}
                className={cn(
                    "relative aspect-[1/1]",
                    "max-xs:w-24 max-xs:-mb-12 max-xs:ml-4 max-xs:border-4 max-xs:border-card-200 max-xs:rounded-sm max-xs:shadow-sm",
                    "sm:h-full"
                )}
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
            {isXs && <CupScoreBadge
                score={sca_cup_score}
                variant={"card"}
                className={"absolute right-4 top-8"}
                background={true}
            />}

            {/* Text Content */}
            <div className={cn(
                "grid grid-cols-1 grid-rows-[auto_auto_auto] w-full",
                "max-xs:gap-y-0 max-xs:bg-card-200 max-xs:rounded-md max-xs:border-4 max-xs:border-card-200",
                "xs:p-4",
                "md:px-6 md:py-5",
                "sm:max-xl:grid-cols-[1fr_auto] sm:max-xl:grid-rows-[auto_auto] sm:max-xl:gap-x-5",
                "xl:grid-cols-[4fr_3fr_auto] xl:grid-rows-1 xl:gap-5"
            )}>
                <div className={cn(
                    "flex items-start w-full",
                    "max-xs:bg-card-100 max-xs:px-4 max-xs:pt-15 max-xs:rounded-t-sm ",
                    "xs:max-xl:col-span-2",
                    "xl:items-center")}>
                    <div className="flex-1">
                        {/* Product name */}
                        <h3 className={cn(
                            "mt-0.75 mb-0.75 mr-2 text-2xl font-semibold text-pr-900 leading-6 line-clamp-2 tracking-wide",
                            "max-xs:text-left",
                            "sm:max-xl:line-clamp-1 md:text-3xl md:leading-7",
                            "xl:mb-2.5 xl:mt-1.25")}>
                            {product_name.toUpperCase()}
                        </h3>

                        {/* Roaster */}
                        <div className="flex items-center max-xs:justify-start xl:pt-0.25 w-full">
                            {isBestValue && <span className="font-extrabold text-pr-600 pr-1 leading-5">Best Value -</span>}
                            <Link
                                href={getRoasterPath(roaster.slug)}
                                onClick={(e) => e.stopPropagation()}
                                className="p-0 m-0"
                            >
                                <div className="text-base font-normal text-pr-800 hover:text-pr-500 leading-5">{roaster.name}</div>
                            </Link>

                        </div>
                    </div>
                </div>
                <div className={cn(
                    "flex flex-col items-start justify-between gap-3.5 pt-2.5 -mb-0.5 w-full",
                    "max-xs:items-start max-xs:px-4 max-xs:py-4 max-xs:flex-row max-xs:bg-card-100",
                    "xs:max-sm:col-span-2",
                    "xl:flex-col-reverse xl:gap-2 xl:pt-0 xl:justify-center")}>
                    <div className={cn(
                        "flex items-center gap-1",
                        "max-xs:flex-wrap max-xs:w-1/2 max-xs:pt-2")}>
                        {/* Roasts */}
                        {hasRoasts && (
                            <RoastLabel roasts={roasts} limit={2} size={"sm"} variant={"text"} className={"max-xs:w-full max-sm:justify-start"} />
                        )}
                        {/* Flavours */}
                        {flavourText && (
                            <div className="text-base text-left max-xs:w-full capitalize font-light text-pr-900 xs:line-clamp-1">{flavourText}</div>
                        )}
                    </div>
                    <div className="flex items-center gap-3 lg:gap-4 max-xs:w-1/2">
                        {/* <AttributeSection attributeData={attributes} variant={"icon"} className={"gap-3 flex max-md:hidden"} /> */}
                        {!isXs && <CupScoreBadge
                            score={sca_cup_score}
                            variant={"card"}
                            className={"flex-shrink mt-1 "}
                            background={false}
                        />}
                        <AttributeSection
                            attributeData={attributes}
                            variant={isXs ? "icon-label" : "icon-only"}
                            className={cn(
                                "-ml-2 gap-1 lg:gap-2 flex",
                                "max-xs:flex-wrap max-xs:items-start max-xs:-ml-3 max-xs:gap-2"
                            )}
                        />

                    </div>
                </div>

                {/* Comparison section */}
                <div className={cn(
                    "flex flex-col items-end justify-end gap-1.75 pb-0.75",
                    "max-xs:py-4 max-xs:px-4",
                    "max-xl:justify-end",
                    "xl:justify-center xl:pt-2.5 xl:pb-3.75"
                )}>
                    {/* <div className={cn("min-w-max max-sm:hidden",
                    !isBestValue && "hidden"
                )}
                >
                    <BestValueTag variant="outline" />
                </div> */}

                    <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>

                        <TooltipTrigger asChild >
                            <div className="flex items-center gap-2 mt-1.5">
                                {/* <div onClick={(e) => e.stopPropagation()}>
                                    <WeightToggle value={selectedWeight} onChange={setSelectedWeight} className={"text-sm py-0.5"} />
                                </div> */}
                                <span className={cn(
                                    "text-3xl font-bold leading-9 -mb-0.5",
                                    isInStock ? "text-pr-900" : "text-disabled-400"
                                )}>
                                    £{variant?.price?.toFixed(2) ?? "--.--"}
                                </span>
                                <span className={cn(
                                    "py-1.25 px-0.25 text-white rounded-xs",
                                    isInStock ? "bg-green-400" : "bg-disabled-400")}>
                                    {isInStock ? (
                                        <CheckIcon className="w-3 h-3" title="In stock" />
                                    ) : (
                                        <XMarkIcon className="w-3 h-3" title="Out of stock" />
                                    )}
                                </span>
                            </div>
                        </TooltipTrigger>
                        <DefaultTooltip description={isInStock ? "In-stock" : "Out of stock"} align="end" />
                    </Tooltip>
                    <div className="flex items-center gap-1 border-1 border-pr-300 rounded-sm">
                        <span className={cn(
                            "bg-pr-300 px-2 pt-0.25",
                            isInStock ? "text-pr-700" : "text-card-100"
                        )}>
                            {selectedWeight}g
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
    );
}
