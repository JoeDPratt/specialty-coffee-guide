import { CoffeeAttributes } from "@/types/product";
import { JSX } from "react";

interface AttributeItemProps {
    flagName: string;
    position: number;
    isActive?: boolean;
}

interface AttributeSectionProps {
    attributeData: CoffeeAttributes;
}

const labelColorMap: Record<string, { label: string; bg: string }> = {
    is_organic: { label: "ORGANIC", bg: "bg-green-400" },
    is_mycotoxin_free: { label: "MYCO FREE", bg: "bg-teal-400" },
    is_fairtrade: { label: "FAIRTRADE", bg: "bg-brown-400" },
    is_decaf: { label: "DECAF", bg: "bg-blue-400" },
};

function AttributeItem({
    flagName,
    position,
    isActive = false,
}: AttributeItemProps): JSX.Element {
    const { label: labelText, bg: bgColor } = labelColorMap[flagName] || {
        label: "ORGANIC",
        bg: "bg-green-400",
    };

    return (
        <div
            className="w-1/2 py-2 flex flex-row gap-2 justify-left items-start self-start"
            role="listitem"
            aria-label={`${labelText} attribute is ${isActive ? "active" : "inactive"}`}
        >
            <div
                className={`${isActive ? bgColor : "bg-pr-400 opacity-50"
                    } aspect-square h-6 w-6 rounded-full inline-block`}
                aria-hidden="true"
            />
            <div
                className={`${!isActive && "opacity-50"
                    } text-pr-800 dark:text-white leading-6`}
            >
                {labelText}
                <span className="sr-only">
                    {isActive ? " (active)" : " (inactive)"}
                </span>
            </div>
        </div>
    );
}

export default function AttributeSection({
    attributeData,
}: AttributeSectionProps): JSX.Element {
    const entries = Object.entries(attributeData || {});

    return (
        <section
            className="flex flex-row @sm:w-2/3 w-full flex-wrap font-sofia-sans-condensed text-lg tracking-wide font-medium @sm:order-1 order-2 @sm:pt-0 pt-8 gap-y-4 @sm:gap-0"
            role="region"
            aria-labelledby="attribute-section-heading"
        >
            <h3 id="attribute-section-heading" className="sr-only">
                Product attributes
            </h3>
            <div className="w-full flex flex-wrap" role="list">
                {entries.map(([key, value], index) => (
                    <AttributeItem
                        key={key}
                        flagName={key}
                        position={index + 1}
                        isActive={Boolean(value)}
                    />
                ))}
            </div>
        </section>
    );
}
