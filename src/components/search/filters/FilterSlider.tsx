// src/components/search/filters/CupScoreFilter.tsx
"use client"
import { useEffect, useState } from "react";
import { RangeSlider } from "@/components/ui/range-slider";
import { usePaginationStore } from "@/stores/usePaginationStore";
import { useDebouncedEffect } from "@/hooks/useDebounceEffect";
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

    // Debounce updates to the store, and API
    useDebouncedEffect(() => {
        setRange(localRange);
        resetPagination();
    }, [localRange]);

    function showInRange(value: number): string {
        return value >= min && value <= max ? String(value) : "--"
    }

    const labelClass = "text-xl text-pr-900 text-center px-1.5 pt-1 pb-0.75 bg-card-200 rounded-sm"

    return (
        <div className="w-full max-w-lg mx-auto">
            <div className="flex justify-between">
                <label className={cn(labelClass)}>{showInRange(localRange[0])}</label>
                <label className={cn(labelClass)}>{showInRange(localRange[1])}</label>
            </div>
            <RangeSlider
                value={localRange}
                onValueChange={setLocalRange}
                min={min - 1}
                max={max + 1}
                step={step}
                className="mt-4"
            />
        </div>
    );
}
