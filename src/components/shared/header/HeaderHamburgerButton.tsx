'use client'

import { cn } from "@/utils/classes/merge"
import { Button } from "@/components/ui/button"
import { Bars3Icon } from '@heroicons/react/16/solid'

type HeaderHamburgerButtonProps = {
    isSearchOpen: boolean
    isScrolled: boolean
    className?: string
}

export function HeaderHamburgerButton({
    isSearchOpen,
    isScrolled,
    className
}: HeaderHamburgerButtonProps) {
    // If search is open, hide the hamburger
    if (isSearchOpen) return null

    return (
        <div
            className={cn(
                "md:hidden justify-end flex",
                isScrolled ? "max-w-min" : "md:w-1/3",
                className
            )}
        >
            <Button
                className={cn(
                    "text-center border-white border-1 text-white px-2 pt-3 pb-2 text-lg uppercase font-medium rounded-full min-h-12 aspect-square"
                )}
                aria-label="Open Menu"
            >
                <Bars3Icon className="text-3xl mb-1 text-white group-hover:animate-pulse" />
            </Button>
        </div>
    )
}
