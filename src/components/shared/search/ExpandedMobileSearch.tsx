'use client'
import { motion } from 'framer-motion'
import { FilterRow } from '@/components/search/FilterRow';
import { fadeUpItem } from '@/utils/animation';
import IconButton from '../buttons/IconButton';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { useSearchLogic } from '@/hooks/useSearchLogic';


export default function ExpandedMobileSearch() {
    const {
        inputRef,
        localQuery,
        setLocalQuery,
        handleSearch,
        toggleSearch,
    } = useSearchLogic();

    return (
        <div className="flex flex-col flex-1 gap-2 items-start pt-4 h-screen px-4">
            <IconButton
                icon={<XMarkIcon className="w-8 h-8 mb-0.75 text-white group-hover:animate-pulse" />}
                onClick={toggleSearch}
                className={"flex bg-transparent hover:bg-white/20 self-end"}
            />
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
            </motion.div>
            <motion.div
                className="flex gap-2 text-white text-center mt-4"
                variants={fadeUpItem}
                initial="hidden"
                animate="visible">
                <FilterRow />
            </motion.div>
            <motion.div
                className={"fixed left-0 right-0 bottom-0 border-t-1 border-white/50 flex items-center justify-center p-4"}
                variants={fadeUpItem}
                initial="hidden"
                animate="visible">
                <IconButton
                    label={"SEARCH"}
                    className={"flex-1 justify-center text-xl"}
                    icon={<MagnifyingGlassIcon className="w-7 h-7 mb-0.75 text-white group-hover:animate-pulse" />}
                    onClick={toggleSearch}
                    ariaLabel="Search Button"
                ></IconButton>
            </motion.div>
        </div>
    );
}
