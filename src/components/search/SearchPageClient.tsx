// components/search/SearchPageClient.tsx
'use client';

import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchViewMenu from '@/components/search/SearchViewMenu';
import SearchResults from '@/components/search/SearchResults';
import type { SearchQueryParams } from '@/types/search';
import { cn } from '@/utils/classes/merge';
import { Input } from '../ui/input';
import { useSearchLogic } from '@/hooks/useSearchLogic';
import { useBreakpointStore } from '@/stores/useBreakpointStore';
import { ViewMode, useSearchStore } from '@/stores/useSearchStore';
import { ToggleWithTooltips } from '../shared/buttons/ToggleWithToolTips';
import { Bars4Icon, MagnifyingGlassIcon, Squares2X2Icon } from '@heroicons/react/16/solid';
import { Button } from '../ui/button';
import SearchFilterMenu from '@/components/search/SearchFilterMenu';
import { useSearchResultsCounter } from '@/hooks/useSearchResultsCounter';

const queryClient = new QueryClient();

export default function SearchPageClient({
    dehydratedState,
    queryParams
}: {
    dehydratedState: unknown;
    queryParams: SearchQueryParams;
}) {
    console.count("SearchResults render");

    const {
        inputRef,
        localQuery,
        setLocalQuery,
        handleSearch,
    } = useSearchLogic();

    const isSm = useBreakpointStore((s) => s.isSm);
    const selectedView = useSearchStore((s) => s.selectedView);
    const setSelectedView = useSearchStore((s) => s.setSelectedView);
    const resultsString = useSearchResultsCounter()

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={dehydratedState}>
                <div className={cn(
                    "sticky top-0 px-3 md:px-4 lg:px-6 pt-4 pb-4 bg-pr-200 z-50 w-full",
                    "flex items-center justify-center")}>
                    <div className="flex items-center justify-center gap-2 xs:gap-4 sm:gap-6 max-w-[1300px] w-full">
                        <div
                            className={cn(
                                "flex items-center w-full bg-white border-2 border-white rounded-full",
                                "focus-within:outline-none focus-within:ring-1 focus-within:ring-ring")}
                        // layoutId="searchField"
                        >
                            <Input
                                ref={inputRef}
                                type="search"
                                enterKeyHint="search"
                                role="search"
                                value={localQuery}
                                onChange={(e) => setLocalQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                placeholder='Try "Cherry" or "Bourbon"'
                                className="bg-transparent md:min-w-86"
                                focus={"parent"}
                            />
                            <Button
                                variant={"accent"}
                                onClick={handleSearch}
                                aria-label="Search Button"
                                size={"icon"}
                                className="size-11"
                            ><MagnifyingGlassIcon />
                            </Button>
                        </div>
                        <SearchViewMenu />
                    </div>
                </div>
                <div className={cn(
                    "flex flex-col sm:flex-row flex-nowrap",
                    "mt-10 pb-50 max-w-[1920px] mx-auto",
                    "px-3 md:px-4 lg:px-6",
                    "gap-3 sm:gap-6 lg:gap-12")} >

                    <SearchFilterMenu className={"hidden lg:flex flex-col w-full lg:w-1/4 min-w-70rounded-md h-max gap-4"} />
                    <div className="@container/grid flex flex-col flex-1">
                        <div className="flex justify-between items-center w-full mb-4">
                            <span>{resultsString}</span>
                            {!isSm && <ToggleWithTooltips<ViewMode>
                                value={selectedView}
                                onChange={setSelectedView}
                                options={[
                                    { value: "grid", label: "Grid", icon: <Squares2X2Icon />, tooltip: "Grid View" },
                                    { value: "list", label: "List", icon: <Bars4Icon />, tooltip: "List View" },
                                ]}
                                showLabel={!isSm}
                                showTooltip={isSm}
                            />}
                        </div>
                        {/* <SearchInput /> */}


                        <SearchResults queryParams={queryParams} />

                    </div>
                </div>
            </HydrationBoundary>
        </QueryClientProvider>
    );
}
