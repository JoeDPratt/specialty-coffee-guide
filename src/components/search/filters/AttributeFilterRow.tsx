// // src/components/search/AttributeFilterRow.tsx
import { FilterToggle } from "@/components/search/filters/FilterToggle"
import { filterConfig, FilterKey } from "@/consts/filterConfig";

export function AttributeFilterRow({
    excludedFilters = [],
    styleType = "default" }
    :
    {
        excludedFilters?: FilterKey[];
        styleType?: string;
    }) {

    const renderedFilters = Object.entries(filterConfig).filter(
        ([key]) => !excludedFilters.includes(key as FilterKey)
    );

    return (
        <div className="flex flex-wrap gap-3">
            {renderedFilters.map(([filterKey, config]) => (
                <FilterToggle
                    key={filterKey}
                    filterKey={filterKey as FilterKey}
                    config={config}
                    styleType={styleType}
                />
            ))}
        </div>
    );
}