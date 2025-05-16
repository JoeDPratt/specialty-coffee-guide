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
        <div className="flex items-center gap-3 lg:gap-4">
            {/* Filter Icon Button, shows below lg */}
            <ButtonWithBadge
                variant={"default"}
                styleType={"outline"}
                count={filterCount}
                onClick={toggleFilters}
                aria-label="Filter Option Button"
                size={isSm ? "icon" : "default"}
                className="inline lg:hidden"
            >
                <AdjustmentsHorizontalIcon />
                <span className="hidden sm:inline pl-0.5">Filters</span>
            </ButtonWithBadge>

            <div className="items-center gap-2 lg:flex">
                <span className="hidden lg:inline mt-0.5 text-base min-w-max">View prices for:</span>
                <DropdownPriceView />
            </div>
            <DropdownSort />
        </div>
    )
}