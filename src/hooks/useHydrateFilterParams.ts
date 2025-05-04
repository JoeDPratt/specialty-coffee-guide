import { filterConfig, FilterKey } from '@/consts/filterConfig'
import { SearchQueryParams } from '@/types/search'

export function useHydrateFilters(queryParams: SearchQueryParams) {
    // create an object with *all* filter keys – true/false per param
    return Object.keys(filterConfig).reduce((acc, key) => {
        const k = key as FilterKey
        acc[k] = Boolean(queryParams[k])
        return acc
    }, {} as Record<FilterKey, boolean>)
}