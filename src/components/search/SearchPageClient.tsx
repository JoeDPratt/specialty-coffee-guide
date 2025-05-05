// components/search/SearchPageClient.tsx
'use client';

import { HydrationBoundary } from '@tanstack/react-query';
import SearchResults from '@/components/search/SearchResults';
import SearchInputBar from '@/components/search/SearchInputBar';
import type { SearchQueryParams } from '@/types/search';
import { cn } from '@/utils/classes/merge';
import { ViewMode, useSearchStore } from '@/stores/useSearchStore';
import { ToggleWithTooltips, ToggleWithTooltipsProps } from '../shared/buttons/ToggleWithToolTips';
import { Bars4Icon, Squares2X2Icon } from '@heroicons/react/16/solid';
import SearchFilterMenu from '@/components/search/SearchFilterMenu';
import { useSearchResultsCounter } from '@/hooks/useSearchResultsCounter';
import { useSearchQuery } from '@/hooks/useSearchQuery';
import SCGSpinner from '../shared/loading/SCGSpinner';
import { useHydrateSearchStores } from '@/hooks/useHydrateSearchStores';
import { useMemo } from 'react';
import { useBreakpointStore } from '@/stores/useBreakpointStore';


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

    const { isLoading, isFetching } = useSearchQuery();
    const resultsString = useSearchResultsCounter();

    const { selectedView, setSelectedView, areFiltersOpen } = useSearchStore((s) => ({
        selectedView: s.selectedView,
        setSelectedView: s.setSelectedView,
        areFiltersOpen: s.areFiltersOpen,
    }));

    const isSm = useBreakpointStore((s) => s.isSm);
    const isLg = useBreakpointStore((s) => s.isLg);
    const isFilterMenuOpen = !isLg || areFiltersOpen;

    const viewOptions: ToggleWithTooltipsProps<ViewMode>["options"] = useMemo(() => [
        { value: "grid", label: "Grid", icon: <Squares2X2Icon /> },
        { value: "list", label: "List", icon: <Bars4Icon /> },
    ], []);

    return (
        <HydrationBoundary state={dehydratedState}>
            <div className={cn(
                "sticky top-0 px-3 md:px-4 lg:px-6 pt-4 pb-4 bg-pr-200 z-50 w-full",
                "flex items-center justify-center")}>
                <SearchInputBar />
            </div>
            <div className={cn(
                "flex flex-col sm:flex-row flex-nowrap",
                "mt-10 pb-50 max-w-[1920px] mx-auto",
                "px-3 md:px-4 lg:px-6",
                "gap-3 sm:gap-6 lg:gap-12")} >

                {isFilterMenuOpen && <SearchFilterMenu className={"flex flex-col w-full lg:w-1/4 min-w-70rounded-md h-max gap-4"} />}
                <div className="@container/grid flex flex-col flex-1">
                    <div className="flex justify-between items-center w-full mb-4">
                        {isLoading || isFetching
                            ? <span className="flex items-center gap-2" ><SCGSpinner size={32} />Loading coffees...</span>
                            : <span>{resultsString}</span>
                        }
                        {!isSm && <ToggleWithTooltips<ViewMode>
                            value={selectedView}
                            onChange={setSelectedView}
                            options={viewOptions}
                            showLabel={!isSm}
                            showTooltip={isSm}
                        />}
                    </div>
                    <SearchResults />
                </div>
            </div>
        </HydrationBoundary>
    );
}
