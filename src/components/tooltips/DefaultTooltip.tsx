import { cn } from "@/utils/classes/merge";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { TooltipContent } from "@/components/ui/tooltip";


interface TooltipProps {
    title?: string;
    description?: string;
    align?: "center" | "start" | "end"
}

export function DefaultTooltip({ title, description, align = "center" }: TooltipProps) {

    return (
        <TooltipContent
            side="top"
            sideOffset={4}
            align={align}
            avoidCollisions
            className="tooltip-base">
            {title && <span className="font-medium leading-4 p-0.5">{title}</span>}
            {description && <div className="mt-1 font-light text-sm leading-5">{description}</div>}
            <TooltipArrow className="fill-pr-900 dark:fill-pr-100" />
        </TooltipContent>
    )
}