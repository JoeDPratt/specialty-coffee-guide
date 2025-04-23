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
    className?: string;
}

export function WeightToggle({ value, onChange, className }: WeightToggleProps) {
    // Fallback to Zustand store if props are not provided
    const selectedWeight = useSearchStore((s) => s.selectedWeight);
    const setWeight = useSearchStore((s) => s.setSelectedWeight);

    const effectiveValue = value ?? selectedWeight;
    const handleChange = onChange ?? setWeight;
    const toggleClassSmall = "pt-0.25 px-3 w-1/2 text-sm h-full leading-2 bg-card-200 data-[state=on]:bg-pr-600 text-pr-700/60 data-[state=on]:text-white data-[state=on]:font-bold cursor-pointer ";

    return (
        <ToggleGroup
            type="single"
            value={effectiveValue.toString()}
            onValueChange={(val) => {
                if (val) handleChange(parseInt(val) as WeightOption);
            }}
            className="flex gap-0 rounded-sm"
        >
            <ToggleGroupItem
                value="250"
                className={cn(
                    toggleClassSmall,
                    className,
                    "rounded-l-sm rounded-r-none")}
            >
                250g
            </ToggleGroupItem>
            <ToggleGroupItem
                value="1000"
                className={cn(
                    toggleClassSmall,
                    className,
                    "rounded-r-sm rounded-l-none")}
            >
                1kg
            </ToggleGroupItem>
        </ToggleGroup>
    );
}
