// src/components/search/filters/CupScoreFilter.tsx
"use client"
import { useEffect, useState } from "react";
import { RangeSlider } from "@/components/ui/range-slider";
import { usePaginationStore } from "@/stores/usePaginationStore";
import { cn } from "@/utils/classes/merge";
import type { RangeConfig } from "@/consts/rangeConfig";

interface FilterSliderProps {
    rangeConfig: RangeConfig;
    defaultRange: [number, number];
    setRange: (range: [number, number]) => void;
}

export default function FilterSlider({
    rangeConfig: { min, max, step },
    defaultRange,
    setRange
}: FilterSliderProps) {

    const [localRange, setLocalRange] = useState<[number, number]>(defaultRange);
    const resetPagination = usePaginationStore(s => s.resetPagination);

    // reset default range form the parent
    useEffect(() => {
        setLocalRange(defaultRange);
    }, [defaultRange]);

    // Commit to global store and reset pagination on release
    function handleCommit(newRange: [number, number]) {
        setRange(newRange);
        resetPagination();
    }

    function showInRange(value: number): string {
        return value >= min && value <= max ? String(value) : "--"
    }

    const labelClass = "text-xl text-pr-900 text-center px-1.5 pt-1 pb-0.75 bg-card-100 rounded-sm min-w-12"

    return (
        <div className="flex justify-between gap-2 w-full max-w-lg mx-auto items-center">
            <label className={cn(labelClass)}>{showInRange(localRange[0])}</label>
            <RangeSlider
                value={localRange}
                onValueChange={setLocalRange}
                onValueCommit={handleCommit}
                min={min - 1}
                max={max + 1}
                step={step}
                className=""
            />
            <label className={cn(labelClass)}>{showInRange(localRange[1])}</label>
        </div>
    );
}
