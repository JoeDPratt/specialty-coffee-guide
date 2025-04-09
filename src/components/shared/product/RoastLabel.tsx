import { JSX } from "react";
import { RoastLevel } from "@/types/product";

function RoastTag({ roast }: { roast: string }): JSX.Element | null {
    if (!roast) return null;

    const colorMap: Record<string, { bg: string }> = {
        "dark": { bg: "bg-brown-800" },
        "medium dark": { bg: "bg-brown-700" }, // Tailwind doesn't have 'aqua-400'
        "medium": { bg: "bg-brown-600" },
        "medium light": { bg: "bg-brown-500" },
        "light": { bg: "bg-brown-400" }
    };

    // Default to medium brown for unknown
    const bgColor = colorMap[roast?.toLowerCase()]?.bg ?? "bg-brown-600";

    return (
        <span
            aria-label={`${roast} roast`}
            className={`${bgColor} text-white font-sofia-sans px-2.5 pt-2.5 pb-2 text-center text-base font-bold leading-3 tracking-wider`}>{roast.toUpperCase()}
        </span>
    )
}

// Returns roast pills for the product
export default function RoastLabel({ roasts, limit = 3 }: { roasts: RoastLevel[], limit?: number }): JSX.Element | null {
    if (!roasts || roasts.length === 0) return null;
    return (
        <div id="roasts" className="flex flex-row gap-1 pb-1">
            {roasts.slice(0, limit).map((roast) => (
                <RoastTag roast={roast} key={roast} />
            ))}
        </div>
    )
};