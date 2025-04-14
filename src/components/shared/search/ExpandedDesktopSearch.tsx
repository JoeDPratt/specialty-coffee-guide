'use client'
import { useSearchStore } from '@/stores/useSearchStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SearchButton from '@/components/shared/buttons/SearchButton';
import { motion } from 'framer-motion'
import { FilterRow } from '@/components/search/FilterRow';
import { fadeUpItem } from '@/utils/animation';


export default function ExpandedDesktopSearch() {
    const router = useRouter();
    const toggleSearch = useSearchStore((s) => s.toggleSearch);
    const query = useSearchStore((s) => s.query);
    const setQuery = useSearchStore((s) => s.setQuery);
    const closeSearch = useSearchStore((s) => s.closeSearch);

    const [localQuery, setLocalQuery] = useState(query);

    const handleSearch = () => {
        setQuery(localQuery);
        // optional: set filters here
        closeSearch();
        router.push(`/search?q=${encodeURIComponent(localQuery)}`);
    };

    return (
        <div className="flex flex-col flex-1 gap-4 items-center -mt-10 pb-10">
            <h2 className="text-xl text-white text-center font-sofia-sans font-semibold">Find coffees by name, flavour, varieties or processes:</h2>
            <motion.div
                className="flex w-full max-w-[840px] items-center bg-white border-2 border-white rounded-full shadow-md"
                layoutId="searchField"
            >
                <input

                    type="text"
                    role="search"
                    className=" font-sofia-sans text-lg text-left px-5 pb-2 pt-3 flex-1 outline-0 cursor-pointer"
                    value={localQuery}
                    onChange={(e) => setLocalQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder='Try "Cherry" or "Bourbon"'
                />
                <SearchButton className="aspect-square rounded-full" onClick={toggleSearch} />
            </motion.div>
            <motion.div className="flex gap-2 text-white text-center"
                variants={fadeUpItem}
                initial="hidden"
                animate="visible">
                <FilterRow />
            </motion.div>
        </div>
    );
}
