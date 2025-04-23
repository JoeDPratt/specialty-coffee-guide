import type { JSX } from "react";
import type { RoastLevel } from "@/types/product";
import { cn } from "@/utils/classes/merge";
import {
    FireIcon
} from "@heroicons/react/16/solid";

function RoastTag({
    roast,
    size,
    variant
}: {
    roast: string;
    size: string;
    variant?: "default" | "outline" | "text";
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
    const isSmall = size === "sm"

    return (
        <div className={cn(
            "font-sofia-sans rounded-sm flex items-center gap-0.75",
            variant === "outline"
                ? [borderColor, textColor, "border-1"]
                : [bgColor, "text-white"],
            isSmall
                ? "text-sm pl-1.5 pr-2 pt-1.5 pb-1 leading-3"
                : "text-base px-3 pt-3 pb-2.5 leading-3",
            variant === "text"
                ? ["text-base text-left font-normal tracking-normal bg-transparent border-none p-0", textColor]
                : "text-center font-bold tracking-wider"
        )}>
            <FireIcon className={cn(
                "w-4 h-4 -mt-0.5",
                variant === "outline" || "text" ? textColor : "text-white")} />
            <span
                aria-label={`${roast} roast`}
                className={cn(
                    variant === "text"
                        ? "capitalize"
                        : "uppercase"
                )}
            >
                {roast}
            </span>
            <span className="max-xs:hidden -ml-0.75">
                {variant === "text" && ","}
            </span>
        </div>

    );
}

// Returns roast pills for the product
export default function RoastLabel({
    roasts,
    limit = 3,
    size = "default",
    variant = "default",
    className
}: {
    roasts: RoastLevel[];
    limit?: number;
    size?: string;
    variant?: "default" | "outline" | "text";
    className?: string
}): JSX.Element | null {
    if (!roasts || roasts.length === 0) return null;
    return (
        <div id="roasts" className={cn("flex flex-row gap-1", className)}>
            {roasts.slice(0, limit).map((roast) => (
                <RoastTag roast={roast} key={roast} size={size} variant={variant} />
            ))}
        </div>
    );
}
