// components/search/SearchResults.tsx
'use client';

import { useQuery, useQueryClient, keepPreviousData, UseQueryOptions } from '@tanstack/react-query';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
} from '@/components/ui/pagination';
import { cn } from '@/utils/classes/merge';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUpItem } from '@/utils/animation';
import { useSearchStore } from '@/stores/useSearchStore';
import { usePaginationStore } from '@/stores/usePaginationStore';
import ProductListItem from '@/components/shared/product/ProductListItem';
import ProductCard from '@/components/shared/product/ProductCard';
import PaginationControl from "@/components/shared/navigation/PaginationControl";
import { useEffect, useMemo } from 'react';
import { useSyncUrlParams } from '@/hooks/useSyncUrlParams';
import type {
    SearchQueryParams,
    SearchResultsResponse,
} from '@/types/search';
import { fetchSearchResults } from '@/lib/fetchers/products';
import { useBreakpointStore } from '@/stores/useBreakpointStore';


export default function SearchResults({
    queryParams
}: {
    queryParams: SearchQueryParams
}) {
    const queryClient = useQueryClient();
    const resultsView = useSearchStore((s) => s.selectedView);
    const sortedBy = useSearchStore((s) => s.sortedBy);
    const page = usePaginationStore((s) => s.page);
    const pageSize = usePaginationStore((s) => s.pageSize);
    const setPage = usePaginationStore((s) => s.setPage);
    const setTotalResults = useSearchStore((s) => s.setTotalResults);
    const isSm = useBreakpointStore((s) => s.isSm);

    // Full params WITHOUT page
    const filterParams = useMemo(() => ({
        ...queryParams,
        sort_by: sortedBy,
        page_size: pageSize,
    }), [queryParams, sortedBy, pageSize]);

    useSyncUrlParams({ ...filterParams, page });

    const { data, isLoading, isSuccess, isError } = useQuery<
        SearchResultsResponse,
        Error,
        SearchResultsResponse,
        readonly ['search', SearchQueryParams, number]
    >({
        queryKey: ['search', filterParams, page] as const,
        queryFn: () => fetchSearchResults({ ...filterParams, page }),
        placeholderData: keepPreviousData,
    });

    // Prefetch next page
    useEffect(() => {
        if (data?.nextPage) {
            queryClient.prefetchQuery({
                queryKey: ['search', filterParams, data.nextPage] as const,
                queryFn: () => fetchSearchResults({ ...filterParams, page: data.nextPage }),
            });
        }
    }, [data?.nextPage, filterParams, queryClient]);

    // Side-effect: update the store when data arrives or fails
    useEffect(() => {
        if (isSuccess) {
            setTotalResults(data?.totalCount ?? 0);
        }
        if (isError) {
            setTotalResults(0);
        }
    }, [isSuccess, isError, data, setTotalResults]);


    if (isLoading) return <div>Loading…</div>;
    if (isError) return <div>Error loading results</div>;
    if (!data?.results.length) return <div>No results</div>;

    return (
        <div>
            <motion.div
                className={cn(
                    resultsView === 'list' && !isSm
                        ? 'gap-8 sm:gap-4 flex flex-col'
                        : 'gap-4 grid grid-cols-1 @min-search-2-col/grid:grid-cols-2 @min-search-3-col/grid:grid-cols-3 @min-search-4-col/grid:grid-cols-4'
                )}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                {data.results.map((product) => (
                    <motion.div
                        key={product.slug}
                        variants={fadeUpItem}
                        className="flex flex-col h-full"
                    >
                        {resultsView === 'list' && !isSm
                            ? <ProductListItem product={product} />
                            : <ProductCard product={product} />}
                    </motion.div>
                ))}
            </motion.div>

            <PaginationControl
                page={page}
                setPage={setPage}
                totalPages={data.totalPages ?? 0}
                nextPage={data.nextPage}
            />
        </div>
    );
}
