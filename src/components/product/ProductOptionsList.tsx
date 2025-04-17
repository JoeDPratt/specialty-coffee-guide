import type { ProductVariant } from "@/types/product";
import Pouch from "@public/images/coffee-pouch-2.svg";
import type { JSX } from "react";
import BestValueTag from "../shared/product/BestValueTag";

interface productOptionsListProps {
    lowestPricePerKg: number | null;
    productOptions: ProductVariant[];
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
    const currency = option.currency === "GBP" ? "£" : "$";
    const price = option.price || 0;
    const weight = option.weight ?? 0;
    const weightUnit = weight >= 1000 ? "kg" : "g";
    const displayWeight = `${weight >= 1000 ? weight / 1000 : weight}`;
    const displayPrice = `${currency}${price.toFixed(2)}`;
    const perKgValue = option.price_per_kg ?? null;
    const perKgRounded = perKgValue && perKgValue.toFixed(2);
    const displayPerKg = `${currency}${perKgRounded} /kg`;
    const isBestValue = perKgValue && lowestPricePerKg >= perKgValue;

    const ariaLabel = `Buy ${displayWeight}${weightUnit} for ${displayPrice}. Price per kilogram is ${perKgRounded}${currency}`;

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
            <div className="group flex flex-col items-center bg-pr-100/70 hover:shadow-none font-sofia-sans font-normal  px-4 py-10 gap-4 border-1 border-white/30 hover:border-white hover:bg-pr-300/30 transition-colors duration-150 ease-in-out rounded-md">
                <div className="relative w-30 aspect-[3/4] shrink-0 group-hover:scale-105">
                    <Pouch className="w-full h-full object-cover fill-pr-700" />

                    <div className="absolute inset-0 flex flex-col items-center justify-end mb-10 gap-3.5">
                        {isBestValue && <BestValueTag />}
                        <div className="text-center leading-none text-3xl text-white">
                            {displayWeight}
                            <span className="text-base">{weightUnit}</span>
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
    productOptions,
    url,
}: productOptionsListProps): JSX.Element {
    return (
        <div
            className="flex flex-row flex-wrap gap-4 w-full"
            role="list"
            aria-label="Product purchase options"
        >
            {[...productOptions]
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
