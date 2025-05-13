// src/hooks/useSearchQuery.ts
'use client'

import { useEffect } from 'react'
import {
    useQuery,
    useQueryClient,
    keepPreviousData,
} from '@tanstack/react-query'
import { SearchState, useSearchStore } from '@/stores/useSearchStore'
import { fetchSearchResults } from '@/lib/fetchers/products'
import type {
    SearchQueryParams,
    SearchResultsResponse,
} from '@/types/search'
import { useSearchParams } from '@/hooks/useSearchParams'

export function useSearchQuery() {

    const queryParams = useSearchParams();
    const { page, ...filterParams } = queryParams;
    const {
        setTotalResults,
        setAvailableVarietals,
        setAvailableProcesses,
        setAvailableCountries
    } = useSearchStore((s: SearchState) =>
    ({
        setTotalResults: s.setTotalResults,
        setAvailableVarietals: s.setAvailableVarietals,
        setAvailableProcesses: s.setAvailableProcesses,
        setAvailableCountries: s.setAvailableCountries
    }));

    const queryClient = useQueryClient()

    const result = useQuery<
        SearchResultsResponse,
        Error,
        SearchResultsResponse,
        readonly ['search', SearchQueryParams, number]
    >({
        queryKey: ['search', filterParams, page] as const,
        queryFn: () => fetchSearchResults(queryParams),
        placeholderData: keepPreviousData,
    });

    /* ---------- pre-fetch next page ---------- */
    useEffect(() => {
        if (result.data?.nextPage) {
            queryClient.prefetchQuery({
                queryKey: ['search', filterParams, result.data.nextPage] as const,
                queryFn: () => fetchSearchResults({ ...filterParams, page: result.data.nextPage }),
            })
        }
    }, [result.data?.nextPage, filterParams, queryClient])

    /* ---------- write total-count into store ---------- */
    useEffect(() => {
        if (result.isSuccess) setTotalResults(result.data?.totalCount ?? 0)

        // Collect varietals from all products
        const varietals = result.data?.results.flatMap(p => p.varietals || []);
        const uniqueVarietals = Array.from(new Set(varietals)).sort();
        setAvailableVarietals(uniqueVarietals);

        // Collect processes from all products
        const processes = result.data?.results.flatMap(p => p.processes || []);
        const uniqueProcesses = Array.from(new Set(processes)).sort();
        setAvailableProcesses(uniqueProcesses);

        // Collect countries from all products
        const countries = result.data?.results.flatMap(p => p.countries || []);
        const uniqueCountries = Array.from(new Set(countries)).sort();
        setAvailableCountries(uniqueCountries);

        if (result.isError) setTotalResults(0)
    }, [result.isSuccess, result.isError, result.data, setTotalResults])

    return result
}
