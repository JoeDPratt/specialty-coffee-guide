'use client'
import { useRef, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { useStickyStore } from '@/stores/useStickyStore'
import { SearchState, useSearchStore } from '@/stores/useSearchStore';
import ExpandedSearch from '@/components/shared/search/ExpandedSearch'
import { cn } from '@/utils/classes/merge'
import { HeaderLogo } from './HeaderLogo'
import { HeaderSearchButton } from '@/components/shared/header/HeaderSearchButton'
import { Button } from '@/components/ui/button';
import { Bars3Icon } from '@heroicons/react/16/solid';
import { usePathname } from 'next/navigation'
import { useBreadcrumbStore } from '@/stores/useBreadcrumbStore'
import { Breadcrumbs } from '../navigation/Breadcrumbs';
import DropdownRegion from '@/components/shared/header/DropdownRegion';

export default function Header() {

    const isSearchOpen = useSearchStore((s: SearchState) => s.isSearchOpen);
    const setIsScrolled = useStickyStore((state) => state.setIsScrolled);
    const isScrolled = useStickyStore((state) => state.isScrolled);
    const sentinelRef = useRef<HTMLDivElement>(null)
    const isHeaderBgVisible = isSearchOpen || isScrolled;

    const pathname = usePathname()
    const breadcrumbs = useBreadcrumbStore((s) => s.breadcrumbs)
    const isProductPage = pathname.startsWith('/coffee-beans/') // Adjust to match your product route
    const showBreadcrumbs = isProductPage && isScrolled && !isSearchOpen && breadcrumbs.length > 0

    useLayoutEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsScrolled(!entry.isIntersecting)
            },
            { threshold: 1, rootMargin: '0px 0px 0px 0px' }
        )

        if (sentinelRef.current) observer.observe(sentinelRef.current)
        return () => observer.disconnect()
    }, [setIsScrolled])

    return (
        <>
            <div ref={sentinelRef} className="absolute top-1 md:top-12 h-1 w-full pointer-events-none" />

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
                <div className={cn("relative", isHeaderBgVisible ? "bg-pr-900 animate-fade-in" : "bg-transparent")}>
                    <motion.div
                        className={cn(
                            "grid items-center gap-4 sm:gap-4 md:gap-6 px-3 md:px-6 transition-all duration-300",
                            isScrolled ? "grid-cols-[auto_1fr_auto]" : "grid-cols-[auto_1fr_auto]",
                            "lg:grid-cols-[auto_minmax(500px,1fr)_1fr]",
                        )}
                        animate={isHeaderBgVisible ? { paddingTop: 8, paddingBottom: 8 } : { paddingTop: 16, paddingBottom: 16 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Logo */}
                        <motion.div
                            className={cn(
                                "w-full flex items-center",
                                isSearchOpen ? "hidden md:flex" : "justify-start"
                            )}
                        >
                            <HeaderLogo
                                isCompact={isScrolled}
                                isSearchOpen={isSearchOpen}
                            />
                        </motion.div>

                        {/* Search Button / Looks like an input */}
                        <div className="w-full flex sm:justify-start justify-end">
                            {!isSearchOpen && <HeaderSearchButton isScrolled={isScrolled} />}
                        </div>

                        {/* Right Menu Buttons */}
                        <div
                            className={cn(
                                "hidden md:flex justify-end gap-3"
                            )}>

                            {/* Login */}
                            <Button variant={"secondary"} styleType={"outline"}>Log in</Button>
                            <DropdownRegion />
                        </div>
                        <div className={cn(
                            "md:hidden justify-end flex"
                        )}
                        >
                            {/* Hamburger */}
                            {!isSearchOpen && <Button variant={"ghostDark"} size={"icon"}><Bars3Icon /></Button>}
                        </div>
                    </motion.div>

                    {showBreadcrumbs && (
                        <Breadcrumbs className="animate-fade-in" />
                    )}
                </div>
            </motion.header>
            {/* Expanded Search */}
            {isSearchOpen && (
                <motion.div
                    className={cn(
                        "fixed inset-x-0 top-0 md:top-16 z-30 transition-colors duration-300 ease-out",
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


