// components/search/SearchResults.tsx

'use client';

import { useInfiniteQuery, InfiniteData, type QueryFunctionContext } from "@tanstack/react-query";

import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "@/components/ui/pagination";
import { cn } from "@/utils/classes/merge";
import { motion } from "framer-motion";
import { staggerContainer, fadeUpItem } from "@/utils/animation";
import { useSearchStore } from "@/stores/useSearchStore";
import { usePaginationStore } from "@/stores/usePaginationStore";
import ProductListItem from "@/components/shared/product/ProductListItem";
import ProductCard from "@/components/shared/product/ProductCard";
import { useEffect, useMemo } from "react";
import { useSyncUrlParams } from "@/hooks/useSyncUrlParams";
import type { SearchQueryParams, SearchResultsResponse } from "@/types/search";
import { getSearchResults } from '@/lib/queries/products/getSearchResults';
import { fetchSearchResults } from '@/lib/fetchers/products';

interface QueryKeyType extends QueryFunctionContext<["search", SearchQueryParams]> { }

export default function SearchResults({
    queryParams
}: {
    queryParams: SearchQueryParams
}) {
    const resultsView = useSearchStore((s) => s.selectedView);
    const sortedBy = useSearchStore((s) => s.sortedBy);

    const page = usePaginationStore((s) => s.page);
    const pageSize = usePaginationStore((s) => s.pageSize);
    const setPage = usePaginationStore((s) => s.setPage);
    const resetPagination = usePaginationStore((s) => s.resetPagination);

    // Whenever filters change, reset to page 1
    useEffect(() => {
        resetPagination();
    }, [JSON.stringify(queryParams), resetPagination]);


    // Merge server filters + client-side sort & pagination
    const fullParams = useMemo(() => ({
        ...queryParams,
        sort_by: sortedBy,
        page,
        page_size: pageSize,
    }), [queryParams, sortedBy, page, pageSize]);

    // Sync the URL with current params
    useSyncUrlParams(fullParams);

    const {
        data,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
        isLoading,
    } = useInfiniteQuery<SearchResultsResponse>({
        queryKey: ['search', fullParams] as const,
        queryFn: ({ pageParam = 1 }) =>
            fetchSearchResults({
                ...fullParams,
                // coerce unknown→number
                page: typeof pageParam === 'number' ? pageParam : Number(pageParam),
            }),
        getNextPageParam: last => last.nextPage,
        getPreviousPageParam: first => first.previousPage,
        initialPageParam: 1,
    });


    if (isLoading) return <div>Loading...</div>;
    if (!data?.pages.length) return <div>No results</div>;

    return (
        <div>
            <motion.div
                className={cn(
                    resultsView === "list"
                        ? "gap-8 sm:gap-4 flex flex-col"
                        : "gap-4 grid grid-cols-1 @min-search-2-col/grid:grid-cols-2 @min-search-3-col/grid:grid-cols-3 @min-search-4-col/grid:grid-cols-4"
                )}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                {data.pages.map((page) =>
                    page.results.map((product: any) => (
                        <motion.div
                            key={product.slug}
                            variants={fadeUpItem}
                            className="flex flex-col h-full"
                        >
                            {resultsView === "list"
                                ? <ProductListItem product={product} />
                                : <ProductCard product={product} />}
                        </motion.div>
                    ))
                )}
            </motion.div>

            <Pagination>
                <PaginationContent>
                    {hasPreviousPage && (
                        <PaginationItem>
                            <PaginationPrevious onClick={() => fetchPreviousPage()} />
                        </PaginationItem>
                    )}

                    {/* Page number buttons */}
                    {data.pages.map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                isActive={page === index + 1}
                                onClick={() => setPage(index + 1)}
                                href="#"
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {hasNextPage && (
                        <PaginationItem>
                            <PaginationNext onClick={() => fetchNextPage()} />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
        </div>
    );
}
