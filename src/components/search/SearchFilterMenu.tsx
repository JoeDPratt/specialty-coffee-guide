// src/components/search/SearchFilterMenu.tsx
'use client'
import { cn } from "@/utils/classes/merge";
import CupScoreFilter from "@/components/search/filters/CupScoreFilter";
import SourcingQualityFilter from "./filters/SourcingQualityFilter";
import { useBreakpointStore } from "@/stores/useBreakpointStore";
import { useSearchStore } from "@/stores/useSearchStore";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { useActiveFilters } from "@/hooks/useActiveFilters";

function SearchFilterMenuContent({ className }: { className?: string }) {

    return (
        <div className={cn(
            "flex flex-col gap-7.5",
            className
        )}>
            <SourcingQualityFilter />
            <hr className="hr-dark"></hr>
            <div>
                <h3 className="text-2xl leading-none mt-0 mb-0">Price</h3>
            </div>
            <hr className="hr-dark"></hr>
            <CupScoreFilter />
            <hr className="hr-dark"></hr>

        </div>
    )
}


export default function SearchMenuFilter({ className }: { className?: string }) {
    const isLg = useBreakpointStore((s) => s.isLg)
    const { areFiltersOpen, toggleFilters, totalResults, clearAllFilters } = useSearchStore((s) => ({
        areFiltersOpen: s.areFiltersOpen,
        toggleFilters: s.toggleFilters,
        totalResults: s.totalResults,
        clearAllFilters: s.clearAllFilters,
    }))
    const { isLoading, isFetching } = useSearchQuery();
    const { isAnyFilterSet } = useActiveFilters();

    const showBtnText = `Show ${totalResults} ${totalResults > 1 ? "coffees" : "coffee"}`;
    const paddingX = "px-4 xs:px-6 lg:px-0"


    return (
        <>
            <Dialog
                open={isLg && areFiltersOpen}
                onOpenChange={toggleFilters}>
                <DialogPortal forceMount>
                    <DialogContent
                        forceMount
                        className={cn(
                            "p-0 border-none h-full sm:max-h-[calc(100vh-40px)]",
                            "gap-0 rounded-b-none rounded-t-xl sm:rounded-xl bg-card-200",
                            "grid grid-rows-[auto_1fr_auto]"
                        )}
                    >

                        {/* Header */}
                        <DialogHeader className="relative space-y-0 pt-7.25 pb-3.5 border-b-2 border-pr-900/10 rounded-t-xl">
                            {isAnyFilterSet && <Button
                                variant={"secondary"}
                                size={"sm"}
                                className="absolute top-7.25 left-6 h-6 px-3 "
                                onClick={clearAllFilters}>
                                clear all
                            </Button>}
                            <DialogTitle className="m-0 text-3xl text-center font-medium font-teko tracking-wide leading-none">
                                Filters
                            </DialogTitle>
                            <DialogClose asChild>
                                <Button
                                    variant="ghost"
                                    size="iconLg"
                                    className="absolute top-4 right-4 hover:bg-white"
                                    aria-label="Close"
                                >
                                    <XMarkIcon className="size-6" />
                                </Button>
                            </DialogClose>
                        </DialogHeader>

                        {/* Scrollable Content */}

                        <div className="pt-8 pb-20 min-h-0 overflow-y-auto">
                            <SearchFilterMenuContent className={cn(paddingX)} />
                        </div>
                        {/* Footer */}
                        <div className={cn("flex items-center py-4 w-full bg-card-100 rounded-b-none sm:rounded-b-xl shadow-[0px_-10px_15px_0px_rgba(0,0,0,0.08)]", paddingX)}>
                            <Button
                                variant={"accent"}
                                size={"lg"}
                                onClick={toggleFilters}
                                isLoading={isLoading || isFetching}
                                className="w-full xs:w-60 xs:ml-auto xs:self-end"
                            >
                                {showBtnText}
                            </Button>
                        </div>
                    </DialogContent>
                </DialogPortal>
            </Dialog>

            <div className={cn("hidden lg:flex flex-col",
                // "lg:relative lg:z-0 lg:p-0 lg:bg-transparent lg:h-max lg:w-1/4 lg:min-w-70",
                "lg:sticky lg:top-29 lg:z-0 lg:p-0 lg:bg-transparent lg:h-[calc(100vh-7.25rem)] lg:w-1/4 lg:min-w-70 ",

            )}>
                <div className="">
                    <div className="flex items-center justify-between pt-0.5 mb-6">
                        <h2 className="text-3xl leading-none">Filters</h2>
                        {isAnyFilterSet && <Button
                            variant={"secondary"}
                            size={"sm"}
                            className="h-6 px-3"
                            onClick={clearAllFilters}>
                            clear all
                        </Button>}
                    </div>
                    <hr className="hr-dark"></hr>
                </div>
                <div className="flex-1 overflow-y-auto pt-7.5 pb-5 no-scrollbar">
                    <SearchFilterMenuContent />

                </div>
            </div>
        </>

    )
}