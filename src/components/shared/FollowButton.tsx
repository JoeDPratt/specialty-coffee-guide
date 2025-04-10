import type { JSX } from "react";
import { BellSlashIcon, BellIcon } from "@heroicons/react/24/solid";

interface FollowButtonProps {
    isFollowing: boolean;
    onToggle: () => void;
    labelType: "coffee" | "roaster";
    showLabel?: boolean;
    className?: string;
}

export default function FollowButton({
    isFollowing,
    onToggle,
    labelType,
    className,
    showLabel = true,
}: FollowButtonProps): JSX.Element {
    isFollowing = true;
    const label = labelType === "coffee" ? "Coffee" : "Roaster";
    const ariaLabel = `${isFollowing ? "Unfollow" : "Follow"} ${label}`;

    return (
        <button
            onClick={onToggle}
            className={`${className} border-1 ${isFollowing ? "border-sc-100" : "border-pr-600"} flex items-center font-sofia-sans-condensed uppercase tracking-wider gap-1.5 text-lg px-3 py-1.5 hover:bg-pr-100 transition-all duration-200 cursor-pointer group`}
            aria-label={ariaLabel}
        >
            {isFollowing ? (
                <BellSlashIcon className="w-4 h-4 text-sc-100 group-hover:animate-pulse" />
            ) : (
                <BellIcon className="w-4 h-4 text-pr-700" />
            )}
            {showLabel && (
                <span
                    className={`${isFollowing ? "text-sc-100" : "text-pr-700"} mt-0.5`}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </span>
            )}
        </button>
    );
}
