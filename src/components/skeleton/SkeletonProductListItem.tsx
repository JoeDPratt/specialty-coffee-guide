import { cn } from "@/utils/classes/merge";
import SkeletonBase from "./SkeletonBase";

export default function SkeletonProductListItem() {
    return (
        // List-style skeleton item
        <div className={cn(
            "@container/card group w-full flex transition-all overflow-hidden rounded-md bg-card-200",
        )}>
            {/* Image placeholder with your SVG */}
            <div
                className="relative aspect-square h-49.5 xl:h-34 bg-card-100 overflow-hidden"
            >
                <img
                    src="/placeholders/coffee-placeholder.svg"
                    alt="Loading coffee"
                    className="absolute inset-0 w-full h-full object-cover animate-pulse-medium opacity-70"
                />
            </div>

            {/* Text placeholders */}
            <div className="flex-1 flex justify-between">
                <div className="mt-4 space-y-2 p-6 w-4/6 xl:w-3/6">
                    <SkeletonBase width="w-3/4" height="h-8" />
                    <SkeletonBase width="w-1/2" height="h-4" />
                </div>
                <div className="mt-4 space-y-2 p-6 w-2/6 xl:inline hidden">
                    <SkeletonBase width="w-1/3" height="h-8" />
                    <SkeletonBase width="w-1/2" height="h-4" />
                </div>
                <div className="mt-4 space-y-2 p-6 w-40 flex flex-col items-end xl:justify-center justify-end">
                    <SkeletonBase width="w-2/3" height="h-8" />
                    <SkeletonBase width="w-full" height="h-4" />
                </div>
            </div>
        </div>
    )
}
