'use client'
import { motion } from 'framer-motion'
import { FilterRow } from '@/components/search/FilterRow';
import { fadeUpItem } from '@/utils/animation';
import IconButton from '@/components/shared/buttons/IconButton';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/16/solid'
import { useSearchLogic } from '@/hooks/useSearchLogic';
import { Button } from '@/components/ui/button';


export default function ExpandedDesktopSearch() {
    const {
        inputRef,
        localQuery,
        setLocalQuery,
        handleSearch,
        toggleSearch,
    } = useSearchLogic();

    return (
        <>
            <div className="flex flex-col flex-1 gap-2 items-center pb-10 px-6 z-30">
                <div className={"flex items-start justify-between w-full max-w-[840px] mb-2"}>
                    <h2 className="text-xl text-white text-center font-sofia-sans font-semibold leading-none m-0 pt-14 self-end">Find coffees by name, flavour, varieties or processes:</h2>
                    <Button
                        variant={"ghostDark"}
                        size={"iconLg"}
                        className="self-end [&_svg]:size-8 mb-4"
                        onClick={toggleSearch}
                    >
                        <XMarkIcon />
                    </Button>
                </div>
                <motion.div
                    className="flex w-full max-w-[840px] items-center bg-white border-2 border-white rounded-full shadow-md"
                    layoutId="searchField"
                >
                    <input
                        ref={inputRef}
                        role="search"
                        type="search"
                        enterKeyHint="search"
                        className=" font-sofia-sans text-lg text-left px-5 pb-2.25 pt-2.75 flex-1 outline-0 cursor-text placeholder:text-pr-900/60"
                        value={localQuery}
                        onChange={(e) => setLocalQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder='Try "Cherry" or "Bourbon"'
                    />
                    <Button
                        variant={"accent"}
                        onClick={handleSearch}
                        aria-label="Search Button"
                        iconPosition={"left"}
                        className="h-12"
                    >
                        <MagnifyingGlassIcon />Search
                    </Button>
                </motion.div>
                <motion.div className="flex gap-2 text-white text-center mt-3"
                    variants={fadeUpItem}
                    initial="hidden"
                    animate="visible">
                    <FilterRow />
                </motion.div>
            </div>
            {/* Transparent Background Overlay */}
            <div
                className="fixed left-0 right-0 bottom-0 top-[80px] bg-pr-900/40 -z-20" // Adjust z-index if needed
                onClick={toggleSearch}
                aria-hidden="true"
            />
        </>
    );
}
