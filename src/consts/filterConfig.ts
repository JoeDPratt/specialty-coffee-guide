import OrganicIcon from "@/components/icons/icon-organic.svg";
import FairtradeIcon from "@/components/icons/icon-fairtrade.svg";
import DecafIcon from "@/components/icons/icon-decaf.svg";
import MycoIcon from "@/components/icons/icon-myco-free.svg";
import SingleOriginIcon from "@/components/icons/icon-single-origin.svg";

import type { AttributeKey } from "@/consts/attributeConfig";

export interface FilterConfig {
    label: string;
    color: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    attributeKeys: AttributeKey[]; // for checking on product
    matchLogic?: "equals" | "or" | "custom";
    mapTo?: string; // for query field override
}

export const filterConfig = {
    is_organic: {
        label: "Organic",
        icon: OrganicIcon,
        color: "green",
        attributeKeys: ["is_organic"],
        matchLogic: "equals",
    },
    is_single_origin: {
        label: "Single Origin",
        icon: SingleOriginIcon,
        color: "orange",
        attributeKeys: ["is_single_origin"],
        matchLogic: "equals",
    },
    is_decaf: {
        label: "Decaf / Low Caf",
        icon: DecafIcon,
        color: "blue",
        attributeKeys: ["is_decaf", "is_lowcaf"],
        matchLogic: "or",
        mapTo: "is_decaf",
    },
    is_mycotoxin_free: {
        label: "Mycotoxin Free",
        icon: MycoIcon,
        color: "aqua",
        attributeKeys: ["is_mycotoxin_free"],
        matchLogic: "equals",
    },
    is_fairtrade: {
        label: "Fairtrade",
        icon: FairtradeIcon,
        color: "tan",
        attributeKeys: ["is_fairtrade"],
        matchLogic: "equals",
    },
} as const;

export type FilterKey = keyof typeof filterConfig;
