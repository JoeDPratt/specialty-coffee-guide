import { useState } from "react";
import FilterTag from "./FilterTag";
import ShowMoreButton from "@/components/shared/buttons/ShowMoreButton";
import type { DefaultFilterItem } from "@/types/search";

export default function FilterExpandingTagRow({
    filterTags,
    visibleCount = 11,
    onToggle,
    isTagSelected,
    availableTags,
}: {
    filterTags: DefaultFilterItem[]
    visibleCount?: number
    isTagSelected: (key: string) => boolean;
    onToggle: (key: string) => void;
    availableTags: string[]
}) {

    const [showAll, setShowAll] = useState(false);
    const visibleTags =
        showAll
            ? filterTags
            : visibleCount >= 0 ? filterTags.slice(0, visibleCount) : filterTags;

    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-5">
                {visibleTags.map((tagKey) => (
                    <FilterTag
                        key={tagKey.value}
                        tagKey={tagKey}
                        onToggle={onToggle}
                        isTagSelected={isTagSelected}
                        isTagAvailable={true}

                    />
                ))}
            </div>

            <ShowMoreButton
                showAll={showAll}
                toggleShowAll={() => setShowAll((prev) => !prev)}
                hiddenCount={filterTags.length - visibleCount}
            />
        </div>
    )
}