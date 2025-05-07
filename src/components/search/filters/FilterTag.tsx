import { Button } from "@/components/ui/button";
import { usePaginationStore } from "@/stores/usePaginationStore";
import { cn } from "@/utils/classes/merge";

type FilterTagProps = {
    tagKey: string;
    isTagSelected: (key: string) => boolean;
    onToggle: (key: string) => void;
};

export default function FilterTag({
    tagKey,
    isTagSelected,
    onToggle
}:
    FilterTagProps
) {

    const resetPagination = usePaginationStore((s) => s.resetPagination)
    const isTagSet = isTagSelected(tagKey)
    const handleClick = () => {
        onToggle(tagKey)
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
        >
            {tagKey}
        </Button>
    )
}