import { useBreakpointStore } from "@/stores/useBreakpointStore";
import { ToggleWithTooltips } from "../shared/buttons/ToggleWithToolTips";
import { useSearchStore } from "@/stores/useSearchStore";
import { Bars4Icon, Squares2X2Icon } from '@heroicons/react/16/solid';
import type { WeightOption, ViewMode } from "@/stores/useSearchStore";
import { DropdownSort } from "./DropdownSort";

export function SeacrhViewMenu() {
    const isSm = useBreakpointStore((s) => s.isSm);
    const selectedView = useSearchStore((s) => s.selectedView);
    const setSelectedView = useSearchStore((s) => s.setSelectedView);
    const selectedWeight = useSearchStore((s) => s.selectedWeight);
    const setWeight = useSearchStore((s) => s.setSelectedWeight);

    return (
        <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
                <span className="mt-0.5 text-base">Viewing prices for:</span>
                <ToggleWithTooltips<WeightOption>
                    value={selectedWeight}
                    onChange={setWeight}
                    options={[
                        { value: "250", label: "250g", tooltip: "Compare prices of coffees available in 250g bags" },
                        { value: "1000", label: "1kg", tooltip: "Compare prices of coffees available in 1kg bags" },
                    ]}
                    toggleItemClassName={"py-4.25"}
                    tooltipOffset={17}
                />
            </div>
            <ToggleWithTooltips<ViewMode>
                value={selectedView}
                onChange={setSelectedView}
                options={[
                    { value: "grid", label: "Grid", icon: <Squares2X2Icon />, tooltip: "Grid View" },
                    { value: "list", label: "List", icon: <Bars4Icon />, tooltip: "List View" },
                ]}
                showLabel={!isSm}
                showTooltip={isSm}
            />
            <DropdownSort />
        </div>
    )
}