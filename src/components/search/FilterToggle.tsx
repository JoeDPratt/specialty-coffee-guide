import { Button } from "@/components/ui/button"
import { cn } from "@/utils/classes/merge"
import React, { ReactElement } from "react"
import { useSearchStore } from "@/stores/useSearchStore"

type FilterToggleProps = {
    label: string;
    icon?: ReactElement;
    filterKey: string; // <- added key
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
    filterKey,
}: FilterToggleProps) {
    const filters = useSearchStore((s) => s.filters)
    const setFilters = useSearchStore((s) => s.setFilters)
    const selected = filters[filterKey] === "true"

    const toggle = () => {
        setFilters({
            ...filters,
            [filterKey]: selected ? "" : "true"
        })
    }

    const accent = accentColorMap[label] ?? "var(--color-pr-700)"

    return (
        <Button
            onClick={toggle}
            variant={"secondary"}
            iconPosition={"left"}
            styleType={"outline"}
            className={cn("pl-3 pr-4 h-11",
                // "rounded-full pl-3 pr-5 py-2 text-lg leading-tight flex items-center gap-1.5 border transition-colors duration-200 cursor-pointer",
                // "h-auto min-h-10",
                selected
                    ? "text-white border-[var(--accent-color)] bg-[var(--accent-color)] hover:bg-[var(--accent-color)]"
                    : ""
            )}
            style={{ "--accent-color": accent } as React.CSSProperties}
        >
            {icon}
            {label}
        </Button>
    )
}
