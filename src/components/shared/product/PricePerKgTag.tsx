import { REGIONS } from "@/consts/regionConfig";
import useDisplayWeight from "@/hooks/useDisplayWeight";
import useSelectVariant from "@/hooks/useSelectVariant";
import { useRegionStore } from "@/stores/useRegionStore";
import { SearchState, useSearchStore } from "@/stores/useSearchStore";
import { ProductVariant } from "@/types/product";
import { cn } from "@/utils/classes/merge";

export default function PricePerKgTag({
    variants,
    isInStock
}: {
    variants: ProductVariant[];
    isInStock: boolean;
}) {

    const selectedWeight = useSearchStore((s: SearchState) => s.selectedWeight);
    const region = useRegionStore((s) => s.region);
    const { symbol, largeWeightUnit } = REGIONS[region];

    const { variant, hasMatchingVariant } = useSelectVariant(variants ?? [])

    const pricePerKg = variant?.price_per_kg
        ? `${symbol}${variant?.price_per_kg.toFixed(2)} /${largeWeightUnit}`
        : null;
    const displaySelectedWeight = useDisplayWeight(selectedWeight);
    const displayVariantWeight = useDisplayWeight(variant.weight ?? 0);

    return (
        <div className="flex items-center gap-1 border-1 border-pr-300 rounded-sm">
            <span className={cn(
                "bg-pr-300 px-2 pt-0.25",
                isInStock ? "text-pr-700" : "text-card-100"
            )}>
                {!hasMatchingVariant && <span className="line-through text-pr-700/50 pr-1.5">{displaySelectedWeight}</span>}
                <span>{displayVariantWeight}</span>
            </span>
            <span className={cn(
                "text-base leading-4 font-normal px-2 pt-0.25",
                isInStock ? "text-pr-700" : "text-disabled-400"
            )}>{pricePerKg}
            </span>
        </div>
    )
}