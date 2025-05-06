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

    const padding = "px-4 xs:px-6 lg:px-0 py-8 lg:py-0"

    return (
        <>
            {/* Mobile: modal version */}
            <Dialog open={isLg && isFilterMenuOpen} onOpenChange={toggleFilters}>
                <DialogContent className="p-0 max-h-[calc(100vh-40px)] h-full gap-0 rounded-lg bg-card-200">
                    <div className="flex flex-col h-full">
                        <DialogHeader className="relative block space-y-0 pt-7.25 pb-3.5 border-b-2 border-pr-900/10 h-min">
                            <DialogTitle
                                className="m-0 text-3xl text-center font-medium font-teko tracking-wide leading-none">
                                Filters
                            </DialogTitle>
                            <DialogClose asChild>
                                <Button
                                    variant={"ghost"}
                                    size={"iconLg"}
                                    className="absolute top-4 right-4 hover:bg-white"
                                    aria-label="Close"
                                >
                                    <XMarkIcon className="size-6" />
                                </Button>
                            </DialogClose>
                        </DialogHeader>

                        <SearchFilterMenuContent className={cn("flex-1 overflow-y-auto touch-pan-y overscroll-contain no-scrollbar", padding)} />
                        {/* <div className="fixed lg:hidden w-full p-6 bottom-0 bg-card-200 flex justify-end shadow-[0px_-10px_15px_0px_rgba(0,0,0,0.08)]">
                            <Button
                                variant={"accent"}
                                size={"lg"}
                                onClick={toggleFilters}
                                className="w-60 self-end"
                            >{showBtnText}</Button>
                        </div> */}
                        <DialogFooter className={cn(
                            "bg-card-100 shadow-[0px_-10px_15px_0px_rgba(0,0,0,0.08)] rounded-b-lg py-4",
                            padding)}>
                            <Button
                                variant={"accent"}
                                size={"lg"}
                                onClick={toggleFilters}
                                className="w-55 ml-auto"
                            >
                                {showBtnText}
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Desktop: sidebar version */}
            <div className={cn("flex flex-col gap-7.5",
                "lg:relative lg:z-0 lg:p-0 lg:bg-transparent lg:h-max lg:w-1/4 lg:min-w-70")}>
                <div>
                    <h2 className="text-3xl pt-0.5 leading-none mb-6">Filters</h2>
                    <hr className="hr-dark"></hr>
                </div>
                <SearchFilterMenuContent />
            </div>
        </>

    )
}