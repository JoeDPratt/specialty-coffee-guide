// src/components/search/filters/VarietalsFilter.tsx

// import { FilterToggle } from "@/components/search/filters/FilterToggle";
import FilterHeader from "@/components/search/filters/FilterHeader";
import FilterExpandingTagRow from "./FilterExpandingTagRow";
import { SearchState, useSearchStore } from "@/stores/useSearchStore";
import { useActiveFilters } from "@/hooks/useActiveFilters";
import { useDefaultFilterOptions } from "@/hooks/useDefaultFilters";


export default function VarietalsFilter() {

    const {
        varietalFilters,
        setVarietalFilters,
        toggleVarietalFilter,
        availableVarietals,
    } = useSearchStore((s: SearchState) => ({
        varietalFilters: s.varietalFilters,
        setVarietalFilters: s.setVarietalFilters,
        toggleVarietalFilter: s.toggleVarietalFilter,
        availableVarietals: s.availableVarietals,
    }));

    const { data: defaultVarietals } = useDefaultFilterOptions({
        select: (data) => data.varietals,
    });

    const isVarietalSelected = (key: string) => varietalFilters.includes(key);
    const { areVarietalsSet } = useActiveFilters();


    return (
        <div>
            <FilterHeader
                title={"Varietals"}
                handleClear={() => setVarietalFilters([])}
                isSet={areVarietalsSet}
            />
            <FilterExpandingTagRow
                filterTags={defaultVarietals ?? []}
                availableTags={availableVarietals ?? []}
                onToggle={toggleVarietalFilter}
                isTagSelected={isVarietalSelected}
            />
        </div>
    );
}
