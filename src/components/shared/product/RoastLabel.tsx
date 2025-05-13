import type { JSX } from "react";
import type { RoastLevel } from "@/types/product";
import { cn } from "@/utils/classes/merge";
import {
    FireIcon
} from "@heroicons/react/16/solid";

export function RoastTag({
    roast,
    size,
    variant,
    lastItem
}: {
    roast: string;
    size: string;
    variant?: "default" | "outline" | "text";
    lastItem?: boolean;
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
            "font-sofia-sans rounded-sm flex items-center gap-0",
            variant === "outline"
                ? [borderColor, textColor, "border-1"]
                : [bgColor, "text-white"],
            isSmall
                ? "text-base px-1.5 pt-1.5 pb-1 leading-3"
                : "text-lg px-2.5 pt-2.25 pb-1.75 leading-3",
            variant === "text"
                ? ["text-left tracking-normal bg-transparent border-none p-0 pr-0.5 leading-4", textColor]
                : "text-center"
        )}>
            <span
                aria-label={`${roast} roast`}
                className={cn(
                    "pr-0.5",
                    variant === "text"
                        ? "capitalize"
                        : "capitalize"
                )}
            >
                {roast}
            </span>
            <FireIcon className={cn(
                variant === "outline" ? "size-4.5 -mt-0.5" : "size-4 -mt-0.5",
                variant === "default" ? "text-white" : textColor)}
            />
            {variant === "text" && !lastItem && <span className="pr-0.5 -ml-0.5">,</span>}

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
