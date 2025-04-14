'use client'
import { useSearchStore } from '@/stores/useSearchStore';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import SearchButton from '@/components/shared/buttons/SearchButton';
import { motion } from 'framer-motion'
import { FilterRow } from '@/components/search/FilterRow';
import { fadeUpItem } from '@/utils/animation';
import IconButton from '@/components/shared/buttons/IconButton';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/16/solid'


export default function ExpandedDesktopSearch() {
    const router = useRouter();
    const toggleSearch = useSearchStore((s) => s.toggleSearch);
    const query = useSearchStore((s) => s.query);
    const setQuery = useSearchStore((s) => s.setQuery);
    const closeSearch = useSearchStore((s) => s.closeSearch);
    const [localQuery, setLocalQuery] = useState(query);

    const inputRef = useRef<HTMLInputElement>(null)

    // 👇 Auto-focus when the expanded search mounts
    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    const handleSearch = () => {
        setQuery(localQuery);
        // optional: set filters here
        closeSearch();
        router.push(`/search?q=${encodeURIComponent(localQuery)}`);
    };

    return (
        <>
            <div className="flex flex-col flex-1 gap-2 items-center pb-10 px-6 z-30">
                <div className={"flex items-start justify-between w-full max-w-[840px] mb-2"}>
                    <h2 className="text-xl text-white text-center font-sofia-sans font-semibold leading-none m-0 pt-14">Find coffees by name, flavour, varieties or processes:</h2>
                    <IconButton
                        icon={<XMarkIcon className="w-8 h-8 mb-0.75 text-white group-hover:animate-pulse" />}
                        onClick={toggleSearch}
                        className={"flex bg-transparent hover:bg-white/20 items-start"}
                    />
                </div>
                <motion.div
                    className="flex w-full max-w-[840px] items-center bg-white border-2 border-white rounded-full shadow-md"
                    layoutId="searchField"
                >
                    <input
                        ref={inputRef}
                        type="text"
                        role="search"
                        className=" font-sofia-sans text-lg text-left px-5 pb-2 pt-3 flex-1 outline-0 cursor-pointer placeholder:text-pr-900/60"
                        value={localQuery}
                        onChange={(e) => setLocalQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder='Try "Cherry" or "Bourbon"'
                    />
                    <IconButton
                        label={"SEARCH"}
                        icon={<MagnifyingGlassIcon className="w-6 h-6 mb-0.75 text-white group-hover:animate-pulse" />}
                        onClick={toggleSearch}
                        ariaLabel="Search Button"
                    ></IconButton>
                </motion.div>
                <motion.div className="flex gap-2 text-white text-center mt-4"
                    variants={fadeUpItem}
                    initial="hidden"
                    animate="visible">
                    <FilterRow />
                </motion.div>
            </div>
            <div
                className="fixed left-0 right-0 bottom-0 top-[80px] bg-pr-900/40 -z-20" // Adjust z-index if needed
                onClick={toggleSearch}
                aria-hidden="true"
            />
        </>
    );
}
