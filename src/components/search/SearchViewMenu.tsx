import { useSearchQuery } from "@/hooks/useSearchQuery";
import { useSearchResultsCounter } from "@/hooks/useSearchResultsCounter";
import { useBreakpointStore } from "@/stores/useBreakpointStore";
import { ViewMode, useSearchStore } from "@/stores/useSearchStore";
import { ToggleWithTooltips, ToggleWithTooltipsProps } from "@/components/shared/buttons/ToggleWithToolTips";
import { useMemo } from "react";
import { Bars4Icon, Squares2X2Icon } from "@heroicons/react/16/solid";
import SCGSpinner from "@/components/shared/loading/SCGSpinner";

export default function SearchViewMenu() {

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
        <div className="flex justify-between items-center w-full mb-4">
            {isLoading || isFetching
                ? <span className="flex items-center gap-2" ><SCGSpinner size={32} />Loading coffees...</span>
                : <span>{resultsString}</span>
            }
            {!isSm && <ToggleWithTooltips<ViewMode>
                value={selectedView}
                onChange={setSelectedView}
                options={viewOptions}
                showLabel={!isSm}
                showTooltip={isSm}
            />}
        </div>
    )
}