'use client'
import { useSearchStore } from '@/stores/useSearchStore';
import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import SearchButton from '@/components/shared/buttons/SearchButton';
import { motion } from 'framer-motion'
import { FilterRow } from '@/components/search/FilterRow';
import { fadeUpItem } from '@/utils/animation';


export default function ExpandedMobileSearch() {
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
        <div className="flex flex-col flex-1 gap-2 items-start pt-4 h-screen px-4">
            <h2 className="text-left text-2xl pl-2 text-white font-sofia-sans font-semibold">Find coffees by name, flavour, varieties or processes:</h2>
            <motion.div
                className="flex w-full items-center bg-white border-2 border-white rounded-full shadow-md"
                layoutId="searchField"
            >
                <input
                    ref={inputRef}
                    type="text"
                    role="search"
                    className=" font-sofia-sans text-lg text-left px-5 pb-2 pt-3 flex-1 outline-0 cursor-text placeholder:text-pr-900/60"
                    value={localQuery}
                    onChange={(e) => setLocalQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder='Try "Cherry" or "Bourbon"'
                />
                <SearchButton className="aspect-square rounded-full" onClick={toggleSearch} />
            </motion.div>
            <motion.div
                className="flex gap-2 text-white text-center mt-4"
                variants={fadeUpItem}
                initial="hidden"
                animate="visible">
                <FilterRow />
            </motion.div>
        </div>
    );
}
