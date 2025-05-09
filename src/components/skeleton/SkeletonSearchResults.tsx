import React from "react";
import { cn } from "@/utils/classes/merge";
import SkeletonProductCard from "@/components/skeleton/SkeletonProductCard";
import SkeletonProductListItem from "@/components/skeleton/SkeletonProductListItem";
import { useBreakpointStore } from "@/stores/useBreakpointStore";


export type SkeletonSearchResultsProps = {
    /** 'list' for list view, 'grid' for grid/card view */
    view: "list" | "grid";
    /** Number of skeleton items to render */
    count?: number;
};

export default function SkeletonSearchResults({
    view,
    count = 6,
}: SkeletonSearchResultsProps) {
    // Prepare an array of placeholders
    const placeholders = Array.from({ length: count });
    const isLg = useBreakpointStore((s) => s.isLg)

    // Determine container classes matching SearchResults
    const containerClass = cn(
        view === "list" && !isLg
            ? "gap-8 sm:gap-4 flex flex-col"
            : "gap-4 grid grid-cols-1 @min-search-2-col/grid:grid-cols-2 @min-search-3-col/grid:grid-cols-3 @min-search-4-col/grid:grid-cols-4"
    );

    return (
        <div>
            <div className={containerClass}>
                {placeholders.map((_, idx) => (
                    <div key={idx} className="flex flex-col h-full">
                        {view === "list" && !isLg ? (
                            <SkeletonProductListItem />
                        ) : (
                            // Grid/card-style skeleton item
                            <SkeletonProductCard />
                        )}
                    </div>
                ))}
            </div>

        </div>
    );
}
