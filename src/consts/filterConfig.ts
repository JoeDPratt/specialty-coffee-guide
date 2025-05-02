// src/consts/filterConfig.ts
import type { AttributeKey } from "@/consts/attributeConfig";

export interface FilterConfig {
    label: string;
    color: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    attributeKeys: AttributeKey[]; // for checking on product
    matchLogic?: "equals" | "or";
}

export const filterConfig = {
    is_organic: {
        label: "Organic",
        color: "green",
        attributeKeys: ["is_organic"],
        matchLogic: "equals",
    },
    is_single_origin: {
        label: "Single Origin",
        color: "orange",
        attributeKeys: ["is_single_origin"],
        matchLogic: "equals",
    },
    is_decaf: {
        label: "Decaf / Low Caf",
        color: "blue",
        attributeKeys: ["is_decaf", "is_lowcaf"],
        matchLogic: "or",
        mapTo: "is_decaf",
    },
    is_mycotoxin_free: {
        label: "Mycotoxin Free",
        color: "aqua",
        attributeKeys: ["is_mycotoxin_free"],
        matchLogic: "equals",
    },
    is_fairtrade: {
        label: "Fairtrade",
        color: "tan",
        attributeKeys: ["is_fairtrade"],
        matchLogic: "equals",
    },
} as const;

export type FilterKey = keyof typeof filterConfig;
