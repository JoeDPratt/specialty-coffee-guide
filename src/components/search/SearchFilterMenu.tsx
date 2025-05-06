// src/components/search/SearchFilterMenu.tsx
import { cn } from "@/utils/classes/merge";
import CupScoreFilter from "@/components/search/filters/CupScoreFilter";
import SourcingQualityFilter from "./filters/SourcingQualityFilter";
import { useBreakpointStore } from "@/stores/useBreakpointStore";
import { useSearchStore } from "@/stores/useSearchStore";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { XMarkIcon } from "@heroicons/react/16/solid";

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
    const { areFiltersOpen, toggleFilters, totalResults } = useSearchStore((s) => ({
        areFiltersOpen: s.areFiltersOpen,
        toggleFilters: s.toggleFilters,
        totalResults: s.totalResults,
    }))
    const isFilterMenuOpen = isLg || areFiltersOpen;

    const showBtnText = `Show ${totalResults} ${totalResults > 1 ? "coffees" : "coffee"}`;

    const paddingX = "px-4 xs:px-6 lg:px-0"

    return (
        <>
            {isLg
                ? <Dialog open={areFiltersOpen} onOpenChange={toggleFilters}>
                    <DialogContent className="p-0 h-full md:h-[calc(100vh-40px)] md:max-h-[calc(100vh-40px)] gap-0 rounded-lg bg-card-200 grid grid-rows-[auto_1fr_auto]">
                        {/* Header */}
                        <DialogHeader className="relative space-y-0 pt-7.25 pb-3.5 border-b-2 border-pr-900/10">
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
                        <div className={cn("flex py-4 w-full bg-card-100 rounded-b-lg shadow-[0px_-10px_15px_0px_rgba(0,0,0,0.08)]", paddingX)}>
                            <Button
                                variant={"accent"}
                                size={"lg"}
                                onClick={toggleFilters}
                                className="w-60 ml-auto self-end"
                            >
                                {showBtnText}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
                :
                <div className={cn("flex flex-col gap-7.5",
                    "lg:relative lg:z-0 lg:p-0 lg:bg-transparent lg:h-max lg:w-1/4 lg:min-w-70")}>
                    <div>
                        <h2 className="text-3xl pt-0.5 leading-none mb-6">Filters</h2>
                        <hr className="hr-dark"></hr>
                    </div>
                    <SearchFilterMenuContent />
                </div>
            }
        </>

    )
}