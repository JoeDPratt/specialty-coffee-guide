import type { JSX, ReactNode } from "react"
import { cn } from "@/utils/classes/merge"

type IconButtonProps = {
    icon?: JSX.Element
    children?: ReactNode
    label?: string
    iconPosition?: "left" | "right"
    onClick?: () => void
    className?: string
    ariaLabel?: string
}

export default function IconButton({
    icon,
    children,
    label,
    iconPosition = "left",
    onClick,
    className,
    ariaLabel = "Icon Button"
}: IconButtonProps): JSX.Element {
    return (
        <button
            onClick={onClick}
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full transition-all duration-200 cursor-pointer",
                "pt-3 pb-2 text-lg uppercase font-medium tracking-wide min-h-12",
                "bg-pr-500 hover:bg-pr-400 text-white group",
                icon && label ? "pl-4 pr-5"
                    : icon && !label ? "aspect-square px-3" : "px-6",
                className
            )}
            aria-label={ariaLabel}
        >
            {iconPosition === "left" && icon}
            {label && <span>{label}</span>}
            {iconPosition === "right" && icon}
        </button>
    )
}
