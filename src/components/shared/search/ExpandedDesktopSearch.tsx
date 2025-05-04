'use client'
import { motion } from 'framer-motion'
import { FilterRow } from '@/components/search/FilterRow';
import { fadeUpItem } from '@/utils/animation';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/16/solid'
import { useSearchLogic } from '@/hooks/useSearchLogic';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


export default function ExpandedDesktopSearch() {
    const {
        inputRef,
        query,
        setQuery,
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
                    <Input
                        ref={inputRef}
                        type="search"
                        enterKeyHint="search"
                        role="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder='Try "Cherry" or "Bourbon"'
                        inputSize={"lg"}
                        className="bg-transparent"
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
                    <FilterRow
                        excludedFilters={["is_fairtrade"]}
                        styleType={"header"}
                    />
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
