import type { CoffeeAttributes } from "@/types/product";
import type { JSX } from "react";
import OrganicIcon from "@/components/icons/icon-organic.svg";
import FairtradeIcon from "@/components/icons/icon-fairtrade.svg";
import DecafIcon from "@/components/icons/icon-decaf.svg";
import MycoIcon from "@/components/icons/icon-myco-free.svg";
import SingleOriginIcon from "@/components/icons/icon-single-origin.svg";
import { cn } from "@/utils/classes/merge";

interface AttributeItemProps {
    flagName: string;
    isActive?: boolean;
}

interface AttributeSectionProps {
    attributeData: CoffeeAttributes;
    variant?: string;
    className?: string;
}

interface IconProps {
    className?: string;
}

type LabelConfig = {
    label: string | JSX.Element;
    bgColor: string;
    icon: React.ComponentType<IconProps>;
    iconColor: string;
};

const labelColorMap: Record<string, LabelConfig> = {
    is_organic: {
        label: "ORGANIC",
        bgColor: "bg-green-400",
        icon: OrganicIcon,
        iconColor: "fill-green-400",
    },
    is_mycotoxin_free: {
        label: "MYCO FREE",
        bgColor: "bg-teal-400",
        icon: MycoIcon,
        iconColor: "fill-teal-400",
    },
    is_fairtrade: {
        label: "FAIRTRADE",
        bgColor: "bg-brown-400",
        icon: FairtradeIcon,
        iconColor: "fill-brown-400",
    },
    is_decaf: {
        label: "DECAF",
        bgColor: "bg-blue-400",
        icon: DecafIcon,
        iconColor: "fill-blue-400",
    },
    is_lowcaf: {
        label: "LOW CAFF",
        bgColor: "bg-blue-400",
        icon: DecafIcon,
        iconColor: "fill-blue-400",
    },
    is_single_origin: {
        label: "SINGLE ORIGIN",
        bgColor: "bg-orange-400",
        icon: SingleOriginIcon,
        iconColor: "fill-orange-400",
    },
};

function AttributeItemLabelled({
    flagName,
    isActive = false,
}: AttributeItemProps): JSX.Element {
    const {
        label: labelText,
        icon: Icon,
        iconColor: iconColor,
    } = labelColorMap[flagName] || {
        label: "ORGANIC",
        bg: "bg-green-400",
    };

    return (
        <div className={`flex w-1/2 xs:w-auto`}>
            <div
                className={`@sm:w-max xs:w-min py-2 flex flex-row xs:flex-col gap-1 xs:gap-2 items-center`}
                role="listitem"
                aria-label={`${labelText} attribute is ${isActive ? "active" : "inactive"}`}
            >
                <div className="w-10 shrink-0 items-center xs:align-top align-middle">
                    <Icon
                        className={`w-full h-auto object-cover ${isActive ? iconColor : "fill-pr-800 opacity-25"}`}
                    />
                </div>
                <hr className="hidden xs:block hr-neu-shadow w-0 xs:w-10 mb-1.25 mt-0.25"></hr>
                <div
                    className={`${!isActive && "opacity-25"} text-pr-800 dark:text-white xs:text-center text-base leading-4 -mt-0.25`}
                >
                    {labelText}
                    <span className="sr-only">
                        {isActive ? " (active)" : " (inactive)"}
                    </span>
                </div>
            </div>
        </div>
    );
}

function AttributeItemIcon({
    flagName,
    isActive = false,
}: AttributeItemProps): JSX.Element {
    const {
        icon: Icon,
        iconColor: iconColor,
    } = labelColorMap[flagName] || {
        bg: "bg-green-400",
    };

    return (
        <div>
            <Icon
                className={`w-7 h7 ${isActive ? iconColor : "fill-pr-800 opacity-25"}`}
            />
        </div>
    );
}

export default function AttributeSection({
    attributeData,
    variant = "default",
    className = ""
}: AttributeSectionProps): JSX.Element {
    const entries = Object.entries(attributeData || {});

    if (variant === "icon") {
        return (
            <div
                className={cn(
                    "flex w-max gap-2 p-2",
                    className
                )}
                role="region"
                aria-labelledby="card-coffee-attributes"
            >
                {entries.map(([key, value]) => (
                    <AttributeItemIcon key={key} flagName={key} isActive={Boolean(value)} />
                ))}
            </div>

        );
    } else {
        return (
            <div
                className={cn(
                    "font-sofia-sans-condensed tracking-wide font-medium lg:pt-1.25 -mt-1.75 lg:mt-0",
                    className)}
                role="region"
                aria-labelledby="attribute-section-heading"
            >
                <h3 id="attribute-section-heading" className="sr-only">
                    Product attributes
                </h3>
                <div className="w-full flex flex-wrap xs:justify-between" role="list">
                    {entries.map(([key, value]) => (
                        <AttributeItemLabelled key={key} flagName={key} isActive={Boolean(value)} />
                    ))}
                </div>
            </div>
        );
    }
}
