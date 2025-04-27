// components/search/SearchPageClient.tsx
'use client';

import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import SearchInput from './SearchInput';
// import SearchFilters from './SearchFilters';
import SearchViewMenu from '@/components/search/SearchViewMenu';
import SearchResults from '@/components/search/SearchResults';
import type { SearchQueryParams } from '@/types/search';
import { cn } from '@/utils/classes/merge';

const queryClient = new QueryClient();

export default function SearchPageClient({
    dehydratedState,
    queryParams
}: {
    dehydratedState: unknown;
    queryParams: SearchQueryParams;
}) {
    console.count("SearchResults render");

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={dehydratedState}>
                <div className={cn(
                    "flex flex-col sm:flex-row flex-nowrap",
                    "mt-20 pb-50 max-w-[1920px] mx-auto",
                    "px-3 md:px-4 lg:px-6",
                    "gap-3 sm:gap-6")} >
                    <div className="hidden lg:flex flex-col w-full lg:w-1/4 bg-card-100 rounded-md p-10 h-max">
                        Filter section
                    </div>
                    <div className="@container/grid flex flex-col flex-1">
                        <div className="flex justify-between items-center w-full mb-4">
                            {/* <h2 className="leading-7 mt-2.5 mb-0.5">{data.length} result{data.length === 1 ? "" : "s"}</h2> */}
                            <h2 className="leading-7 mt-2.5 mb-0.5">Search Results</h2>
                            <SearchViewMenu />
                        </div>
                        {/* <SearchInput /> */}
                        {/* <SearchFilters /> */}

                        <SearchResults queryParams={queryParams} />

                    </div>
                </div>
            </HydrationBoundary>
        </QueryClientProvider>
    );
}
