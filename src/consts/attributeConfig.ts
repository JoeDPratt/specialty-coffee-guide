import OrganicIcon from "@/components/icons/icon-organic.svg";
import FairtradeIcon from "@/components/icons/icon-fairtrade.svg";
import DecafIcon from "@/components/icons/icon-decaf.svg";
import MycoIcon from "@/components/icons/icon-myco-free.svg";
import SingleOriginIcon from "@/components/icons/icon-single-origin.svg";

export const attributeConfig = {
    is_organic: {
        label: "Organic",
        description: "Certified organic beans grown without synthetic fertilizers or pesticides.",
        icon: OrganicIcon,
        color: "green",
    },
    is_single_origin: {
        label: "Single Origin",
        description: "Beans sourced from a single region or farm.",
        icon: SingleOriginIcon,
        color: "orange",
    },
    is_fairtrade: {
        label: "Fairtrade",
        description: "Supports fair prices and safe working conditions for farmers.",
        icon: FairtradeIcon,
        color: "tan",
    },
    is_mycotoxin_free: {
        label: "Mycotoxin Free",
        description: "Tested free from mycotoxins.",
        icon: MycoIcon,
        color: "aqua",
    },
    is_decaf: {
        label: "Decaf",
        description: "Coffee with most of the caffeine removed",
        icon: DecafIcon,
        color: "blue",
    },
    is_lowcaf: {
        label: "Low Caf",
        description: "Reduced caffeine content but still maintains some natural energy.",
        icon: DecafIcon,
        color: "blue",
    },

} as const;

export type AttributeKey = keyof typeof attributeConfig;
