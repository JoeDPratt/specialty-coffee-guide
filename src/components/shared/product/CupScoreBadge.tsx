import SCALogo from "@/../public/icons/sca-logo.svg";
// import Wreath from "@/../public/images/wreath.svg";
import SCGLogoMark from "@/../public/images/scg-logomark-red.svg";
import type { JSX } from "react";

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
    if (!score) return null;

    if (variant === "default") {
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

    return null;
}
