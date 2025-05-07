import { useSearchStore } from "@/stores/useSearchStore";
import { AttributeFilterRow } from "./AttributeFilterRow";
import FilterHeader from "@/components/search/filters/FilterHeader";
import { useActiveFilters } from "@/hooks/useActiveFilters";
import { initialFilters } from "@/stores/useSearchStore";

export default function SourcingQualityFilter() {

    const { setFilters } = useSearchStore((s) => ({ setFilters: s.setFilters }));
    const { isSQFilterSet } = useActiveFilters();

    function clearFilters() {
        setFilters(initialFilters)
    }

    return (
        <div>
            <FilterHeader
                title={"Sourcing & Quality"}
                handleClear={clearFilters}
                isSet={isSQFilterSet} />
            <AttributeFilterRow />
        </div>
    )
}