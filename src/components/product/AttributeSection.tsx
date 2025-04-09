import { CoffeeAttributes } from "@/types/product";
import { JSX } from "react";
import OrganicIcon from "@public/icons/icon-organic.svg";
import FairtradeIcon from "@public/icons/icon-fairtrade.svg";
import DecafIcon from "@public/icons/icon-decaf.svg";
import MycoIcon from "@public/icons/icon-myco-free.svg";
import SingleOriginIcon from "@public/icons/icon-single-origin.svg";

interface AttributeItemProps {
    flagName: string;
    isActive?: boolean;
}

interface AttributeSectionProps {
    attributeData: CoffeeAttributes;
}

type LabelConfig = {
    label: string | JSX.Element;
    bgColor: string;
    icon: React.ComponentType<any>;
    iconColor: string;
};

const labelColorMap: Record<string, LabelConfig> = {
    is_organic: { label: "ORGANIC", bgColor: "bg-green-400", icon: OrganicIcon, iconColor: "fill-green-400" },
    is_mycotoxin_free: { label: "MYCO FREE", bgColor: "bg-teal-400", icon: MycoIcon, iconColor: "fill-teal-400" },
    is_fairtrade: { label: "FAIRTRADE", bgColor: "bg-brown-400", icon: FairtradeIcon, iconColor: "fill-brown-400" },
    is_decaf: { label: "DECAF", bgColor: "bg-blue-400", icon: DecafIcon, iconColor: "fill-blue-400" },
    is_lowcaf: { label: "LOW CAFF", bgColor: "bg-blue-400", icon: DecafIcon, iconColor: "fill-blue-400" },
    is_single_origin: { label: "SINGLE ORIGIN", bgColor: "bg-orange-400", icon: SingleOriginIcon, iconColor: "fill-orange-400" },
};

function AttributeItem({
    flagName,
    isActive = false,
}: AttributeItemProps): JSX.Element {
    const { label: labelText, bgColor: bgColor, icon: Icon, iconColor: iconColor } = labelColorMap[flagName] || {
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
                    <Icon className={`w-full h-auto object-cover ${isActive ? iconColor : "fill-pr-800 opacity-25"}`} />
                </div>
                <hr className="hidden xs:block hr-neu-shadow w-0 xs:w-10 mb-1.25 mt-0.25"></hr>
                <div
                    className={`${!isActive && "opacity-25"} text-pr-800 dark:text-white xs:text-center text-base leading-4 -mt-0.25`}>
                    {labelText}
                    <span className="sr-only">
                        {isActive ? " (active)" : " (inactive)"}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function AttributeSection({
    attributeData,
}: AttributeSectionProps): JSX.Element {
    const entries = Object.entries(attributeData || {});
    const labelCount = entries.length;

    return (
        <div
            className="font-sofia-sans-condensed tracking-wide font-medium lg:pt-1.25 -mt-1.75 lg:mt-0"
            role="region"
            aria-labelledby="attribute-section-heading"
        >
            <h3 id="attribute-section-heading" className="sr-only">
                Product attributes
            </h3>
            <div className="w-full flex flex-wrap xs:justify-between" role="list">
                {entries.map(([key, value]) => (
                    <AttributeItem
                        key={key}
                        flagName={key}
                        isActive={Boolean(value)}
                    />
                ))}
            </div>
        </div>
    );
}
