// src/components/search/filters/CupScoreFilter.tsx

'use client'
import FilterSlider from "@/components/search/filters/FilterSlider";
import { cupScoreRange } from "@/consts/rangeConfig";
import { useSearchStore } from "@/stores/useSearchStore";
import FilterHeading from "@/components/search/filters/FilterHeader";
import { useActiveFilters } from "@/hooks/useActiveFilters";

export default function CupScoreFilter() {

    const { min, max } = cupScoreRange;
    const { cupScoreRange: committedRange, setCupScoreRange } = useSearchStore((s) => ({ cupScoreRange: s.cupScoreRange, setCupScoreRange: s.setCupScoreRange }));

    const { isCupScoreSet } = useActiveFilters();
    function clearRange() {
        setCupScoreRange([min - 1, max + 1])
    }

    return (
        <div>
            <FilterHeading
                title={"SCA Cup Score"}
                subtitle={"Filter by the official Specialty Coffee Association's cup score."}
                handleClear={clearRange}
                isSet={isCupScoreSet} />
            <FilterSlider
                rangeConfig={cupScoreRange}
                defaultRange={committedRange}
                setRange={setCupScoreRange} />
        </div>
    )
}