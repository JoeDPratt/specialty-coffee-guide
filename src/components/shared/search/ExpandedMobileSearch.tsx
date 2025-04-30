'use client'
import { motion } from 'framer-motion'
import { FilterRow } from '@/components/search/FilterRow';
import { fadeUpItem } from '@/utils/animation';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { useSearchLogic } from '@/hooks/useSearchLogic';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


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

            <h2 className="text-left text-xl pl-2 text-white font-sofia-sans font-semibold">Find coffees by name, flavour, varieties or processes:</h2>
            <div className="flex items-center w-full gap-2">
                <Input
                    type="search"
                    enterKeyHint="search"
                    role="search"
                    value={localQuery}
                    onChange={(e) => setLocalQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder='Try "Cherry" or "Bourbon"'
                    inputSize={"lg"}
                />
                <Button
                    variant={"ghostDark"}
                    size={"iconLg"}
                    className="[&_svg]:size-8 -mr-1"
                    onClick={toggleSearch}
                >
                    <XMarkIcon />
                </Button>
            </div>
            <motion.div
                className="flex gap-2 text-white text-center mt-4"
                variants={fadeUpItem}
                initial="hidden"
                animate="visible">
                <FilterRow />
            </motion.div>
            <motion.div
                className={"fixed left-0 right-0 bottom-0 border-t-1 border-white/50 flex items-center justify-end p-4"}
                variants={fadeUpItem}
                initial="hidden"
                animate="visible">
                <Button
                    variant={"accent"}
                    size={"lg"}
                    iconPosition={"left"}
                    onClick={handleSearch}
                    aria-label="Search Button"
                    className="w-50">
                    <MagnifyingGlassIcon />Search
                </Button>
            </motion.div>
        </div>
    );
}
