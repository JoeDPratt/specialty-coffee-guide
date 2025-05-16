import { REGIONS } from "@/consts/regionConfig";
import { useRegionStore } from "@/stores/useRegionStore";

/**
 * Returns a formatted weight string (e.g. "250 g", "12 oz", "1.5 kg", "2 lb") 
 * localized for the current region.
 *
 * - Uses the active region from the global store to determine metric or imperial.
 * - Applies smart formatting: 
 *     - shows grams/ounces below 1kg/1lb,
 *     - rounds kg/lb to 1 decimal place but omits trailing ".0" for whole numbers.
 * - Handles automatic conversion and is safe for use in React components.
 *
 * @param weight The weight in grams to display
 * @returns Localized weight string for UI
 */

export function formatImperialWeight(grams: number): string {
    const OUNCES_PER_GRAM = 0.03527396;
    const POUNDS_PER_GRAM = 0.00220462;

    if (grams < 454) {
        // Show whole oz, always round down (floor)
        const oz = Math.floor(grams * OUNCES_PER_GRAM);
        return `${oz}oz`;
    } else {
        // Show lbs, 1 decimal unless exactly whole
        const lbs = grams * POUNDS_PER_GRAM;
        const lbsRounded = Math.round(lbs * 10) / 10;
        if (Number.isInteger(lbsRounded)) {
            return `${lbsRounded}lb`;
        }
        return `${lbsRounded.toFixed(1)}lb`;
    }
}

export function formatMetricWeight(weight: number): string {
    if (weight < 1000) {
        return `${weight}g`;
    } else {
        const kg = weight / 1000;
        const kgRounded = Math.round(kg * 10) / 10;
        if (Number.isInteger(kgRounded)) {
            return `${kgRounded}kg`;
        }
        return `${kgRounded.toFixed(1)} kg`;
    }
}

export default function useDisplayWeight(weight: number) {

    const region = useRegionStore((s) => s.region);
    const regionConfig = REGIONS[region]
    const { smallWeightUnit } = regionConfig

    return smallWeightUnit === "g" ? formatMetricWeight(weight) : formatImperialWeight(weight)

}