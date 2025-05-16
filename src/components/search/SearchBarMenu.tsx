import { ToggleWithTooltips } from "../shared/buttons/ToggleWithToolTips";
import { useSearchStore, type SearchState, type WeightOption } from "@/stores/useSearchStore";
import { DropdownSort } from "./DropdownSort";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/16/solid";
import { ButtonWithBadge } from "../shared/buttons/ButtonWithBadge";
import { useActiveFilters } from "@/hooks/useActiveFilters";
import { useBreakpointStore } from "@/stores/useBreakpointStore";
import { DropdownPriceView } from "./DropdownPriceView";

export default function SeacrhBarMenu() {

    const {
        selectedWeight,
        setWeight,
        toggleFilters,
    } = useSearchStore((s: SearchState) => ({
        selectedWeight: s.selectedWeight,
        setWeight: s.setSelectedWeight,
        toggleFilters: s.toggleFilters,
    }));
    const isSm = useBreakpointStore((s) => s.isSm);
    const { filterCount } = useActiveFilters();

    return (
        <div className="flex items-center gap-3">
            {/* Filter Icon Button, shows below lg */}
            <ButtonWithBadge
                variant={"default"}
                styleType={"outline"}
                count={filterCount}
                onClick={toggleFilters}
                aria-label="Filter Option Button"
                size={isSm ? "icon" : "default"}
                className="inline lg:hidden"
                buttonClassName="sm:pl-3 sm:pr-4"
            >
                <AdjustmentsHorizontalIcon />
                <span className="hidden sm:inline pl-0.5">Filters</span>
            </ButtonWithBadge>
            <DropdownPriceView />
            <DropdownSort />
        </div>
    )
}