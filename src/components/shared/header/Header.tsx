'use client'
import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SCGLogoBig from "@public/logos/scg-logo-stacked.svg"
import SCGLogoSmall from "@public/logos/scg-logo-mark.svg"
import SearchButton from '../buttons/SearchButton'
import { useStickyStore } from '@/stores/useStickyStore'
import { useSearchStore } from '@/stores/useSearchStore';
import ExpandedSearch from '../search/ExpandedSearch'

export default function Header() {
    const isSearchOpen = useSearchStore((s) => s.isSearchOpen);
    const toggleSearch = useSearchStore((s) => s.toggleSearch);
    const setIsScrolled = useStickyStore((state) => state.setIsScrolled);
    const isScrolled = useStickyStore((state) => state.isScrolled);
    const sentinelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Create an observer that checks if the sentinel is fully visible.
        const observer = new IntersectionObserver(
            ([entry]) => {
                // entry.isIntersecting will be true if the sentinel is in view.
                setIsScrolled(!entry.isIntersecting)
                console.log("Scrolling:", !entry.isIntersecting)
            },
            {
                threshold: 1,
                // rootMargin: "14px 0px 0px 0px"
            }
        )

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current)
        }

        return () => {
            observer.disconnect()
        }
    }, [setIsScrolled])

    return (
        <>
            {/* Sentinel element to detect scroll */}
            <div ref={sentinelRef} className="absolute top-8 h-1 w-full pointer-events-none" />

            <motion.header
                className={`sticky top-0 z-50`}
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
            // layoutId="searchField"
            >
                {/* Use an inner relative container for positioning */}
                <div className="relative">
                    {/* Fixed header row – maintain consistent height */}
                    <motion.div
                        className={`flex justify-between items-center gap-6 px-6 transition-colors duration-300 ${isSearchOpen || isScrolled ? 'bg-pr-900' : 'bg-transparent'}`}
                        animate={isScrolled || isSearchOpen ? { paddingTop: 12, paddingBottom: 12 } : { paddingTop: 24, paddingBottom: 24 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Logo Section */}
                        <motion.div className={`flex-shrink-0 ${!isSearchOpen ? 'w-1/3' : 'w-max'}`}>
                            <a href="/">
                                {(!isSearchOpen && !isScrolled) ? (
                                    <SCGLogoBig className="h-24 w-auto" />
                                ) : (
                                    <SCGLogoSmall className="h-14 w-auto" />
                                )}
                            </a>
                        </motion.div>

                        {/* Search Button / Field Section */}
                        {!isSearchOpen ? (
                            <motion.div
                                className="flex flex-1 items-center bg-white border-2 border-white rounded-full shadow-md"
                                layoutId="searchField"
                            >
                                <button
                                    role="search"
                                    className="font-sofia-sans text-lg text-left px-5 pb-2 pt-3 flex-1 outline-0 cursor-pointer"
                                    onClick={toggleSearch}
                                >
                                    Find your favourite beans
                                </button>
                                <SearchButton className="aspect-square rounded-full" onClick={toggleSearch} />
                            </motion.div>
                        ) : null}

                        {/* Login Section */}
                        <div className={`flex justify-end ${!isSearchOpen ? 'w-1/3' : 'w-max'}`}>
                            <motion.div className="text-center border-white border-1 text-white px-5 pt-3 pb-2 text-lg uppercase font-medium rounded-full">
                                Log in
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Expanded Search – absolutely positioned below the header row */}
                    {isSearchOpen && (
                        <motion.div
                            className={`absolute top-full left-0 right-0 z-50 transition-colors duration-300 ease-out ${isSearchOpen || isScrolled ? 'bg-pr-900' : 'bg-transparent'}`}
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
            </motion.header >
        </>
    )
}