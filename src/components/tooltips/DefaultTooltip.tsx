import { cn } from "@/utils/classes/merge";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { TooltipContent } from "@/components/ui/tooltip";


interface TooltipProps {
    title?: string;
    description: string;
}

export function DefaultTooltip({ title, description }: TooltipProps) {

    return (
        <TooltipContent
            side="top"
            sideOffset={6}
            align="center"
            avoidCollisions
            className="tooltip-base">
            {title && <span className="font-medium leading-5 p-0.5">{title}</span>}
            <div className="mt-1 font-light text-sm leading-5">{description}</div>
            <TooltipArrow className="fill-pr-900 dark:fill-pr-100" />
        </TooltipContent>
    )
}