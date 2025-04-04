import { JSX } from "react";
import { ProductVariant, ProductRoaster } from "@/types/product"
import BrandLogo from "@/components/product/BrandLogo";

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
            className="w-full xs:w-[calc(50%-8px)] "
            aria-label={ariaLabel}
            role="listitem"
        >
            <div className="group shadow-b-neumorphic hover:scale-101 bg-pr-100 flex flex-col border-pr-300 border-2 items-center hover:shadow-none pt-6 pb-2.5 px-3 xs:pt-6 xs:pb-5.5 xs:px-6 font-sofia-sans text-2xl xs:text-3xl font-normal gap-10">
                <div className="flex flex-row flex-wrap flex-1 text-center">
                    <div className="w-full mb-4 flex py-2.25">
                        <BrandLogo
                            src={roaster.logo_img_url}
                            alt={roaster.alt_text}
                            height={20}
                            width={20}
                            className="h-[30px] w-full object-contain inline-block"
                        />
                    </div>
                    <div className="w-full leading-none border-t-2 border-pr-300 pt-7.75 pl-3">
                        {displayWeight}
                        <span className="text-lg"> {weightUnit}</span>
                    </div>
                    <div className="w-full font-sofia-sans text-5xl leading-none">
                        {displayPrice}
                    </div>
                    <span className="w-full font-normal text-pr-600 text-base leading-none self-baseline pt-1.5">
                        {displayPerKg}
                    </span>
                </div>
                <div
                    className="w-full border-sc-100 border-2 text-sc-100 group-hover:bg-sc-100 group-hover:text-white transition-colors duration-100 ease-in-out px-2 pt-3.25 pb-3 xs:p-3 xs:pt-3.5 leading-5 text-center font-sofia-sans-condensed font-black text-3xl self-center"
                    aria-hidden="true"
                >
                    <span className="text-xl font-bold tracking-wide">
                        VISIT STORE →
                    </span>
                    <span className="hidden">→</span>
                </div>
            </div>
        </a>
        // <a
        //     href={url}
        //     target="_blank"
        //     rel="noopener noreferrer"
        //     className="w-full xs:w-[calc(50%-8px)] sm:w-auto"
        //     aria-label={ariaLabel}
        //     role="listitem"
        // >
        //     <div className="group shadow-b-neumorphic hover:scale-101 bg-pr-100 flex flex-col sm:flex-row border-pr-300 border-2 items-center hover:shadow-none pt-6 pb-2.5 px-3 xs:pt-6 xs:pb-5.5 xs:px-6 sm:py-5 sm:px-6 font-sofia-sans text-2xl xs:text-3xl sm:text-4xl font-normal gap-10 sm:gap-4">

        //         <div className="flex flex-row flex-wrap flex-1 gap-y-1 sm:gap-y-0 text-center">
        //             <div className="w-full sm:w-1/2 leading-none order-2 sm:text-left sm:order-none border-t-2 border-pr-300 sm:border-none pt-8 sm:pt-0">
        //                 {displayWeight}
        //                 <span className="text-lg"> {weightUnit}</span>
        //             </div>
        //             <div className="w-full sm:w-1/2 font-sofia-sans text-5xl sm:text-4xl sm:text-right leading-none order-3 sm:order-none pt-1 sm:pt-0">
        //                 {displayPrice}
        //             </div>
        //             <div className="w-full sm:w-1/2 order-1 sm:order-none mb-4 sm:mb-0 flex @sm:items-start">
        //                 <BrandLogo
        //                     src={roaster.logo_img_url}
        //                     alt={roaster.alt_text}
        //                     height={20}
        //                     width={20}
        //                     className="h-[24px] sm:h-[16px] w-full sm:w-auto object-contain inline-block group-hover:scale-105"
        //                 />
        //             </div>
        //             <span className="w-full sm:w-1/2 font-normal text-pr-600 sm:text-right text-base leading-none self-baseline order-4 sm:order-none">
        //                 {displayPerKg}
        //             </span>
        //         </div>
        //         <div
        //             className="w-full sm:w-auto border-sc-100 border-2 text-sc-100 group-hover:bg-sc-100 group-hover:text-white transition-colors duration-100 ease-in-out p-2 pt-3.25 pb-3 xs:p-3 xs:pt-3.5 sm:p-3 sm:pt-4.5 sm:pb-4 leading-5 text-center font-sofia-sans-condensed font-black text-3xl self-center"
        //             aria-hidden="true"
        //         >
        //             <span className="text-xl font-bold tracking-wide sm:hidden">
        //                 VISIT STORE →
        //             </span>
        //             <span className="hidden sm:block">→</span>
        //         </div>
        //     </div>
        // </a>
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
