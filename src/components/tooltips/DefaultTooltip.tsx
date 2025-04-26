import { cn } from "@/utils/classes/merge";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { TooltipContent } from "@/components/ui/tooltip";


interface TooltipProps {
    title?: string;
    description?: string;
    align?: "center" | "start" | "end"
    sideOffset?: number;

}

export function DefaultTooltip({ title, description, align = "center", sideOffset = 4 }: TooltipProps) {

    return (
        <TooltipContent
            side="top"
            sideOffset={sideOffset}
            align={align}
            avoidCollisions
            className={cn(description ? "tooltip-base" : "tooltip-no-descritpion")}>
            {title && <span className={cn(
                "font-medium leading-4 p-0.5")}>{title}</span>}
            {description && <div className="mt-1 font-light text-sm leading-5">{description}</div>}
            <TooltipArrow className="fill-pr-900 dark:fill-pr-100" />
        </TooltipContent>
    )
}