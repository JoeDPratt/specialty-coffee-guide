import { useSearchQuery } from "@/hooks/useSearchQuery";
import { useSearchResultsCounter } from "@/hooks/useSearchResultsCounter";
import { useBreakpointStore } from "@/stores/useBreakpointStore";
import { ViewMode, useSearchStore } from "@/stores/useSearchStore";
import { ToggleWithTooltips, ToggleWithTooltipsProps } from "@/components/shared/buttons/ToggleWithToolTips";
import { useMemo } from "react";
import { Bars4Icon, Squares2X2Icon } from "@heroicons/react/16/solid";
import SCGSpinner from "@/components/shared/loading/SCGSpinner";
import { cn } from "@/utils/classes/merge";
import SeacrhBarMenu from "./SearchBarMenu";

export default function SearchViewMenu({ className }: { className?: string; }) {

    const { isLoading, isFetching } = useSearchQuery();
    const resultsString = useSearchResultsCounter();

    const { selectedView, setSelectedView } = useSearchStore((s) => ({
        selectedView: s.selectedView,
        setSelectedView: s.setSelectedView,
    }));

    const isSm = useBreakpointStore((s) => s.isSm);


    const viewOptions: ToggleWithTooltipsProps<ViewMode>["options"] = useMemo(() => [
        { value: "grid", label: "Grid", icon: <Squares2X2Icon /> },
        { value: "list", label: "List", icon: <Bars4Icon /> },
    ], []);

    return (
        <div className={cn(
            "flex justify-between items-center w-full bg-pr-200 py-2 px-3 sm:px-4 lg:px-6 border-l-1 border-pr-300",
            className
        )}>
            {isLoading || isFetching
                ? <span className="flex items-center gap-2" ><SCGSpinner size={32} />Loading coffees...</span>
                : <span>{resultsString}</span>
            }
            <div className="flex items-center sm:gap-3 lg:gap-4">
                <SeacrhBarMenu />
                {!isSm && <ToggleWithTooltips<ViewMode>
                    value={selectedView}
                    onChange={setSelectedView}
                    options={viewOptions}
                    showLabel={false}
                    showTooltip={isSm}
                />}
            </div>
        </div>
    )
}