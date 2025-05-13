// src/components/search/filters/VarietalsFilter.tsx

// import { FilterToggle } from "@/components/search/filters/FilterToggle";
import FilterHeader from "@/components/search/filters/FilterHeader";
import FilterExpandingTagRow from "./FilterExpandingTagRow";
import { SearchState, useSearchStore } from "@/stores/useSearchStore";
import { useActiveFilters } from "@/hooks/useActiveFilters";
import { useDefaultFilterOptions } from "@/hooks/useDefaultFilters";


export default function CountriesFilter() {

    const {
        countryFilters,
        setCountryFilters,
        toggleCountryFilter,
        availableCountries,
    } = useSearchStore((s: SearchState) => ({
        countryFilters: s.countryFilters,
        setCountryFilters: s.setCountryFilters,
        toggleCountryFilter: s.toggleCountryFilter,
        availableCountries: s.availableCountries,
    }));

    const { data: defaultCountries } = useDefaultFilterOptions({
        select: (data) => data.countries,
    });

    const isCountrySelected = (key: string) => countryFilters.includes(key);
    const { areCountriesSet } = useActiveFilters();

    return (
        <div>
            <FilterHeader
                title={"Country of Origin"}
                handleClear={() => setCountryFilters([])}
                isSet={areCountriesSet}
            />
            <FilterExpandingTagRow
                filterTags={defaultCountries ?? []}
                availableTags={availableCountries ?? []}
                onToggle={toggleCountryFilter}
                isTagSelected={isCountrySelected}
                visibleCount={7}
            />
        </div>
    );
}
