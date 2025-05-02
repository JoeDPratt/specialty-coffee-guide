// src/components/search/FilterToggle.tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/classes/merge";
import React from "react";
import { useSearchStore } from "@/stores/useSearchStore";
import { ScalableIcon } from "../icons/ScalableIcon";
import { filterConfig, type FilterKey } from "@/consts/filterConfig";
import { attributeConfig } from "@/consts/attributeConfig";
import { usePaginationStore } from "@/stores/usePaginationStore";

type FilterToggleProps = {
    filterKey: FilterKey;
    config: typeof filterConfig[FilterKey];
    styleType?: string;
};

export function FilterToggle({ filterKey, config, styleType = "default" }: FilterToggleProps) {
    const filters = useSearchStore((s) => s.filters);
    const setFilters = useSearchStore((s) => s.setFilters);
    const resetPagination = usePaginationStore((s) => s.resetPagination)
    const selected = filters[filterKey] === true;
    const accent = `var(--color-${config.color}-400)`;
    const Icon = attributeConfig[config.attributeKeys[0]].icon;

    const toggle = () => {
        setFilters({
            ...filters,
            [filterKey]: !selected
        });
        resetPagination();
    };

    if (styleType === "header") {
        return (
            <Button
                onClick={toggle}
                variant={"secondary"}
                iconPosition={"left"}
                styleType={"outline"}
                className={cn("pl-3 pr-4 h-11",
                    selected
                        ? "text-white border-[var(--accent-color)] bg-[var(--accent-color)] hover:bg-[var(--accent-color)]"
                        : ""
                )}
                style={{ "--accent-color": accent } as React.CSSProperties}
            >
                <ScalableIcon icon={<Icon />} size={28} />
                {config.label}
            </Button>
        );
    }

    return (
        <Button
            onClick={toggle}
            iconPosition={"left"}
            styleType={"outline"}
            className={cn("pl-3 pr-4 h-11",
                selected
                    ? "text-white border-[var(--accent-color)] bg-[var(--accent-color)] hover:bg-[var(--accent-color)]"
                    : ""
            )}
            style={{ "--accent-color": accent } as React.CSSProperties}
        >
            <ScalableIcon icon={<Icon />} size={28} />
            {config.label}
        </Button>
    );

}