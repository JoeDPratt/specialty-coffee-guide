import { JSX } from "react";
import { ProductVariant } from "@/types/product"
import BrandLogo from "@/components/product/BrandLogo";

interface productOptionsListProps {
    productOptions: ProductVariant[];
    url: string;
    brandLogoUrl: string;
}

function ProductOption({ option, url, brandLogoUrl }: { option: ProductVariant, url: string, brandLogoUrl: string }) {

    const currency = option.currency === "GBP" ? "£" : "$"
    const price = option.price || 0
    const weight = option.weight || 0
    const weightUnit = option.weight >= 1000 ? "kg" : option.weight_unit || "g"
    const displayWeight = `${option.weight >= 1000 ? weight / 1000 : weight }${weightUnit}`
    const displayPrice = `${currency}${price}`
    const perKgValue = (1000 / weight) * price
    const perKgRounded = perKgValue.toFixed(2)
    const displayPerKg = `${currency}${perKgRounded} /kg`
    
    return (
        <a href={url} target="_blank">
            <div className="flex flex-row bg-white items-center hover:shadow-lg pt-4 pb-3.5 px-4 sm:py-5 sm:px-6 font-sofia-sans text-2xl xs:text-3xl sm:text-4xl font-normal gap-4">
                <div className="flex flex-row flex-wrap justify-between self-baseline flex-1 gap-y-2 sm:gap-y-1">
                    <div className="w-1/2 leading-none">{displayWeight}</div>
                    <div className=" w-1/2 font-sofia-sans text-right leading-none">{displayPrice}</div>
                    <BrandLogo src={brandLogoUrl} alt="Brand Logo" height={20} width={20} className="h-[14px] sm:h-[16px] w-auto object-contain inline" />
                    <span className="w-1/2 font-normal text-pr-600 text-right text-sm xs:text-base leading-none self-baseline">{displayPerKg}</span>
                </div>
                <div className="border-sc-100 border-2 text-sc-100 hover:bg-sc-100 hover:text-white transition-colors duration-100 ease-in-out p-2 pt-3.25 pb-3 xs:p-3 xs:pt-3.5 sm:p-3 sm:pt-4.5 sm:pb-4 leading-5 text-right font-black text-3xl xs:text-4xl self-center">→</div>
            </div>
        </a>
    )
}
export default function ProductOptionList({ productOptions, url, brandLogoUrl }: productOptionsListProps) {

    return (
        <div className="flex flex-col gap-2 w-full">
            { productOptions.map((option, index) => (
                <ProductOption option={option} url={url} key={(option.price || 0) + index} brandLogoUrl={brandLogoUrl} /> )
                )}
        </div>
    )
    
}