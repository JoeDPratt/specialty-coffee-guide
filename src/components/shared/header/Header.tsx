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
            {/* Sentinel to check if page is at top */}
            <div ref={sentinelRef} className="absolute top-4 h-1 w-full pointer-events-none" />

            <motion.header
                className={`flex justify-between gap-6 px-6 top-0 sticky z-100 transition-colors duration-600 ${!isSearchOpen && !isScrolled ? 'bg-transparent py-6 items-center' : 'bg-pr-900 py-3 mb-4 items-start'}`}
                layout="preserve-aspect"
                transition={{ duration: 0.4 }}
                role="banner"
                aria-label="SCG site header"
            >

                <motion.div
                    className={`flex-shrink-0 ${!isSearchOpen ? "w-1/3" : "w-max"}`}
                    layout="preserve-aspect">
                    <a href="/">
                        {!isSearchOpen && !isScrolled ? (
                            <SCGLogoBig className="h-24 w-auto" />
                        ) : (
                            <SCGLogoSmall className="h-12 w-auto" />
                        )}
                    </a>
                </motion.div>

                {!isSearchOpen ? (
                    <motion.div
                        className="flex flex-1 items-center bg-white border-2 border-white rounded-full shadow-md"
                        layout="preserve-aspect"
                        layoutId="searchField">
                        <button
                            role="search"
                            className=" font-sofia-sans text-lg text-left px-5 pb-2 pt-3 flex-1 outline-0 cursor-pointer"
                            onClick={toggleSearch}

                        >
                            Find your favourite beans
                        </button>
                        <SearchButton className="aspect-square rounded-full" onClick={toggleSearch} />
                    </motion.div>
                ) : (
                    <ExpandedSearch />
                )}

                <div className={`flex justify-end ${!isSearchOpen ? "w-1/3" : "w-max"}`}>
                    <motion.div className="text-center border-white border-2 text-white px-5 pt-3 pb-2 text-lg uppercase font-medium rounded-full" layout="preserve-aspect">
                        Log in
                    </motion.div>
                </div>
            </motion.header>
        </>
    )
}


