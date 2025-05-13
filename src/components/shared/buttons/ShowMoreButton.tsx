import { Button } from "@/components/ui/button"
import { cn } from "@/utils/classes/merge";
import { ChevronDownIcon } from "@heroicons/react/16/solid"

export default function ShowMoreButton({
    showAll,
    toggleShowAll,
    hiddenCount,
}: {
    showAll: boolean;
    toggleShowAll: () => void;
    hiddenCount: number;
}) {
    if (hiddenCount <= 0) return null;

    return (
        <Button
            onClick={toggleShowAll}
            variant={'link'}
            size={"none"}
            className="gap-0.5"
        >
            {showAll ? "Show less" : "Show more"}
            <ChevronDownIcon
                className={cn(
                    "size-4 transition-transform duration-100",
                    showAll && "rotate-180"
                )}
            />
            <span className="sr-only">
                {showAll
                    ? "Collapse tag list to initial filters"
                    : `Expand to show ${hiddenCount} more filters`}
            </span>

        </Button>)
}