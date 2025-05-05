import { filterConfig, FilterKey } from '@/consts/filterConfig'
import { SearchQueryParams } from '@/types/search'

export function useHydrateFilters(queryParams: SearchQueryParams) {
    return Object.keys(filterConfig).reduce((acc, key) => {
        const k = key as FilterKey;
        acc[k] = queryParams[k] ?? false;
        return acc;
    }, {} as Record<FilterKey, boolean>);
}