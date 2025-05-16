import { REGIONS } from "@/consts/regionConfig";
import { useRegionStore } from "@/stores/useRegionStore";
import { SearchState, useSearchStore } from "@/stores/useSearchStore";
import type { ProductVariant } from "@/types/product";

export default function useSelectVariant(variants: ProductVariant[]) {

    const selectedWeight = useSearchStore((s: SearchState) => s.selectedWeight);
    const region = useRegionStore((s) => s.region);
    const regionConfig = REGIONS[region]
    const { smallBagSize, largeBagSize } = regionConfig
    const variant = getBestVariant(variants ?? [], selectedWeight, smallBagSize, largeBagSize);

    return {
        variant,
        hasMatchingVariant: variant.weight === selectedWeight,
    }
}


function getBestVariant(
    variants: ProductVariant[],
    selectedWeight: number,
    smallBagSize: number,
    largeBagSize: number,
) {

    // 1. Exact match
    const exact = variants.find(v => v.weight === selectedWeight);
    if (exact) return exact;

    // 2. Closest within 10%
    const within10 = variants
        .filter(v => v.weight && v.weight >= selectedWeight * 0.9 && v.weight <= selectedWeight * 1.1);

    if (within10.length) {
        // Sort by absolute distance, pick the closest
        return within10.reduce((prev, curr) =>
            Math.abs(curr.weight ?? 0 - selectedWeight) < Math.abs(prev.weight ?? 0 - selectedWeight)
                ? curr : prev
        );
    }

    // 3. Try the other major size (e.g. 250 <-> 1000)
    const other = variants.find(v => v.weight === (selectedWeight === smallBagSize ? largeBagSize : smallBagSize));
    if (other) return other;

    // 4. Fallback to first
    return variants[0];
}