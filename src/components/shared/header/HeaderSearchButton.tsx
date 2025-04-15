'use client'

import { motion } from 'framer-motion'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import SearchButton from '@/components/shared/buttons/SearchButton'
import { cn } from '@/utils/classes/merge'
import { useSearchStore } from '@/stores/useSearchStore'
import { useBreakpointStore } from '@/stores/useBreakpointStore'

type HeaderSearchButtonProps = {
    isScrolled: boolean;
    className?: string;
}

export function HeaderSearchButton({ isScrolled, className }: HeaderSearchButtonProps) {
    const toggleSearch = useSearchStore((s) => s.toggleSearch);
    const isXs = useBreakpointStore((s) => s.isXs);

    return (
        <div className={cn(
            "group md:px-6 sm:w-full md:max-w-[700px]",
            className,
            isScrolled ? "flex-1" : "sm:flex-1"
        )}>
            <motion.div
                className={cn(
                    "flex items-center min-w-max bg-white border-2 border-white rounded-full shadow-sm",
                    isScrolled ? "w-auto" : "sm:max-md:max-w-min",
                    "group-hover:bg-white/90"
                )}
                {...(!isXs && { layoutId: "searchField" })}
            >
                <button
                    role="search"
                    className={cn(
                        "font-sofia-sans text-lg text-left flex-1 outline-0 cursor-pointer",
                        "px-3 sm:px-5 pb-1.25 pt-2.5",
                        isScrolled
                            ? "aspect-auto"
                            : "aspect-square xs:aspect-auto px-2.5"
                    )}
                    onClick={toggleSearch}
                >
                    {/* Desktop label */}
                    <span className="hidden sm:inline pr-20">
                        Find your favourite beans
                    </span>

                    {/* Mobile icon and label */}
                    <div className="sm:hidden flex items-center justify-center xs:pb-0.25 xs:pr-1.5 gap-1">
                        <MagnifyingGlassIcon className="w-6 h-6 mb-1 text-pr-900 group-hover:animate-pulse" />
                        <span className={cn(
                            isScrolled ? "inline" : "hidden xs:inline"
                        )}>
                            Search for beans
                        </span>
                    </div>
                </button>

                {/* Extra search button (desktop only) */}
                <SearchButton
                    className="aspect-square rounded-full hidden sm:block"
                    onClick={toggleSearch}
                />
            </motion.div>
        </div>
    )
}
