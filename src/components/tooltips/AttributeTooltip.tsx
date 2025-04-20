import type { JSX } from "react";
import { cn } from "@/utils/classes/merge";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { TooltipContent } from "@/components/ui/tooltip";

interface IconProps {
    className?: string;
}

interface AttributeTooltipProps {
    title: string | JSX.Element;
    icon: React.ComponentType<IconProps>;
    iconColorClass: string;
    description: string;
}

export function AttributeTooltip({ icon, iconColorClass, title, description }: AttributeTooltipProps) {

    const Icon = icon;

    return (
        <TooltipContent
            side="top"
            sideOffset={6}
            align="center"
            avoidCollisions
            className="tooltip-base">
            <div className="flex items-end justify-start">
                <Icon className={cn("w-7 h-auto inline -ml-1 mr-1.25", iconColorClass)} />
                <span className="font-medium leading-5 p-0.5">{title}</span>
            </div>

            <div className="mt-1 font-light text-sm leading-5">{description}</div>
            <TooltipArrow className="fill-pr-900 dark:fill-pr-100" />
        </TooltipContent>
    )
}