"use client";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown";
import { cn } from "@/utils/classes/merge";
import { SearchState, useSearchStore } from "@/stores/useSearchStore";
import { SortOption } from "@/stores/useSearchStore";
import { ArrowsUpDownIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tooltipMotion } from "@/utils/animation";
import { Button } from "@/components/ui/button";
import { usePaginationStore } from "@/stores/usePaginationStore";
import { useBreakpointStore } from "@/stores/useBreakpointStore";

interface DropdownSortProps {
    className?: string;
}

const sortOptions: { label: string; value: SortOption }[] = [
    { label: "Price: Lowest First", value: "price_low" },
    { label: "Price: Highest First", value: "price_high" },
    { label: "Highest SCA Cup Score", value: "cup_score_high" },
];

export function DropdownSort({ className }: DropdownSortProps) {
    const { sortedBy, setSortedBy } = useSearchStore((s: SearchState) => ({ sortedBy: s.sortedBy, setSortedBy: s.setSortedBy }));
    const resetPagination = usePaginationStore((s) => s.resetPagination)
    const isSm = useBreakpointStore((s) => s.isSm);

    const [isOpen, setIsOpen] = useState(false);
    const [showChevronUp, setShowChevronUp] = useState(false);
    const activeLabel = sortOptions.find((opt) => opt.value === sortedBy)?.label ?? "Sort";

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isOpen) {
            timeout = setTimeout(() => setShowChevronUp(true), 50);
        } else {
            timeout = setTimeout(() => setShowChevronUp(false), 50);
        }
        return () => clearTimeout(timeout);
    }, [isOpen]);

    function handleSort(value: SortOption) {
        setSortedBy(value)
        resetPagination();
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <div>
                    <Button
                        className="md:hidden flex sm:pl-3 sm:pr-4"
                        styleType={"outline"}
                        size={isSm ? "icon" : "default"}>
                        <ArrowsUpDownIcon />
                        <span className="hidden sm:inline">Sort</span>
                    </Button>
                    <Button
                        styleType={"outline"}
                        className="hidden md:inline-flex min-w-[250px] justify-between"
                    >
                        <span className="flex items-center gap-2" >
                            <ArrowsUpDownIcon className="size-5" />
                            {activeLabel}
                        </span>
                        <ChevronDownIcon
                            className={cn(
                                "size-4 transition-transform duration-300",
                                showChevronUp && "rotate-180"
                            )}
                        />
                    </Button>
                </div>
            </DropdownMenuTrigger>

            <AnimatePresence>
                {isOpen && (
                    <DropdownMenuContent
                        align="end"
                        sideOffset={4}
                        className={cn(
                            "rounded-md bg-white shadow-md p-0 xs:min-w-[250px] border-none",
                            "max-xs:w-screen")}
                        asChild
                    >
                        <motion.div {...tooltipMotion}>
                            {sortOptions.map((option) => (
                                <DropdownMenuItem
                                    key={option.value}
                                    onClick={() => handleSort(option.value)}
                                    className={cn(
                                        "flex items-center px-3 pb-4.25 pt-4.75 rounded-none text-pr-700 hover:bg-pr-100 hover:text-pr-700 cursor-pointer text-xl md:text-lg",
                                        "hover:animate-pulse active:scale-98 transition-all",
                                        sortedBy === option.value && "bg-pr-300 text-pr-700 font-bold",

                                    )}
                                >
                                    {option.label}
                                </DropdownMenuItem>
                            ))}
                        </motion.div>
                    </DropdownMenuContent>
                )}
            </AnimatePresence>
        </DropdownMenu >
    );
}
