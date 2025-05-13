// hooks/useDefaultFilterOptions.ts
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { getDefaultFilterOptions } from "@/lib/queries/products/getDefaultFilterOptions";
import { DefaultFilterOptions } from "@/types/search";

export function useDefaultFilterOptions<T = DefaultFilterOptions>(
    options?: Partial<UseQueryOptions<DefaultFilterOptions, Error, T>>
) {
    return useQuery<DefaultFilterOptions, Error, T>({
        queryKey: ["default-filter-options"],
        queryFn: getDefaultFilterOptions,
        staleTime: 1000 * 60 * 60 * 24,
        ...options,
    });
}