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
import { CheckCircleIcon, XCircleIcon, FireIcon, CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useBreakpointStore } from '@/stores/useBreakpointStore'
import { cn } from "@/utils/classes/merge";
import {
    Tooltip,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { DefaultTooltip } from "@/components/tooltips/DefaultTooltip";
import { useSearchStore } from "@/stores/useSearchStore";
import RoastAndFlavourTagsRow from "./RoastAndFlavourTagsRow";

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
    const selectedWeight = useSearchStore((s) => s.selectedWeight);

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
    const isBestValue = false; // Add logic for best value
    const isInStock = product?.is_instock ?? false;

    return (
        <div
            onClick={() => router.push(getProductPath(slug))}
            className="@container/card relative group max-w-[460px] flex flex-col h-full w-full mx-auto bg-card-100 hover:shadow-xl transition-all overflow-hidden rounded-xl cursor-pointer hover:scale-101 active:scale-99"
        >
            <div className={cn(
                "absolute z-10 top-10 max-w-9/10",
                "@card-sm:top-14",
                "@card-md:top-18"
            )}>
                <span className={cn(
                    "font-teko tracking-wide font-semibold leading-8 text-3xl rounded-sm rounded-l-none",
                    "bg-pr-900 text-white box-decoration-clone pl-3 pr-2.5 pt-1",
                    "@card-sm:pl-4 @card-sm:pr-3 @card-sm:leading-9 @card-sm:text-4xl",
                    "@card-md:pt-0.5 @card-md:pb-0.25 @card-md:pr-4 @card-md:leading-12 @card-md:text-5xl "
                )}>
                    {product_name.toUpperCase()}
                </span>

                <Link
                    href={getRoasterPath(roaster.slug)}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="hover:text-pr-500 -mt-0.75">
                        <span className={cn(
                            "bg-pr-900 box-decoration-clone w-full text-base font-normal tracking-wide text-white py-1 pl-3 pr-2 rounded-r-sm ",
                            "@card-sm:pl-4 @card-sm:py-1.5 @card-sm:pr-3",
                            "@card-md:text-lg @card-md:py-2.75 @card-md:pr-4",
                        )}>{roaster.name}</span></div>
                </Link>
            </div>


            {/* Image */}
            <motion.div
                layoutId={`product-image-${product.slug}`}
                transition={subtleSpring}
                className={cn(
                    "relative w-full aspect-[1/1] bg-card-100 border-6 border-card-100 rounded-lg",
                    "@card-sm:border-6"
                )}
            >
                {sca_cup_score && <CupScoreBadge
                    score={sca_cup_score}
                    variant={"card"}
                    backgroundColor={"dark"}
                    padding={"px-2.5 pt-2.25 pb-1.75 @card-sm:px-3 @card-sm:pt-2.5 @card-sm:pb-2"}
                    className={cn(
                        "absolute -bottom-4 right-3 z-10 rounded-lg border-3 border-card-100",
                        "@card-sm:right-4",
                        "@card-md:right-6")}
                />}

                <Image
                    loader={cloudinaryLoader}
                    src={imageUrl}
                    alt={product_name}
                    fill
                    className="object-cover rounded-lg bg-card-100"
                    sizes="(min-width: 768px) 25vw, 100vw"
                    placeholder="blur"
                    blurDataURL={blurredImage}
                />

            </motion.div>

            {/* Attriibutes and tags */}
            <div className="flex flex-col items-center gap-y-3.25 px-4 pt-5.75 pb-6.5 @card-sm:px-6">
                <RoastAndFlavourTagsRow roasts={roasts} flavours={flavours} variant={"text"} />
                <AttributeSection
                    attributeData={attributes}
                    variant={"pill"}
                    className={"flex-wrap"}
                    showInactive={false}
                />

            </div>
            {/* Spacer, evens out uneven height cards */}
            <div className={cn(
                "px-4 @card-sm:px-6 pt-0 flex flex-col flex-grow overflow-hidden",
            )}></div>

            {/* Comparison section */}
            <div className={cn(
                "flex flex-col items-end justify-end gap-1.75 pb-6 mx-4 pt-3 border-t-2 border-pr-300",
                "@card-sm:mx-6"
            )}>
                <Tooltip>
                    <TooltipTrigger asChild >
                        <div className={cn(
                            "flex items-center gap-2 mt-1.5 ",
                            "w-full",
                            isInStock ? "justify-end" : "justify-between"
                        )}>
                            {!isInStock &&
                                <span className="text-disabled-400 text-lg font-normal mt-0.75">
                                    Out of Stock
                                </span>}
                            <div className="flex items-end gap-2">
                                <span className={cn(
                                    "text-3xl font-bold leading-9 -mb-0.5",
                                    isInStock ? "text-pr-900" : "text-disabled-400"
                                )}>
                                    £{variant?.price?.toFixed(2) ?? "--.--"}
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
        </div >
    );
}
