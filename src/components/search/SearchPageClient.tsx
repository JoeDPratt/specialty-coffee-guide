// components/search/SearchPageClient.tsx
'use client';

import { HydrationBoundary } from '@tanstack/react-query';
import SearchResults from '@/components/search/SearchResults';
import SearchInputBar from '@/components/search/SearchInputBar';
import type { SearchQueryParams } from '@/types/search';
import { cn } from '@/utils/classes/merge';
import SearchFilterMenu from '@/components/search/SearchFilterMenu';
import { useHydrateSearchStores } from '@/hooks/useHydrateSearchStores';
import SearchViewMenu from './SearchViewMenu';

export default function SearchPageClient({
    dehydratedState,
    queryParams
}: {
    dehydratedState: unknown;
    queryParams: SearchQueryParams;
}) {
    console.count("SearchResults render");
    // hydrate the stores with the query params
    useHydrateSearchStores(queryParams);

    return (
        <HydrationBoundary state={dehydratedState}>
            <div className={cn(
                "sticky top-0 px-3 md:px-4 lg:px-6 pt-4 pb-4 bg-pr-200 z-50 w-full",
                "flex items-center justify-center")}>
                <SearchInputBar />
            </div>
            <div className={cn(
                "flex flex-col gap-3 mt-10 px-3 max-w-[1920px] mx-auto",
                "sm:gap-6",
                "md:px-4",
                "lg:flex-row flex-nowraplg:px-6 lg:gap-12 lg:mt-0")
            } >
                <SearchFilterMenu className="lg:pt-6" />
                <div className="@container/grid flex flex-col flex-1 overflow-y-auto max-h-[calc(100vh-140px)] no-scrollbar lg:pt-6">
                    <SearchViewMenu />
                    <SearchResults />
                </div>
            </div>
        </HydrationBoundary>
    );
}
