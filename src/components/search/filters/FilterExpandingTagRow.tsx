import { useState } from "react";
import FilterTag from "./FilterTag";

export default function FilterExpandingTagRow({
    filterTags,
    visibleCount = 9,
    onToggle,
    isTagSelected,
}: {
    filterTags: string[]
    visibleCount?: number
    isTagSelected: (key: string) => boolean;
    onToggle: (key: string) => void;
}) {

    const [showAll, setShowAll] = useState(false);
    const visibleTags = showAll ? filterTags : filterTags.slice(0, visibleCount);

    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-3">
                {visibleTags.map((tagKey) => (
                    <FilterTag
                        key={tagKey}
                        tagKey={tagKey}
                        onToggle={onToggle}
                        isTagSelected={isTagSelected}
                    // config={filterConfig[filterKey]}
                    />
                ))}
            </div>

            {/* {filterTags.length > visibleCount && (
                <button
                    onClick={() => setShowAll((prev) => !prev)}
                    className="text-sm text-neutral-500 hover:underline"
                >
                    {showAll ? "Show less" : "Show more"}
                </button>
            )} */}
        </div>
    )
}