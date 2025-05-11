import { cn } from "@/utils/classes/merge";
import { FlavourTag } from "./FlavourTag";
import { RoastTag } from "./RoastLabel"; // adjust path if needed

type Props = {
    roasts: string[];
    flavours: string[];
    size?: string;
    variant?: "default" | "outline" | "text";
    className?: string;
};

export default function RoastAndFlavourTagsRow({
    roasts,
    flavours,
    size = "sm",
    variant = "default",
    className
}: Props) {
    const showPipe = flavours.length > 0 && roasts.length > 0;
    return (
        <div className={cn("flex flex-wrap gap-1 items-center justify-center", className)}>
            {roasts.map((roast, idx) => (
                <RoastTag
                    key={`roast-${roast}`}
                    roast={roast}
                    size={size}
                    variant={variant}
                    lastItem={(idx + 1) === roasts.length}
                />
            ))}
            {showPipe && <span className="px-1">|</span>}
            {flavours.map((flavour, idx) => (
                <span>
                    <FlavourTag
                        key={`flavour-${flavour}`}
                        flavour={flavour}
                    />
                    {(idx + 1) < flavours.length && ","}
                </span>
            ))}
        </div>
    );
}
