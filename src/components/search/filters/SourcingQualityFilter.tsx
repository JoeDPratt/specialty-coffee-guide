import { useSearchStore } from "@/stores/useSearchStore";
import { AttributeFilterRow } from "./AttributeFilterRow";
import FilterHeading from "./FilterHeader";

export default function SourcingQualityFilter() {


    const { filters, setFilters } = useSearchStore((s) => ({ filters: s.filters, setFilters: s.setFilters }));
    const isSet = Object.entries(filters).some((filter) => filter[1] === true);

    function clearFilters() {
        setFilters({
            is_decaf: false,
            is_fairtrade: false,
            is_mycotoxin_free: false,
            is_organic: false,
            is_single_origin: false
        })
    }

    return (
        <div>
            <FilterHeading
                title={"Sourcing & Quality"}
                handleClear={clearFilters}
                isSet={isSet} />
            <AttributeFilterRow />
        </div>
    )
}