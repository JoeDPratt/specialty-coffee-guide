// src/components/search/filters/CupScoreFilter.tsx

'use client'
import FilterSlider from "@/components/search/filters/FilterSlider";
import { cupScoreRange } from "@/consts/rangeConfig";
import { useSearchStore } from "@/stores/useSearchStore";
import FilterHeading from "@/components/search/filters/FilterHeading";

export default function CupScoreFilter() {

    const { min, max } = cupScoreRange;
    const { cupScoreRange: committedRange, setCupScoreRange } = useSearchStore((s) => ({ cupScoreRange: s.cupScoreRange, setCupScoreRange: s.setCupScoreRange }));

    const isSet = committedRange[0] !== min - 1 || committedRange[1] !== max + 1;

    function clearRange() {
        setCupScoreRange([min - 1, max + 1])
    }

    return (
        <div>
            <FilterHeading
                title={"SCA Cup Score"}
                subtitle={"Scored according to the Specialty Coffee Association's official cupping protocol"}
                handleClear={clearRange}
                isSet={isSet} />
            <FilterSlider
                rangeConfig={cupScoreRange}
                defaultRange={committedRange}
                setRange={setCupScoreRange} />
        </div>
    )
}