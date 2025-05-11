// src/components/product/AttributeSection.tsx

import type { CoffeeAttributes } from "@/types/product";
import type { JSX } from "react";
import { cn } from "@/utils/classes/merge";
import { attributeConfig, AttributeKey } from "@/consts/attributeConfig";

import {
    Tooltip,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { AttributeTooltip } from "@/components/tooltips/AttributeTooltip";

interface IconProps {
    className?: string;
}

type IconSize = "base" | "md" | "lg";
type Variant = "default" | "icon" | "pill";

interface AttributeItemProps {
    flagName: AttributeKey;
    isActive?: boolean;
    config: (typeof attributeConfig)[AttributeKey];
    iconSize?: IconSize;
    hasBackground?: boolean;
    hasLabel?: boolean;
    hasColorIcons?: boolean;
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

// Tailwind-safe maps
const colorClassMap = {
    green: "fill-green-400",
    blue: "fill-blue-400",
    aqua: "fill-aqua-400",
    orange: "fill-orange-400",
    tan: "fill-tan-400",
    disabled: "fill-disabled-400",
} as const;

const bgClassMap = {
    green: "bg-green-100",
    blue: "bg-blue-100",
    aqua: "bg-aqua-100",
    orange: "bg-orange-100",
    tan: "bg-tan-100",
} as const;

const borderColorMap = {
    green: "border-green-400",
    blue: "border-blue-400",
    aqua: "border-aqua-400",
    orange: "border-orange-400",
    tan: "border-tan-400",
} as const;

const textColorMap = {
    green: "text-green-400",
    blue: "text-blue-400",
    aqua: "text-aqua-400",
    orange: "text-orange-400",
    tan: "text-tan-400",
} as const;

const iconSizeMap = {
    base: "w-7 h-7",
    md: "w-8 h-8",
    lg: "w-9 h-9"
}

function AttributeItemLabelled({
    flagName,
    isActive = false,
    config
}: AttributeItemProps): JSX.Element {

    const { label, description, icon: Icon, color } = config;
    const iconColorClass = colorClassMap[color];

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
                        <hr className="hidden xs:block hr-dark w-0 xs:w-10 mb-1.25 mt-0.25" />
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
    config,
    iconSize = "base",
    hasBackground = false,
    hasLabel = false,
    hasColorIcons = true
}: AttributeItemProps): JSX.Element {

    const { label, description, icon: Icon, color } = config;
    const iconColorClass = colorClassMap[color]

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

// Attributte icon with background highlight (white)
function AttributeItemPill({
    flagName,
    isActive = false,
    config,
    iconSize = "base",
    hasBackground = true,
    hasLabel = true,
    hasColorIcons = true
}: AttributeItemProps): JSX.Element {

    const { label, description, icon: Icon, color } = config;
    const iconColorClass = colorClassMap[color]
    const textColorClass = textColorMap[color]
    const borderColorClass = borderColorMap[color]
    const bgColorClass = bgClassMap[color]

    return (
        <Tooltip>
            <TooltipTrigger asChild >
                <div
                    className={cn(
                        "flex items-center shadow-none p-1 gap-0 rounded-lg border-1",
                        borderColorClass,
                        hasLabel && "p-0.75 gap-0.5 px-2.5",
                        isActive
                            ? hasBackground && bgColorClass
                            : "bg-transparent",
                    )}
                    aria-label={`${attributeConfig[flagName].label} ${isActive ? "active" : "inactive"}`}
                >
                    {/* <Icon
                        className={cn(
                            isActive
                                ? hasColorIcons ? iconColorClass : "fill-pr-900"
                                : "text-disabled-400",
                            "size-5.5"
                        )}
                    /> */}
                    {hasLabel && <span className={cn(
                        "capitalize text-base",
                        isActive
                            ? textColorClass
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
    iconSize,
    hasBackground,
    hasLabel,
    showInactive = true,
    hasColorIcons
}: AttributeSectionProps): JSX.Element {

    const entries = (Object.keys(attributeData) as AttributeKey[])
        .filter((key) => attributeConfig[key])
        .map((key) => [key, attributeData[key]] as const);


    if (variant === "icon") {
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
                        config={attributeConfig[flagName]}
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

    if (variant === "pill") {
        return (

            <div
                className={cn("flex justify-center w-full gap-2", className)}
                role="region"
                aria-label="Coffee attribute icons"
            >
                {entries.map(([flagName, isActive]) => (
                    (showInactive || isActive) &&
                    <AttributeItemPill
                        key={flagName}
                        flagName={flagName}
                        config={attributeConfig[flagName]}
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
                        config={attributeConfig[flagName]}
                        isActive={isActive ?? false}
                    />
                ))}
            </div>
        </div>

    );
}
