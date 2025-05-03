"use client";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown";
import { cn } from "@/utils/classes/merge";
import { useSearchStore } from "@/stores/useSearchStore";
import { SortOption } from "@/stores/useSearchStore";
import { ArrowsUpDownIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tooltipMotion } from "@/utils/animation";
import { useBreakpointStore } from "@/stores/useBreakpointStore";
import { Button } from "../ui/button";
import { usePaginationStore } from "@/stores/usePaginationStore";

interface DropdownSortProps {
    className?: string;
}

const sortOptions: { label: string; value: SortOption }[] = [
    { label: "Price: Lowest First", value: "price_low" },
    { label: "Price: Highest First", value: "price_high" },
    { label: "Highest SCA Cup Score", value: "cup_score_high" },
];

export function DropdownSort({ className }: DropdownSortProps) {
    const sortedBy = useSearchStore((s) => s.sortedBy);
    const setSortedBy = useSearchStore((s) => s.setSortedBy);
    const resetPagination = usePaginationStore((s) => s.resetPagination)
    const [isOpen, setIsOpen] = useState(false);
    const [showChevronUp, setShowChevronUp] = useState(false);
    const isMd = useBreakpointStore((s) => s.isMd);
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
                {isMd ?
                    <Button
                        styleType={"outline"}
                        size={"icon"}>
                        <ArrowsUpDownIcon />
                    </Button> :
                    <button
                        className={cn(
                            "flex items-center justify-between gap-2 px-4 pb-1.75 pt-2.25 rounded-full bg-white text-pr-700 hover:bg-pr-100 text-base font-semibold transition-colors cursor-pointer min-w-[250px] outline-none",
                            className
                        )}
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
                    </button>
                }
            </DropdownMenuTrigger>

            <AnimatePresence>
                {isOpen && (
                    <DropdownMenuContent
                        align="end"
                        sideOffset={10}
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
                                        "flex items-center px-3 pb-3.25 pt-3.75 rounded-none text-pr-700 hover:bg-pr-100 hover:text-pr-700 cursor-pointer text-lg md:text-base",
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
