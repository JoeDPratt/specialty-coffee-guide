import { useState } from "react";
// import { FilterToggle } from "@/components/search/filters/FilterToggle";
import FilterHeader from "@/components/search/filters/FilterHeader";
import FilterExpandingTagRow from "./FilterExpandingTagRow";
import { useIsVarietalSelected } from "@/hooks/useIsVarietalSelected";
import { useSearchStore } from "@/stores/useSearchStore";
import { useActiveFilters } from "@/hooks/useActiveFilters";

// Define your varietal keys here (or import from a config)
const varietalKeys = [
    "bourbon", "geisha", "sl28", "caturra", "typica",
    "catimor", "maragogype", "pacamara", "villa_sarchi",
    "castillo", "catuai"
];


export default function VarietalsFilter() {

    const {
        setVarietalFilters,
        toggleVarietalFilter,
    } = useSearchStore((s) => ({
        setVarietalFilters: s.setVarietalFilters,
        toggleVarietalFilter: s.toggleVarietalFilter
    }));

    const isVarietalSelected = useIsVarietalSelected;
    const { areVarietalsSet } = useActiveFilters();


    return (
        <div>
            <FilterHeader
                title={"Varietals"}
                handleClear={() => setVarietalFilters([])}
                isSet={areVarietalsSet}
            />
            <FilterExpandingTagRow
                filterTags={varietalKeys}
                visibleCount={9}
                onToggle={toggleVarietalFilter}
                isTagSelected={isVarietalSelected}
            />
        </div>
    );
}
