import type { JSX } from "react";
import type { RoastLevel } from "@/types/product";
import { cn } from "@/utils/classes/merge";

function RoastTag({
    roast,
    size,
    variant
}: {
    roast: string;
    size: string;
    variant: string;
}): JSX.Element | null {

    if (!roast) return null;

    const colorMap: Record<string, { bg: string, border: string, text: string }> = {
        dark: { bg: "bg-brown-800", border: "border-brown-800", text: "text-brown-800" },
        "medium dark": { bg: "bg-brown-700", border: "border-brown-700", text: "text-brown-700" },
        medium: { bg: "bg-brown-600", border: "border-brown-600", text: "text-brown-600" },
        "medium light": { bg: "bg-brown-500", border: "border-brown-500", text: "text-brown-500" },
        light: { bg: "bg-brown-400", border: "border-brown-400", text: "text-brown-400" },
    };

    // Default to medium brown for unknown
    const bgColor = colorMap[roast?.toLowerCase()]?.bg ?? "bg-brown-600";
    const borderColor = colorMap[roast?.toLowerCase()]?.border ?? "border-brown-600";
    const textColor = colorMap[roast?.toLowerCase()]?.text ?? "text-brown-600";
    const isOutline = variant === "outline"
    const isSmall = size === "sm"

    return (
        <span
            aria-label={`${roast} roast`}
            className={cn(
                "font-sofia-sans text-center font-bold tracking-wider rounded-full",
                isOutline
                    ? [borderColor, textColor, "border-1"]
                    : [bgColor, "text-white"],
                isSmall
                    ? "text-sm px-2 pt-1.5 pb-1 leading-3"
                    : "text-base px-3 pt-3 pb-2.5 leading-3"
            )}
        >
            {roast.toUpperCase()}
        </span>
    );
}

// Returns roast pills for the product
export default function RoastLabel({
    roasts,
    limit = 3,
    size = "default",
    variant = "default"
}: {
    roasts: RoastLevel[];
    limit?: number;
    size?: string;
    variant?: string;
}): JSX.Element | null {
    if (!roasts || roasts.length === 0) return null;
    return (
        <div id="roasts" className="flex flex-row gap-1 pb-1">
            {roasts.slice(0, limit).map((roast) => (
                <RoastTag roast={roast} key={roast} size={size} variant={variant} />
            ))}
        </div>
    );
}
