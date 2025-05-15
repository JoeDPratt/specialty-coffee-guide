'use client'

import { motion } from 'framer-motion'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/classes/merge'
import { SearchState, useSearchStore } from '@/stores/useSearchStore'
import { useBreakpointStore } from '@/stores/useBreakpointStore'

type HeaderSearchButtonProps = {
    isScrolled: boolean;
    className?: string;
}

export function HeaderSearchButton({ isScrolled, className }: HeaderSearchButtonProps) {
    const toggleSearch = useSearchStore((s: SearchState) => s.toggleSearch);
    const isXs = useBreakpointStore((s) => s.isXs);

    return (
        <div className={cn(
            "group w-full md:max-w-[450px]",
            className,
        )}
            onClick={toggleSearch}>
            <motion.div
                className={cn(
                    "flex items-center justify-end min-w-max border-white rounded-full xs:hover:bg-white/98 hover:animate-pulse cursor-pointer",
                    isScrolled ? "w-auto border-2 bg-white" : " xs:bg-white xs:border-2",
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
                    variant={
                        !isScrolled && isXs ? "ghostDark" : "accent"}
                    // styleType={!isScrolled && isXs ? "outline" : null}
                    size={"icon"}
                    className={cn("h-10 w-10",
                    )}
                >
                    <MagnifyingGlassIcon />
                </Button>
            </motion.div>
        </div >
    )
}
