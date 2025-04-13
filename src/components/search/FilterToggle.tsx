import { Button } from "@/components/ui/button"
import { cn } from "@/utils/classes/merge"
import React, { ReactElement, } from "react"

type FilterToggleProps = {
    label: string;
    icon?: ReactElement;
    selected: boolean;
    onClick: () => void;
}

const accentColorMap: Record<string, string> = {
    "Organic": "var(--color-green-400)",
    "Single Origin": "var(--color-orange-400)",
    "Decaf / Low Caf": "var(--color-blue-400)",
    "Mycotoxin Free": "var(--color-aqua-400)",
}

export function FilterToggle({
    label,
    icon,
    selected,
    onClick,
}: FilterToggleProps) {
    const accent = accentColorMap[label] ?? "var(--color-pr-700)"

    return (
        <Button
            onClick={onClick}
            className={cn(
                "rounded-full pl-3 pr-4 py-2 text-lg leading-tight flex items-center gap-2 border transition-colors duration-200 cursor-pointer",
                "h-auto min-h-10",
                selected
                    ? "text-white [border-color:var(--accent-color)] [background-color:var(--accent-color)]"
                    : "border-white/70 text-white bg-transparent hover:[background-color:var(--accent-color)]/20"
            )}
            style={{ "--accent-color": accent } as React.CSSProperties}
        >
            {icon}
            {label}
        </Button>
    )
}
