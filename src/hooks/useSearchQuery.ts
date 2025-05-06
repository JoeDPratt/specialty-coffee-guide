// src/hooks/useSearchQuery.ts
'use client'

import { useEffect } from 'react'
import {
    useQuery,
    useQueryClient,
    keepPreviousData,
} from '@tanstack/react-query'
import { useSearchStore } from '@/stores/useSearchStore'
import { fetchSearchResults } from '@/lib/fetchers/products'
import type {
    SearchQueryParams,
    SearchResultsResponse,
} from '@/types/search'
import { useSearchParams } from '@/hooks/useSearchParams'

export function useSearchQuery() {

    const queryParams = useSearchParams();
    const { page, ...filterParams } = queryParams;
    const setTotalResults = useSearchStore(s => s.setTotalResults);

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
        if (result.isError) setTotalResults(0)
    }, [result.isSuccess, result.isError, result.data, setTotalResults])

    return result
}
