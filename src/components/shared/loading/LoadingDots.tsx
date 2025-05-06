import { cn } from "@/utils/classes/merge";

export function LoadingDots({ className }: { className?: string }) {
    return (
        <span className={cn("flex gap-1 items-center", className)}>
            {[...Array(3)].map((_, i) => (
                <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-current animate-bounce-high"
                    style={{ animationDelay: `${i * 0.1}s` }}
                />
            ))}
        </span>
    );
}