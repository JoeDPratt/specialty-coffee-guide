'use client'
import { useRef, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import SCGLogoBig from "@public/logos/scg-logo-stacked.svg"
import SCGLogoSmall from "@public/logos/scg-logo-mark.svg"
import SearchButton from '../buttons/SearchButton'
import { useStickyStore } from '@/stores/useStickyStore'
import { useSearchStore } from '@/stores/useSearchStore';
import ExpandedSearch from '../search/ExpandedSearch'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/classes/merge'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import { Bars3Icon } from '@heroicons/react/16/solid'
import { HeaderLogo } from './HeaderLogo'
import { HeaderSearchButton } from './HeaderSearchButton'

export default function Header() {
    const isSearchOpen = useSearchStore((s) => s.isSearchOpen);
    const toggleSearch = useSearchStore((s) => s.toggleSearch);
    const setIsScrolled = useStickyStore((state) => state.setIsScrolled);
    const isScrolled = useStickyStore((state) => state.isScrolled);
    const sentinelRef = useRef<HTMLDivElement>(null)
    const isHeaderBgVisible = isSearchOpen || isScrolled;

    useLayoutEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsScrolled(!entry.isIntersecting)
            },
            { threshold: 1 }
        )

        if (sentinelRef.current) observer.observe(sentinelRef.current)
        return () => observer.disconnect()
    }, [setIsScrolled])

    return (
        <>
            <div ref={sentinelRef} className="absolute top-8 h-1 w-full pointer-events-none" />

            <motion.header
                className="sticky top-0 z-50"
                style={{ height: '112px' }}
                role="banner"
                aria-label="SCG site header"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                    duration: 0.3,
                    ease: [0.5, 0, 0.1, 1]
                }}
            >
                <div className="relative">
                    <motion.div
                        className={cn(
                            "flex justify-start xs:justify-between items-center gap-3 sm:gap-6 px-3 md:px-6 transition-colors duration-300",
                            isHeaderBgVisible ? "bg-pr-900" : "bg-transparent"
                        )}
                        animate={isHeaderBgVisible ? { paddingTop: 12, paddingBottom: 12 } : { paddingTop: 24, paddingBottom: 24 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Logo */}
                        <motion.div
                            className={cn(
                                "flex-1 xs:flex-shrink-0",
                                isSearchOpen ? "w-max hidden md:block" :
                                    isScrolled ? "max-w-min" : "w-1/3"
                            )}
                        >
                            <HeaderLogo
                                isCompact={isScrolled}
                                isSearchOpen={isSearchOpen}
                            />
                        </motion.div>

                        {/* Search Button / Looks like an input */}
                        {!isSearchOpen && <HeaderSearchButton isScrolled={isScrolled} />}

                        {/* Login */}
                        <div className={cn(
                            "md:flex justify-end hidden",
                            isSearchOpen ? "w-max" :
                                isScrolled ? "sm:max-w-min" : "w-1/3")
                        }>
                            <Button
                                className={cn(
                                    "text-center border-white border-1 text-white px-5 pt-3 pb-2 text-lg uppercase font-medium rounded-full min-h-12"
                                )}
                                aria-label="Log In Button"
                            >
                                LOG IN
                            </Button>
                        </div>

                        {/* Hamburger */}
                        <div className={cn(
                            "md:hidden justify-end flex",
                            isSearchOpen ? "hidden" :
                                isScrolled ? "max-w-min" : "sm:w-1/3")
                        }>
                            <Button
                                className={cn(
                                    "text-center border-white border-1 text-white px-2 pt-3 pb-2 text-lg uppercase font-medium rounded-full min-h-12 aspect-square"
                                )}
                                aria-label="Log In Button"
                            >
                                <Bars3Icon className="text-3xl mb-1 text-white group-hover:animate-pulse" />
                            </Button>
                        </div>
                    </motion.div>

                    {/* Expanded Search */}
                    {isSearchOpen && (
                        <motion.div
                            className={cn(
                                "absolute top-full left-0 right-0 z-50 transition-colors duration-300 ease-out",
                                isHeaderBgVisible ? "bg-pr-900" : "bg-transparent"
                            )}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 0.3,
                                ease: [0.5, 0, 0.1, 1]
                            }}
                        >
                            <ExpandedSearch />
                        </motion.div>
                    )}
                </div>
            </motion.header>
        </>
    )
}
