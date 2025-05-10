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
import { cn } from "@/utils/classes/merge";
import {
    Tooltip,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { DefaultTooltip } from "@/components/tooltips/DefaultTooltip";

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
    const isBestValue = false; // Add logic for best value
    const isInStock = product?.is_instock ?? false;

    return (
        <div
            onClick={() => router.push(getProductPath(slug))}
            className="@container/card group flex flex-col h-full bg-card-100 hover:shadow-xl transition-all overflow-hidden rounded-md cursor-pointer hover:scale-101 active:scale-99"
        >
            {/* Image */}
            <motion.div
                layoutId={`product-image-${product.slug}`}
                transition={subtleSpring}
                className="relative w-full aspect-[1/1] bg-card-100"
            >
                <div className={cn(
                    "absolute z-10 top-10 max-w-9/10",
                    "@card-sm:top-10",
                    "@card-md:top-20"
                )}>
                    <span className={cn(
                        "font-teko tracking-wide font-semibold leading-8 text-3xl rounded-sm rounded-l-none",
                        "bg-pr-900 text-white box-decoration-clone pl-3 pr-2 pt-1",
                        "@card-sm:pl-6 @card-sm:pr-3 @card-sm:leading-9 @card-sm:text-4xl",
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
                                "@card-sm:pl-6 @card-sm:py-1.5 @card-sm:pr-3",
                                "@card-md:text-lg @card-md:py-2.75 @card-md:pr-4",
                            )}>{roaster.name}</span></div>
                    </Link>
                </div>
                {sca_cup_score && <CupScoreBadge
                    score={sca_cup_score}
                    variant={"card"}
                    backgroundColor={"light"}
                    padding={"px-2.5 pt-2.25 pb-1.75"}
                    className={cn(
                        "absolute -bottom-1 left-3 z-10 round-b-none",
                        "@card-sm:left-4",
                        "@card-md:left-6")}
                />}
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
            <div className="flex-col items-start justify-center px-4 pt-5 pb-2 @card-sm:px-6 bg-card-100 inset-shadow-xs">
                <div className="flex flex-row flex-wrap items-center gap-1 w-full mb-1">
                    {roasts && (
                        <RoastLabel roasts={roasts} limit={2} size={"sm"} variant={"outline"} className={"w-auto pr-2 my-1.75"} />
                    )}
                    <AttributeSection
                        attributeData={attributes}
                        variant={"icon"}
                        className={"-ml-3"}
                        hasBackground={false}
                        iconSize={"md"}
                        showInactive={false}
                    />
                </div>
                {flavourText && (
                    <div className={cn(
                        "text-base text-left capitalize text-pr-800 line-clamp-1 py-1 mb-2",

                    )}>{flavourText}</div>
                )}
                {/* Roasts */}

            </div>
            {/* Spacer, evens out uneven height cards */}
            <div className={cn(
                "px-4 @card-sm:px-6 pt-0 flex flex-col flex-grow overflow-hidden",

            )}>


            </div>
            {/* Comparison section */}
            <div className="px-4 @card-sm:px-6 pb-8">

                {/* Cup Score Price */}
                <div className="flex justify-between items-end border-t-2 border-pr-300 pt-4">

                    {/* <div className={cn("-mb-0.25",
                        !isBestValue && "opacity-0"
                    )}
                    >
                        <BestValueTag />
                    </div> */}
                    <Tooltip>
                        <TooltipTrigger asChild >
                            <div className="flex flex-col items-start text-left gap-1">
                                <div className="flex items-end gap-1.25 pt-1 font-medium text-pr-900">
                                    <span className={cn(
                                        "text-3xl font-bold",
                                        isInStock ? "text-pr-900" : "text-disabled-400"
                                    )}>
                                        £{variant?.price?.toFixed(2) ?? "--.--"}</span>
                                    <span className="pb-2">
                                        {isInStock ? (
                                            <CheckCircleIcon className="w-4 h-4 text-green-400" title="In stock" />
                                        ) : (
                                            <XCircleIcon className="w-4 h-4 text-disabled-400" title="Out of stock" />
                                        )}
                                    </span>
                                </div>
                                <div className={cn(
                                    "text-base leading-2 font-light",
                                    isInStock ? "text-pr-900" : "text-disabled-400"
                                )}>{variant?.weight}g - {pricePerKg} /kg

                                </div>
                            </div>
                        </TooltipTrigger>
                        <DefaultTooltip description={isInStock ? "In-stock" : "Out of stock"} align="end" />
                    </Tooltip>

                </div>
            </div>
        </div >
    );
}
