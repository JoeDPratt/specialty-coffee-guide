// utils/filters/filterConfig.tsx
import DecafIcon from "@/components/icons/icon-decaf.svg"
import OrganicIcon from "@/components/icons/icon-organic.svg"
import SingleOriginIcon from "@/components/icons/icon-single-origin.svg"
import MycoFreeIcon from "@/components/icons/icon-myco-free.svg"
import FairtradeIcon from "@/components/icons/icon-fairtrade.svg"
import React from "react"

export interface FilterDefinition {
    label: string;
    key: keyof Filters;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    mapTo?: string; // Optional: if key !== column name
    accentColor?: string;
    matchLogic?: "equals" | "or" | "custom";
}

export type Filters = {
    is_organic: string;
    is_decaf: string;
    is_mycotoxin_free: string;
    is_single_origin: string;
    is_fairtrade: string;
    // add more here
};

export const filterDefinitions: FilterDefinition[] = [
    {
        label: "Organic",
        key: "is_organic",
        matchLogic: "equals",
        icon: OrganicIcon,
        accentColor: "var(--color-green-400)",
    },
    {
        label: "Single Origin",
        key: "is_single_origin",
        matchLogic: "equals",
        icon: SingleOriginIcon,
        accentColor: "var(--color-orange-400)",
    },
    {
        label: "Decaf / Low Caf",
        key: "is_decaf",
        matchLogic: "or",
        icon: DecafIcon,
        accentColor: "var(--color-blue-400)",
    },
    {
        label: "Mycotoxin Free",
        key: "is_mycotoxin_free",
        matchLogic: "equals",
        icon: MycoFreeIcon,
        accentColor: "var(--color-aqua-400)",
    },
    {
        label: "Fairtrade",
        key: "is_fairtrade",
        matchLogic: "equals",
        icon: FairtradeIcon,
        accentColor: "var(--color-tan-400)",
    },
]
