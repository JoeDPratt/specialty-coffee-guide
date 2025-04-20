import SCALogo from "@/components/icons/sca-logo.svg";
import { cn } from "@/utils/classes/merge";
// import Wreath from "@/../public/images/wreath.svg";
import SCGLogoMark from "@public/images/scg-logomark-red.svg";
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
}

export default function CupScoreBadge({
    score,
    className,
    variant = "default",
}: CupScoreBadgeProps): JSX.Element | null {

    const isScore: boolean = Boolean(score)

    if (variant === "card") {
        return (
            <Tooltip>
                <TooltipTrigger asChild >
                    <div className={`${className} w-auto`}>
                        <div className={cn("text-center flex flex-row gap-1.5 items-center pt-1.5 pb-0.75 px-2 max-w-max rounded-sm",
                            isScore ? "bg-white shadow-xs" : "bg-card-200 shadow-none")}>
                            <SCALogo
                                role="img"
                                aria-label="Specialty Coffee Association cup score logo"
                                className={cn(
                                    "h-5.5 mb-0.5 ml-0.5 fill-pr-900",
                                    isScore ? "opacity-100" : "opacity-30"
                                )}
                            />
                            <div className={cn(
                                "font-teko text-[31px] tracking-wider leading-6 pt-0.75 text-pr-900",
                                isScore ? "opacity-100 font-semibold" : "opacity-30 font-light"
                            )}>
                                {isScore ? score : "- -"}
                            </div>
                        </div>
                    </div>
                </TooltipTrigger>
                <DefaultTooltip
                    title={"Specialty Coffee Association Cup Score"}
                    description={"Scored according to the SCA’s official cupping protocol, reflecting the coffee’s quality and taste attributes."} />
            </Tooltip>
        );
    } else {
        if (!score) return null;
        return (
            <div className={`${className} w-auto`}>
                <div className="relative">
                    <SCGLogoMark className="absolute h-38 top-0 -mt-6 left-1/2 -translate-x-1/2 -z-10 fill-pr-100 pointer-events-none" />
                </div>
                <div className="text-center text-pr-800 flex flex-col gap-1 items-center mt-1.5 mb-2.5">
                    <SCALogo
                        role="img"
                        aria-label="Specialty Coffee Association cup score logo"
                        className="h-6 mb-0.5 w-auto mx-auto fill-pr-800"
                    />
                    <div className="font-sofia-sans-condensed leading-4 tracking-wide font-medium text-base mt-0 -mb-0.25">
                        CUP SCORE
                    </div>
                    <hr className="h-0.25 text-pr-800 bg-pr-800 color-pr-800 border-none w-1/3"></hr>
                    <div className="font-sofia-sans-condensed text-4xl font-black leading-8 mt-0.25">
                        {score}
                    </div>
                </div>
            </div>
        );

    }
}
