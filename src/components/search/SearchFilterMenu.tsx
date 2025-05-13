// src/components/search/SearchFilterMenu.tsx
'use client'
import { cn } from "@/utils/classes/merge";
import CupScoreFilter from "@/components/search/filters/CupScoreFilter";
import SourcingQualityFilter from "./filters/SourcingQualityFilter";
import { useBreakpointStore } from "@/stores/useBreakpointStore";
import { SearchState, useSearchStore } from "@/stores/useSearchStore";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogPortal, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { XMarkIcon } from "@heroicons/react/16/solid";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { useActiveFilters } from "@/hooks/useActiveFilters";
import VarietalsFilter from "./filters/VarietalsFilter";
import { useRef } from "react";
import ProcessesFilter from "./filters/ProcessesFilters";
import CountriesFilter from "./filters/CountriesFilter";

function SearchFilterMenuContent({ className }: { className?: string }) {

    return (
        <div className={cn(
            "flex flex-col gap-7.5",
            className
        )}>
            <SourcingQualityFilter />
            <hr className="hr-dark"></hr>
            <div>
                <h3 className="text-3xl leading-none mt-0 mb-0">Price</h3>
            </div>
            <hr className="hr-dark"></hr>
            <CupScoreFilter />
            <hr className="hr-dark"></hr>
            <VarietalsFilter />
            <hr className="hr-dark"></hr>
            <ProcessesFilter />
            <hr className="hr-dark"></hr>
            <CountriesFilter />
        </div>
    )
}


export default function SearchMenuFilter({ className }: { className?: string }) {
    const isLg = useBreakpointStore((s) => s.isLg)
    const { areFiltersOpen, toggleFilters, totalResults, clearAllFilters } = useSearchStore((s: SearchState) => ({
        areFiltersOpen: s.areFiltersOpen,
        toggleFilters: s.toggleFilters,
        totalResults: s.totalResults,
        clearAllFilters: s.clearAllFilters,
    }))
    const { isLoading, isFetching } = useSearchQuery();
    const { isAnyFilterSet } = useActiveFilters();

    const numberOfCoffees = totalResults > 99 ? "99+" : String(totalResults);
    const showBtnText = `Show ${numberOfCoffees} ${totalResults > 1 ? "coffees" : "coffee"}`;
    const paddingX = "px-4 xs:px-6 lg:px-0"

    const previousActiveEl = useRef<HTMLElement | null>(null);

    return (
        <>
            <Dialog
                open={isLg && areFiltersOpen}
                onOpenChange={toggleFilters}
                aria-labelledby="dialog-title"
            >
                <DialogPortal forceMount>
                    <DialogContent
                        forceMount
                        aria-labelledby="dialog-title"
                        aria-describedby="filter-dialog-description"
                        className={cn(
                            "p-0 border-none h-full sm:max-h-[calc(100dvh-40px)]",
                            "gap-0 rounded-b-none rounded-t-xl sm:rounded-xl bg-card-200",
                            "grid grid-rows-[auto_1fr_auto]"
                        )}
                    >

                        {/* Header */}
                        <DialogHeader id="dialog-title" className="relative space-y-0 pt-7.25 pb-3.5 border-b-2 border-pr-900/10 rounded-t-xl">
                            <DialogTitle
                                className="m-0 text-4xl text-center font-medium font-teko tracking-wide leading-none">
                                Filters
                            </DialogTitle>
                            <DialogDescription asChild>
                                <VisuallyHidden>Filter the coffee results by sourcing, price, cup score, and varietal.</VisuallyHidden>
                            </DialogDescription>
                            <DialogClose asChild>
                                <Button
                                    variant="ghost"
                                    size="iconLg"
                                    className="absolute top-4 right-4 hover:bg-white"
                                    aria-label="Close filter menu"
                                >
                                    <XMarkIcon className="size-6" />
                                </Button>
                            </DialogClose>
                        </DialogHeader>
                        {/* Scrollable Content */}

                        <div className="pt-8 pb-20 min-h-0 overflow-y-auto scrollbar-thin">
                            <SearchFilterMenuContent className={cn(paddingX)} />
                        </div>
                        {/* Footer */}
                        <div className={cn("flex items-center gap-4 py-4 w-full bg-card-100 rounded-b-none sm:rounded-b-xl shadow-[0px_-10px_15px_0px_rgba(0,0,0,0.08)]", paddingX)}>
                            {isAnyFilterSet && <Button
                                variant={"secondary"}
                                size={"sm"}
                                className="h-7 px-3"
                                aria-label="Clear all filters"
                                onClick={clearAllFilters}>
                                Clear all
                            </Button>}
                            <Button
                                variant={"accent"}
                                size={"lg"}
                                onClick={toggleFilters}
                                isLoading={isLoading || isFetching}
                                className="w-full text-lg xs:text-xl xs:w-60 xs:ml-auto xs:self-end"
                                aria-label={`Apply filters and show ${numberOfCoffees} coffee results`}
                            >
                                {showBtnText}
                            </Button>
                        </div>
                    </DialogContent>
                </DialogPortal>
            </Dialog>

            <aside
                className={cn("hidden lg:flex lg:flex-col",
                    " lg:px-6 lg:h-full lg:w-1/4 lg:min-w-70 lg:max-w-98 lg:bg-pr-200",
                    className)}
                aria-labelledby="filters-sidebar-title"
            >
                <div className="min-h-0">
                    <div className="flex items-center justify-between pt-8.5 mb-4">
                        <h2 id="filters-sidebar-title" className="text-3xl leading-none m-0">Filters</h2>
                        {isAnyFilterSet && <Button
                            variant={"secondary"}
                            size={"sm"}
                            className="h-7 px-3"
                            aria-label="Clear all filters"
                            onClick={clearAllFilters}>
                            Clear all
                        </Button>}
                    </div>
                    <hr className="hr-dark"></hr>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto pt-7.5 pb-5 no-scrollbar">
                    <SearchFilterMenuContent className="p-0.5 " />

                </div>
            </aside>
        </>

    )
}