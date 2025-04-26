"use client";

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group";
import {
    Tooltip,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/utils/classes/merge";
import { DefaultTooltip } from "@/components/tooltips/DefaultTooltip";
import { Squares2X2Icon, Bars4Icon } from "@heroicons/react/16/solid"; // or /solid if you prefer
import { useSearchStore } from "@/stores/useSearchStore"; // assuming you want fallback store support

type ViewMode = "grid" | "list";

interface ViewToggleProps {
    value?: ViewMode;
    onChange?: (view: ViewMode) => void;
    showLabel?: boolean;
    className?: string;
}

export function ViewToggle({
    value,
    onChange,
    showLabel = false,
    className,
}: ViewToggleProps) {
    // Fallback to Zustand store if props are not provided
    const selectedView = useSearchStore((s) => s.selectedView); // You'll need to have selectedView in your store
    const setSelectedView = useSearchStore((s) => s.setSelectedView);

    const effectiveValue = value ?? selectedView;
    const handleChange = onChange ?? setSelectedView;

    const toggleItemClass = "flex-1 pt-0.5 px-3 py-3 text-sm h-full leading-2 bg-white data-[state=on]:bg-pr-900 text-pr-900 data-[state=on]:text-white data-[state=on]:font-bold cursor-pointer";

    return (
        <ToggleGroup
            type="single"
            value={effectiveValue}
            onValueChange={(val) => {
                if (val) handleChange(val as ViewMode);
            }}
            className={cn("flex gap-0 rounded-sm", className)}
        >
            <ToggleGroupItem
                value="grid"
                className={cn(toggleItemClass, "rounded-l-sm rounded-r-none")}
            >
                <Tooltip>
                    <TooltipTrigger asChild>

                        <div className="flex items-center gap-1">
                            <Squares2X2Icon className="h-5 w-5" />
                            {showLabel && <span>Grid</span>}
                        </div>

                    </TooltipTrigger>
                    <DefaultTooltip title="Grid View" sideOffset={12}></DefaultTooltip>
                </Tooltip>
            </ToggleGroupItem>
            <ToggleGroupItem
                value="list"
                className={cn(toggleItemClass, "rounded-r-sm rounded-l-none")}
            >
                <Tooltip>
                    <TooltipTrigger asChild>

                        <div className="flex items-center gap-1">
                            <Bars4Icon className="h-5 w-5" />
                            {showLabel && <span>List</span>}
                        </div>

                    </TooltipTrigger>
                    <DefaultTooltip title="List View" sideOffset={12}></DefaultTooltip>
                </Tooltip>
            </ToggleGroupItem>
        </ToggleGroup>
    );
}
