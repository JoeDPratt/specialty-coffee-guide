// src/components/search/filters/VarietalsFilter.tsx

import FilterHeader from "@/components/search/filters/FilterHeader";
import FilterExpandingTagRow from "./FilterExpandingTagRow";
import { SearchState, useSearchStore } from "@/stores/useSearchStore";
import { useActiveFilters } from "@/hooks/useActiveFilters";
import { useDefaultFilterOptions } from "@/hooks/useDefaultFilters";


export default function ProcessesFilter() {

    const {
        processFilters,
        setProcessFilters,
        toggleProcessFilter,
        availableProcesses,
    } = useSearchStore((s: SearchState) => ({
        processFilters: s.processFilters,
        setProcessFilters: s.setProcessFilters,
        toggleProcessFilter: s.toggleProcessFilter,
        availableProcesses: s.availableProcesses,
    }));

    const { data: defaultProcesses } = useDefaultFilterOptions({
        select: (data) => data.processes,
    });

    const isProcessSelected = (key: string) => processFilters.includes(key);
    const { areProcessesSet } = useActiveFilters();
    console.log("availableProcesses", availableProcesses)

    return (
        <div>
            <FilterHeader
                title={"Processing Method"}
                handleClear={() => setProcessFilters([])}
                isSet={areProcessesSet}
            />
            <FilterExpandingTagRow
                filterTags={defaultProcesses ?? []}
                availableTags={availableProcesses ?? []}
                onToggle={toggleProcessFilter}
                isTagSelected={isProcessSelected}
                visibleCount={5}
            />
        </div>
    );
}
