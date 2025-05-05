// src/components/search/SearchFilterMenu.tsx
import { cn } from "@/utils/classes/merge";
import CupScoreFilter from "@/components/search/filters/CupScoreFilter";
import SourcingQualityFilter from "./filters/SourcingQualityFilter";
import { useBreakpointStore } from "@/stores/useBreakpointStore";
import { useSearchStore } from "@/stores/useSearchStore";
import { Button } from "../ui/button";

export default function SearchFilterMenu({ className }: { className: string }) {

    const isLg = useBreakpointStore((s) => s.isLg)
    const { areFiltersOpen, toggleFilters, totalResults } = useSearchStore((s) => ({
        areFiltersOpen: s.areFiltersOpen,
        toggleFilters: s.toggleFilters,
        totalResults: s.totalResults,
    }))
    const isFilterMenuOpen = isLg || areFiltersOpen;

    const showBtnText = `Show ${totalResults} ${totalResults > 1 ? "coffees" : "coffee"}`;

    return (
        <div className={cn(className)}>
            <h2 className="text-3xl pt-0.5 leading-none mb-2">Filters</h2>
            <div className={cn("flex flex-col gap-7.5")}>

                <hr className="hr-dark"></hr>
                <SourcingQualityFilter />
                <hr className="hr-dark"></hr>
                <div>
                    <h3 className="text-2xl leading-none mt-0 mb-0">Price</h3>
                </div>
                <hr className="hr-dark"></hr>
                <CupScoreFilter />
                <hr className="hr-dark"></hr>

            </div>
            {isFilterMenuOpen && <Button
                variant={"accent"}
                onClick={toggleFilters}
                className="w-60 self-end"
            >{showBtnText}</Button>}
        </div>
    )
}