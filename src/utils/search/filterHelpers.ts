// utils/search/filterHelpers.ts
import { filterDefinitions } from "./filterConfig";
import type { Filters } from "./filterConfig";
import type { SearchQueryParams } from "@/types/search";

export function filtersToBooleans(filters: Filters): Partial<SearchQueryParams> {
    return Object.fromEntries(
        filterDefinitions.map(({ key }) => [key, filters[key] === "true"])
    ) as Partial<SearchQueryParams>;
}

/**  Query-string ➜ booleans (for SearchQueryParams)  */
export function paramsToBooleans(
    params: Record<string, string | string[] | undefined>
): Partial<SearchQueryParams> {
    return Object.fromEntries(
        filterDefinitions.map(({ key }) => [
            key,
            params[key] === "true" ? true : undefined,
        ])
    ) as Partial<SearchQueryParams>;
}

/**  Query-string ➜ store strings (if you need to hydrate the store)  */
export function paramsToFilters(
    params: Record<string, string | string[] | undefined>
): Filters {
    return Object.fromEntries(
        filterDefinitions.map(({ key }) => [
            key,
            params[key] === "true" ? "true" : "",
        ])
    ) as Filters;
}
