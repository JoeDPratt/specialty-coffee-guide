import SCALogo from "@/components/icons/sca-logo.svg";
import { cn } from "@/utils/classes/merge";
// import Wreath from "@/../public/images/wreath.svg";
import SCGLogoMark from "@/components/icons/scg-logomark-red.svg";
import type { JSX } from "react";
import {
    Tooltip,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { DefaultTooltip } from "@/components/tooltips/DefaultTooltip";

interface CupScoreBadgeProps {
    score: number | null;
    className?: string;
    variant?: string;
    hasBackground?: boolean;
    hasTitle?: boolean;
    isStacked?: boolean;
}

export default function CupScoreBadge({
    score,
    className,
    variant = "default",
    hasBackground = true,
    hasTitle = false,
    isStacked = false
}: CupScoreBadgeProps): JSX.Element | null {

    const isScore: boolean = Boolean(score)


    if (variant === "card") {
        return (
            <div className={`${className}`}>
                <Tooltip>
                    <TooltipTrigger asChild >

                        <div className={cn(
                            "text-center flex gap-1.5 items-center max-w-max rounded-sm",
                            hasBackground ?
                                [isScore ? "bg-card-100 " : "bg-card-200 shadow-none", "pt-1.5 pb-0.75"]
                                : "bg-transparent shadow-none p-0",
                            hasTitle ? "px-3 pt-1.75 pb-1.25" : "px-2",
                            isStacked ? "flex-col px-2.5" : "flex-row"
                        )}>
                            <div className={cn(
                                "flex gap-1.5 items-center",
                                isStacked && "pb-0.75 mb-2 border-b-2 border-card-200"
                            )}>
                                <SCALogo
                                    role="img"
                                    aria-label="Specialty Coffee Association cup score logo"
                                    className={cn(
                                        "mb-0.5 ml-0.5",
                                        isScore ? "fill-pr-900" : "fill-disabled-400",
                                        hasTitle ? "h-7" : "h-5"
                                    )}
                                />
                                {hasTitle && <div className={cn(
                                    "text-sm font-medium text-left ",
                                    isStacked ? "pl-0.5" : "pl-1 pr-4 border-r-2 border-card-200")}>
                                    <div className="leading-4">CUP</div>
                                    <div className="leading-4">SCORE</div>
                                </div>}
                            </div>
                            <div className={cn(
                                "font-teko text-[31px] sm:max-md:text-[28px] leading-6 pt-0.75",
                                isScore ? "text-pr-900 font-semibold" : "text-disabled-400 font-light",
                                hasTitle ? "pl-2 text-4xl leading-2 pt-1" : "pl-0",
                                isStacked ? "pb-2.25" : ""
                            )}>
                                {isScore ? score : "--"}
                            </div>
                        </div>

                    </TooltipTrigger>
                    <DefaultTooltip
                        title={"Specialty Coffee Association Cup Score"}
                        description={"Scored according to the SCA’s official cupping protocol, reflecting the coffee’s quality and taste attributes."} />
                </Tooltip>
            </div>
        );
    } else {
        if (!score) return null;
        return (
            <div className={`${className} w-auto z-100`}>
                <div className="relative -z-10">
                    <SCGLogoMark className="absolute h-32 top-0 -mt-6 left-1/2 -translate-x-1/2 fill-pr-300 pointer-events-none" />
                </div>
                <div className="text-center text-pr-800 flex flex-col gap-1 items-center mt-1.5 mb-2.5">
                    <SCALogo
                        role="img"
                        aria-label="Specialty Coffee Association cup score logo"
                        className="h-6 mb-0.5 w-auto mx-auto fill-pr-900"
                    />
                    <div className="font-sofia-sans-condensed text-pr-900 text-4xl font-black leading-8 mt-0.25">
                        {score}
                    </div>
                </div>
            </div>
        );

    }
}
