import { Button } from "@/components/ui/button";
import { usePaginationStore } from "@/stores/usePaginationStore";
import { cn } from "@/utils/classes/merge";
import type { DefaultFilterItem } from "@/types/search";

type FilterTagProps = {
    tagKey: DefaultFilterItem;
    isTagSelected: (key: string) => boolean;
    isTagAvailable: boolean
    onToggle: (key: string) => void;
};

export default function FilterTag({
    tagKey,
    isTagSelected,
    isTagAvailable,
    onToggle
}:
    FilterTagProps
) {

    const resetPagination = usePaginationStore((s) => s.resetPagination)
    const isTagSet = isTagSelected(tagKey.value)
    const handleClick = () => {
        onToggle(tagKey.value)
        resetPagination()
    }

    const classes = cn(
        isTagSet && "border-pr-900 text-pr-900 inner-outline hover:border-pr-700"
    );

    return (
        <Button
            onClick={handleClick}
            variant={"soft"}
            styleType={"outlineLight"}
            size={"sm"}
            className={cn(classes)}
            disabled={!isTagAvailable}
        >
            {tagKey.label}
        </Button>
    )
}