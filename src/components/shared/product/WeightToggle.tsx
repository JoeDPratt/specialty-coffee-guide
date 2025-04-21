import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { useSearchStore } from "@/stores/useSearchStore";
import { cn } from "@/utils/classes/merge";

type WeightOption = 250 | 1000;

interface WeightToggleProps {
    value?: WeightOption;
    onChange?: (weight: WeightOption) => void;
}

export function WeightToggle({ value, onChange }: WeightToggleProps) {
    // Fallback to Zustand store if props are not provided
    const selectedWeight = useSearchStore((s) => s.selectedWeight);
    const setWeight = useSearchStore((s) => s.setSelectedWeight);

    const effectiveValue = value ?? selectedWeight;
    const handleChange = onChange ?? setWeight;
    const toggleClassSmall = "py-0 px-2.5 h-6 text-sm leading-2 border-1 border-pr-300 data-[state=on]:bg-pr-300 text-pr-700/60 data-[state=on]:text-pr-700 cursor-pointer";

    return (
        <ToggleGroup
            type="single"
            value={effectiveValue.toString()}
            onValueChange={(val) => {
                if (val) handleChange(parseInt(val) as WeightOption);
            }}
            className="flex gap-0"
        >
            <ToggleGroupItem
                value="250"
                className={cn(toggleClassSmall,
                    "rounded-l-full")}
            >
                250g
            </ToggleGroupItem>
            <ToggleGroupItem
                value="1000"
                className={cn(toggleClassSmall,
                    "rounded-r-full")}
            >
                1kg
            </ToggleGroupItem>
        </ToggleGroup>
    );
}
