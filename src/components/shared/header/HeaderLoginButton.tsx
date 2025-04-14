'use client'

import { cn } from "@/utils/classes/merge"
import { Button } from "@/components/ui/button"

type HeaderLoginButtonProps = {
    isSearchOpen: boolean
    isScrolled: boolean
    className?: string
}

export function HeaderLoginButton({
    isSearchOpen,
    isScrolled,
    className
}: HeaderLoginButtonProps) {
    return (
        <div
            className={cn(
                "md:flex justify-end hidden",
                isSearchOpen ? "w-max" :
                    isScrolled ? "sm:max-w-min" : "w-1/3",
                className
            )}
        >
            <Button
                className={cn(
                    "text-center border-white border-1 text-white px-5 pt-3 pb-2 rounded-full min-h-12",
                    "text-lg uppercase font-medium tracking-wide"
                )}
                aria-label="Log In Button"
            >
                LOG IN
            </Button>
        </div>
    )
}
