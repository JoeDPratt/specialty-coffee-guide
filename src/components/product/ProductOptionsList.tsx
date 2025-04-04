import { JSX } from "react";
import { ProductVariant, ProductRoaster } from "@/types/product"
import BrandLogo from "@/components/product/BrandLogo";
import Pouch from '@/../public/images/coffee-pouch-outline-2.svg';

interface productOptionsListProps {
    roaster: ProductRoaster;
    productOptions: ProductVariant[];
    url: string;
}

function ProductOption({
    roaster,
    option,
    url
}: {
    roaster: ProductRoaster;
    option: ProductVariant;
    url: string;
}) {
    const currency = option.currency === "GBP" ? "£" : "$";
    const price = option.price || 0;
    const weight = option.weight || 0;
    const weightUnit = option.weight >= 1000 ? "kg" : "g";
    const displayWeight = `${option.weight >= 1000 ? weight / 1000 : weight}`;
    const displayPrice = `${currency}${price.toFixed(2)}`;
    const perKgValue = option.price_per_kg;
    const perKgRounded = perKgValue.toFixed(2);
    const displayPerKg = `${currency}${perKgRounded} /kg`;

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
            <div className="group flex flex-col items-center bg-pr-50 hover:shadow-none shadow-b-neumorphic font-sofia-sans font-normal  px-4 py-10 gap-4 border-2 border-pr-300 hover:border-sc-100 hover:bg-pr-100 transition-colors duration-150 ease-in-out">
                <div className="relative w-20 aspect-[3/4] shrink-0 group-hover:scale-105">
                    <Pouch className="w-full h-full object-cover fill-brown-700" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-12">
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
                    <span className="w-full font-normal text-pr-600 text-lg leading-none self-baseline pt-1.5">
                        {displayPerKg}
                    </span>
                </div>
            </div>
        </a >
    );
}

export default function ProductOptionList({
    roaster,
    productOptions,
    url,
}: productOptionsListProps) {
    return (
        <div
            className="flex flex-row flex-wrap gap-4 w-full"
            role="list"
            aria-label="Product purchase options"
        >
            {productOptions.map((option, index) => (
                <ProductOption
                    roaster={roaster}
                    option={option}
                    url={url}
                    key={(option.price || 0) + index}
                />
            ))}
        </div>
    );
}
