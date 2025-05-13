// src/components/search/FilterToggle.tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/classes/merge";
import { SearchState, useSearchStore } from "@/stores/useSearchStore";
import { ScalableIcon } from "../../icons/ScalableIcon";
import { filterConfig, type FilterKey } from "@/consts/filterConfig";
import { attributeConfig } from "@/consts/attributeConfig";
import { usePaginationStore } from "@/stores/usePaginationStore";


type FilterToggleProps = {
    filterKey: FilterKey;
    config: typeof filterConfig[FilterKey];
    styleType?: string;
};

export function FilterToggle({
    filterKey,
    config,
    styleType = "default"
}: FilterToggleProps) {

    const resetPagination = usePaginationStore((s) => s.resetPagination)
    const { filters, setFilters } = useSearchStore((s: SearchState) => ({
        filters: s.filters,
        setFilters: s.setFilters
    }));

    const isSelected = filters[filterKey] === true;

    const handleClick = () => {
        setFilters((prev) => ({
            ...prev,
            [filterKey]: !prev[filterKey]
        }));
        resetPagination();
    };

    const accent = `var(--color-${config.color}-400)`;
    const Icon = attributeConfig[config.attributeKeys[0]].icon;
    const classes = cn(
        styleType === "header" ? "pl-3 pr-4 h-11" : "pl-3 pr-4 h-10",
        isSelected
            ? "text-white border-[var(--accent-color)] bg-[var(--accent-color)] hover:bg-[var(--accent-color)]"
            : ""
    );

    if (styleType === "header") {
        return (
            <Button
                onClick={handleClick}
                variant={"secondary"}
                iconPosition={"left"}
                styleType={"outline"}
                className={cn(classes)}
                style={{ "--accent-color": accent } as React.CSSProperties}
            >
                <ScalableIcon icon={<Icon />} size={28} />
                {config.label}
            </Button>
        );
    }

    return (
        <Button
            onClick={handleClick}
            iconPosition={"left"}
            variant={"soft"}
            styleType={"outlineLight"}
            size={"sm"}
            className={cn(classes)}
            style={{ "--accent-color": accent } as React.CSSProperties}
        >
            <ScalableIcon icon={<Icon />} size={32} />
            {config.label}
        </Button>
    );

}