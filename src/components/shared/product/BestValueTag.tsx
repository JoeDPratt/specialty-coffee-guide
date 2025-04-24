import { cn } from "@/utils/classes/merge";

export default function BestValueTag({
    variant = "default"
}: {
    variant?: "default" | "outline"
}) {

    const baseClass = "text-sm font-bold tracking-wide rounded-xs pt-0.5 pb-0 px-1.5 max-h-6";

    if (variant === "outline") {
        return (
            <div className={cn(
                "border-pr-600 border-1 text-pr-600 ",
                baseClass
            )}>
                BEST VALUE
            </div>
        );
    }

    return (
        <div className={cn(
            "bg-pr-600 text-white",
            baseClass
        )}>
            BEST VALUE
        </div>
    );
}