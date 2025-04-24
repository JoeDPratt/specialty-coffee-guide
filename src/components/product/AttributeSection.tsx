import type { CoffeeAttributes } from "@/types/product";
import type { JSX } from "react";
import OrganicIcon from "@/components/icons/icon-organic.svg";
import FairtradeIcon from "@/components/icons/icon-fairtrade.svg";
import DecafIcon from "@/components/icons/icon-decaf.svg";
import MycoIcon from "@/components/icons/icon-myco-free.svg";
import SingleOriginIcon from "@/components/icons/icon-single-origin.svg";
import { cn } from "@/utils/classes/merge";
import {
    Tooltip,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { AttributeTooltip } from "@/components/tooltips/AttributeTooltip";

interface IconProps {
    className?: string;
}

type IconSize = "base" | "md" | "lg";
type Variant = "default" | "icon";

interface AttributeItemIconProps {
    flagName: keyof typeof attributeConfig;
    isActive?: boolean;
    iconSize?: IconSize;
    hasBackground?: boolean;
    hasLabel?: boolean;
    hasColorIcons?: boolean;
}

interface AttributeItemLabelledProps {
    flagName: keyof typeof attributeConfig;
    isActive?: boolean;
}


interface AttributeSectionProps {
    attributeData: CoffeeAttributes;
    variant?: Variant;
    className?: string;
    iconSize?: IconSize;
    hasBackground?: boolean;
    hasLabel?: boolean;
    showInactive?: boolean;
    hasColorIcons?: boolean;
}

type LabelConfig = {
    label: string | JSX.Element;
    bgClass?: string;
    icon: React.ComponentType<IconProps>;
    iconColorClass: string;
    description: string;
};



const attributeConfig: Record<keyof CoffeeAttributes, LabelConfig> = {
    is_organic: {
        label: "Organic",
        bgClass: "bg-green-100",
        icon: OrganicIcon,
        iconColorClass: "fill-green-400",
        description: "Certified organic beans grown without synthetic fertilizers or pesticides.",
    },
    is_mycotoxin_free: {
        label: "Myco Free",
        bgClass: "bg-teal-100",
        icon: MycoIcon,
        iconColorClass: "fill-teal-400",
        description: "Tested free from mycotoxins.",
    },
    is_fairtrade: {
        label: "Fairtrade",
        bgClass: "bg-tan-100",
        icon: FairtradeIcon,
        iconColorClass: "fill-tan-400",
        description: "Supports fair prices and safe working conditions for farmers.",
    },
    is_decaf: {
        label: "Decaf",
        bgClass: "bg-blue-100",
        icon: DecafIcon,
        iconColorClass: "fill-blue-400",
        description: "Coffee with most of the caffeine removed through water processing.",
    },
    is_lowcaf: {
        label: "Low Caf",
        bgClass: "bg-blue-100",
        icon: DecafIcon,
        iconColorClass: "fill-blue-400",
        description: "Reduced caffeine content but still maintains some natural energy.",
    },
    is_single_origin: {
        label: "Single Origin",
        bgClass: "bg-orange-100",
        icon: SingleOriginIcon,
        iconColorClass: "fill-orange-400",
        description: "Beans sourced from a single region or farm.",
    },
};

const iconSizeMap = {
    base: "w-7 h-7",
    md: "w-8 h-8",
    lg: "w-9 h-9"
}

function AttributeItemLabelled({
    flagName,
    isActive = false,
}: AttributeItemLabelledProps): JSX.Element {
    const {
        label,
        description,
        icon: Icon,
        iconColorClass,
    } = attributeConfig[flagName];

    return (
        <Tooltip>
            <TooltipTrigger asChild >
                <div className="flex w-1/2 xs:w-auto">
                    <div
                        className="@sm:w-max xs:w-min py-2 flex flex-row xs:flex-col gap-1 xs:gap-2 items-center"
                        role="listitem"
                        aria-label={`${label} attribute is ${isActive ? "active" : "inactive"}`}
                    >
                        <div className="w-10 shrink-0 items-center xs:align-top align-middle">
                            <Icon
                                className={cn("w-full h-auto object-cover",
                                    isActive ? iconColorClass : "fill-disabled-400"
                                )}
                            />
                        </div>
                        <hr className="hidden xs:block hr-neu-shadow w-0 xs:w-10 mb-1.25 mt-0.25" />
                        <div
                            className={cn(
                                "xs:text-center text-base leading-4 -mt-0.25 uppercase",
                                isActive ? "text-pr-800 dark:text-white" : "text-disabled-400")}
                        >
                            {label}
                            <span className="sr-only">
                                {isActive ? " (active)" : " (inactive)"}
                            </span>
                        </div>
                    </div>
                </div>
            </TooltipTrigger>
            <AttributeTooltip title={label} icon={Icon} description={description} iconColorClass={iconColorClass} />
        </Tooltip>
    );
}

// Attributte icon with background highlight (white)
function AttributeItemIcon({
    flagName,
    isActive = false,
    iconSize = "base",
    hasBackground = false,
    hasLabel = false,
    hasColorIcons = true
}: AttributeItemIconProps): JSX.Element {
    const { label, description, icon: Icon, iconColorClass } = attributeConfig[flagName];

    return (
        <Tooltip>
            <TooltipTrigger asChild >
                <div
                    className={cn(
                        "flex items-center shadow-none p-1 gap-0 rounded-sm",
                        hasLabel && "w-[calc(50%-2px)] p-0 gap-0.5",
                        isActive
                            ? hasBackground && "bg-white shadow-xs"
                            : "bg-transparent",
                    )}
                    aria-label={`${attributeConfig[flagName].label} ${isActive ? "active" : "inactive"}`}
                >
                    <Icon
                        className={cn(
                            isActive
                                ? hasColorIcons ? iconColorClass : "fill-pr-900"
                                : "text-disabled-400",
                            iconSizeMap[iconSize]
                        )}
                    />
                    {hasLabel && <span className={cn(
                        "capitalize mt-0.75 ml-1",
                        isActive
                            ? "text-pr-900"
                            : "text-disabled-400",)}
                    >{label}</span>}
                </div>
            </TooltipTrigger>
            <AttributeTooltip title={label} icon={Icon} description={description} iconColorClass={iconColorClass} />
        </Tooltip>
    );
}

export default function AttributeSection({
    attributeData,
    variant = "default",
    className = "",
    iconSize = "base",
    hasBackground = false,
    hasLabel = false,
    showInactive = true,
    hasColorIcons = true
}: AttributeSectionProps): JSX.Element {
    const entries = (Object.keys(attributeData) as (keyof CoffeeAttributes)[])
        .filter((key) => attributeConfig[key])
        .map((key) => [key, attributeData[key]] as const);

    if (variant === "icon") { //bg
        return (

            <div
                className={cn("flex w-max gap-1.5 px-2", className)}
                role="region"
                aria-label="Coffee attribute icons"
            >
                {entries.map(([flagName, isActive]) => (
                    (showInactive || isActive) &&
                    <AttributeItemIcon
                        key={flagName}
                        flagName={flagName}
                        isActive={isActive ?? false}
                        iconSize={iconSize}
                        hasBackground={hasBackground}
                        hasLabel={hasLabel}
                        hasColorIcons={hasColorIcons}
                    />
                ))}
            </div>
        );
    }


    return (
        <div
            className={cn(
                "font-sofia-sans-condensed tracking-wide font-medium lg:pt-1.25 -mt-1.75 lg:mt-0",
                className
            )}
            role="region"
            aria-label="Product attributes"
        >
            <h3 className="sr-only">Product attributes</h3>
            <div className="w-full flex flex-wrap xs:justify-between" role="list">
                {entries.map(([flagName, isActive]) => (
                    <AttributeItemLabelled
                        key={flagName}
                        flagName={flagName}
                        isActive={isActive ?? false}
                    />
                ))}
            </div>
        </div>

    );
}
