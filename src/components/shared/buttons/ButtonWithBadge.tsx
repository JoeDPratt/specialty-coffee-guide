import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/utils/classes/merge"
import { motion, AnimatePresence } from "framer-motion"

interface ButtonWithBadgeProps extends React.ComponentProps<typeof Button> {
    count?: number
    buttonClassName?: string
    badgeClassName?: string
}

export function ButtonWithBadge({
    count,
    children,
    className,
    buttonClassName,
    badgeClassName,
    ...props
}: ButtonWithBadgeProps) {
    return (
        <div className={cn("relative inline-block", className)}>
            <Button {...props} className={cn("relative", buttonClassName)}>
                {children}
            </Button>
            <AnimatePresence>
                {count && count > 0 && (
                    <motion.span
                        key={count} // Triggers animation on value change
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={cn(
                            "absolute -top-0.75 -right-0.75 z-10 inline-flex items-center justify-center text-xs font-semibold bg-pr-700 text-white rounded-full border-1 border-pr-200 size-4.5 min-w-[18px] px-1 pt-0.25 leading-none",
                            badgeClassName
                        )}
                    >
                        {count}
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
    )
}
