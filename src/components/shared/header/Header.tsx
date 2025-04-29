'use client'
import { useRef, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { useStickyStore } from '@/stores/useStickyStore'
import { useSearchStore } from '@/stores/useSearchStore';
import ExpandedSearch from '../search/ExpandedSearch'
import Link from 'next/link'
import { cn } from '@/utils/classes/merge'
import { HeaderLogo } from './HeaderLogo'
import { HeaderSearchButton } from './HeaderSearchButton'
import { Button } from '@/components/ui/button';
import { Bars3Icon } from '@heroicons/react/16/solid';

export default function Header() {
    const isSearchOpen = useSearchStore((s) => s.isSearchOpen);
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
                className="sticky top-0 z-20"
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
                <div className={cn("relative", isHeaderBgVisible ? "bg-pr-900" : "bg-transparent")}>
                    <motion.div
                        className={cn(
                            "flex justify-start md:justify-between items-center gap-3 sm:gap-4 md:gap-6 px-3 md:px-6 transition-colors duration-300",
                        )}
                        animate={isHeaderBgVisible ? { paddingTop: 12, paddingBottom: 12 } : { paddingTop: 24, paddingBottom: 24 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Logo */}
                        <motion.div
                            className={cn(
                                isSearchOpen ? "w-max hidden md:block" :
                                    isScrolled ? "max-w-min" : "flex-auto md:flex-initial w-1/3"
                            )}
                        >
                            <HeaderLogo
                                isCompact={isScrolled}
                                isSearchOpen={isSearchOpen}
                            />
                        </motion.div>

                        {/* Search Button / Looks like an input */}
                        {!isSearchOpen && <HeaderSearchButton isScrolled={isScrolled} />}

                        {/* Right Menu Buttons */}
                        <div
                            className={cn(
                                "md:flex justify-end hidden",
                                isSearchOpen ? "w-max" :
                                    isScrolled ? "sm:max-w-min" : "w-1/3",
                            )}>
                            {/* Login */}
                            <Button variant={"secondary"} styleType={"outline"} size={"lg"}>Log in</Button>
                        </div>
                        <div className={cn(
                            "md:hidden justify-end flex",
                            isScrolled ? "max-w-min" : "md:w-1/3",
                        )}
                        >
                            {/* Hamburger */}
                            <Button variant={"secondary"} styleType={"outline"} size={"iconLg"}><Bars3Icon /></Button>
                        </div>
                    </motion.div>

                </div>
            </motion.header>
            {/* Expanded Search */}
            {isSearchOpen && (
                <motion.div
                    className={cn(
                        "fixed inset-x-0 top-0 md:top-20 z-30 transition-colors duration-300 ease-out",
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
        </>
    )
}
