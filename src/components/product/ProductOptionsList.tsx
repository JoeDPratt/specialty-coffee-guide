import type { ProductVariant } from "@/types/product";
import Pouch from "@public/images/coffee-pouch-2.svg";
import type { JSX } from "react";
import BestValueTag from "../shared/product/BestValueTag";
import { useRegionStore } from "@/stores/useRegionStore";
import { REGIONS } from "@/consts/regionConfig";
import useDisplayWeight from "@/hooks/useDisplayWeight";

interface productOptionsListProps {
    lowestPricePerKg: number | null;
    variants: ProductVariant[];
    url: string;
}

function ProductOption({
    lowestPricePerKg,
    option,
    url,
}: {
    lowestPricePerKg: number;
    option: ProductVariant;
    url: string;
}): JSX.Element {
    const region = useRegionStore((s) => s.region)
    const { symbol, currency } = REGIONS[region]

    const displayWeight = useDisplayWeight(option.weight ?? 0);
    const displayPrice = `${symbol}${option?.price?.toFixed(2)}`;
    const perKgRounded = option?.price_per_kg?.toFixed(2);
    const displayPerKg = `${symbol}${perKgRounded} /kg`;
    const isBestValue = option?.price_per_kg && lowestPricePerKg >= option?.price_per_kg;

    const ariaLabel = `Buy ${displayWeight} for ${displayPrice}. Price per kilogram is ${perKgRounded}${currency}`;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full xs:w-[calc(50%-8px)]"
            aria-label={ariaLabel}
            role="listitem"
        >
            {/* <div className="group shadow-b-neumorphic hover:scale-101 flex flex-row border-pr-300 border-2 items-center hover:shadow-none pt-6 pb-2.5 px-3 xs:pt-6 xs:pb-5.5 xs:px-6 font-sofia-sans font-normal gap-10"> */}
            <div className="group flex flex-col items-center bg-card-200 hover:shadow-none font-sofia-sans font-normal  px-4 py-10 gap-4 border-1 border-card-100 hover:border-white hover:bg-pr-300/30 transition-colors duration-150 ease-in-out rounded-md">
                <div className="relative w-34 aspect-[3/4] shrink-0 group-hover:scale-105">
                    <Pouch className="w-full h-full object-cover fill-pr-700" />

                    <div className="absolute inset-0 flex flex-col items-center justify-end mb-10 gap-3.5">
                        {isBestValue && <BestValueTag />}
                        <div className="text-center leading-none text-3xl text-white">
                            {displayWeight}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 text-center border-t-2 border-pr-300">
                    <div className="w-full font-sofia-sans text-5xl xs:text-4xl sm:text-5xl leading-none pt-4">
                        {displayPrice}
                    </div>
                    <span className="w-full font-normal text-pr-900/70 text-lg leading-none self-baseline pt-1.5">
                        {displayPerKg}
                    </span>
                </div>
            </div>
        </a>
    );
}

export default function ProductOptionList({
    lowestPricePerKg,
    variants,
    url,
}: productOptionsListProps): JSX.Element {

    return (
        <div
            className="flex flex-row flex-wrap gap-4 w-full"
            role="list"
            aria-label="Product purchase options"
        >
            {[...variants]
                .sort((a, b) => (a.weight || 0) - (b.weight || 0))
                .map((option, index) => (
                    <ProductOption
                        option={option}
                        url={url}
                        lowestPricePerKg={lowestPricePerKg ?? 0}
                        key={(option.price || 0) + index}
                    />
                ))}
        </div>
    );
}
