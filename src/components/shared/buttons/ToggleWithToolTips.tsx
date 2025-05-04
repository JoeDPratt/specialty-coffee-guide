// src/components/shared/buttons/ToggleWithToolTips.tsx
"use client";

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { DefaultTooltip } from "@/components/tooltips/DefaultTooltip";
import { cn } from "@/utils/classes/merge";

export interface ToggleWithTooltipsProps<TValue extends string> {
    value: TValue;
    onChange: (value: TValue) => void;
    options: {
        value: TValue;
        label: string;
        icon?: React.ReactNode;
        tooltip?: string;
    }[];
    showLabel?: boolean;
    className?: string;
    toggleItemClassName?: string;
    tooltipOffset?: number
    showTooltip?: boolean;
}

export function ToggleWithTooltips<TValue extends string>({
    value,
    onChange,
    options,
    showLabel = true,
    className,
    toggleItemClassName,
    tooltipOffset = 12,
    showTooltip = true
}: ToggleWithTooltipsProps<TValue>) {

    const toggleItemClass = cn(
        "flex-1 px-3 py-3 text-base h-full leading-2 bg-white text-pr-700 data-[state=on]:bg-pr-700 data-[state=on]:text-white data-[state=on]:font-bold cursor-pointer",
        "transition-[fill,font-weight,color] duration-300 ease-in-out",
        toggleItemClassName
    );

    function handleChange(val: string) {
        if (val) onChange(val as TValue);
    }

    return (
        <ToggleGroup
            type="single"
            value={value}
            onValueChange={handleChange}
            className={cn("flex gap-0 rounded-full ", className)}
        >
            {options.map((option, idx) => {
                const toggleContent = (
                    <div className="flex items-center gap-1.5 ">
                        {option.icon}
                        {showLabel && <span className="-mb-0.5">{option.label}</span>}
                    </div>
                );
                return (
                    <ToggleGroupItem
                        key={option.value}
                        value={option.value}
                        className={cn(
                            "rounded-none hover:bg-pr-100",
                            "transition-[fill,font-weight,color] duration-300 ease-in-out",
                            toggleItemClass,
                            idx === 0 && "rounded-l-full rounded-r-none pl-4.5",
                            idx === options.length - 1 && "rounded-r-full rounded-l-none pr-4.5"
                        )}
                    >
                        {showTooltip ? (
                            <Tooltip>
                                <TooltipTrigger asChild>{toggleContent}</TooltipTrigger>
                                {option.tooltip && <DefaultTooltip title={option.tooltip} sideOffset={tooltipOffset} />}
                            </Tooltip>
                        ) : (
                            toggleContent
                        )}
                    </ToggleGroupItem>
                )

            })}
        </ToggleGroup>
    );
}
