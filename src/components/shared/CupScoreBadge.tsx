import SCALogo from "@/../public/icons/sca-logo.svg";

export default function CupScoreBadge({ score, variant = "default" }: { score?: number | null, variant?: string }) {
    return (
        <div className="bg-pr-100 rounded-full aspect-square">
            <SCALogo
                role="img"
                aria-label="Specialty Coffee Association cup score logo"
                className="h-[64px] w-auto fill-pr-800 dark:fill-white"
            />
            <div className="font-sofia-sans">
                <div className="text-lg font-light pl-1 pb-1.25">Cup score</div>
                    <div className="text-5xl -mt-2">{score}</div>
            </div>

        </div>
    )
}