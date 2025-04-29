'use client'

import { motion } from 'framer-motion'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import { Button } from '@/components/ui/button';
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
                    "flex items-center min-w-max bg-white border-2 border-white rounded-full shadow-sm hover:bg-white/98 hover:animate-pulse cursor-pointer",
                    isScrolled ? "w-auto" : "sm:max-md:max-w-min",
                    "group-hover:bg-white/90"
                )}
                {...(!isXs && { layoutId: "searchField" })}

            >
                <button
                    role="search"
                    className={cn(
                        "font-sofia-sans text-lg text-left flex-1 outline-0 leading-2 cursor-pointer",
                        "px-4 sm:px-5 pb-1.25 pt-2",
                        isScrolled ? "inline" : "hidden xs:inline"
                    )}
                    onClick={toggleSearch}
                >
                    {/* Desktop label */}
                    <span className="hidden sm:inline">
                        Find your favourite beans
                    </span>

                    {/* Mobilelabel */}
                    <span className={cn(
                        "",
                        isScrolled ? "inline sm:hidden" : "hidden xs:max-sm:inline"
                    )}>
                        Search coffee
                    </span>
                </button>
                <Button
                    variant={"accent"}
                    size={"icon"}
                    className="h-11 w-11"
                    onClick={toggleSearch}>
                    <MagnifyingGlassIcon />
                </Button>
            </motion.div>
        </div>
    )
}
