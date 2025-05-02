import { ToggleWithTooltips } from "../shared/buttons/ToggleWithToolTips";
import { useSearchStore } from "@/stores/useSearchStore";
import type { WeightOption } from "@/stores/useSearchStore";
import { DropdownSort } from "./DropdownSort";
import { Button } from "../ui/button";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/16/solid";
import { ButtonWithBadge } from "../shared/buttons/ButtonWithBadge";
import { useFilterCount } from "@/hooks/useFilterCount";

export default function SeacrhViewMenu() {
    const selectedWeight = useSearchStore((s) => s.selectedWeight);
    const setWeight = useSearchStore((s) => s.setSelectedWeight);
    const filterCount = useFilterCount();

    return (
        <div className="flex items-center gap-2 xs:gap-4 md:gap-6">
            {/* Filter Icon Button, shows below lg */}
            <ButtonWithBadge
                variant={"default"}
                styleType={"outline"}
                count={filterCount}
                // onClick={}
                aria-label="Filter Option Button"
                size={"icon"}
                className="inline lg:hidden"
            >
                <AdjustmentsHorizontalIcon />
            </ButtonWithBadge>

            <div className="hidden items-center gap-2 lg:flex">
                <span className="mt-0.5 text-base min-w-max">View prices for:</span>
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
            <DropdownSort />
        </div>
    )
}