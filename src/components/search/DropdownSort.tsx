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
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tooltipMotion } from "@/utils/animation";

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

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn(
                        "flex items-center justify-between gap-1 px-5 pb-1.75 pt-2.25 rounded-full bg-white text-pr-700 hover:bg-pr-100 text-base font-semibold transition-colors cursor-pointer min-w-[220px] outline-none",
                        className
                    )}
                >
                    {activeLabel}
                    <ChevronDownIcon
                        className={cn(
                            "h-4 w-4 transition-transform duration-300",
                            showChevronUp && "rotate-180"
                        )}
                    />
                </button>
            </DropdownMenuTrigger>

            <AnimatePresence>
                {isOpen && (
                    <DropdownMenuContent
                        align="end"
                        sideOffset={8}
                        className="rounded-md bg-white shadow-md p-0 min-w-[220px] border-none"
                        asChild
                    >
                        <motion.div {...tooltipMotion}>
                            {sortOptions.map((option) => (
                                <DropdownMenuItem
                                    key={option.value}
                                    onClick={() => setSortedBy(option.value)}
                                    className={cn(
                                        "flex items-center px-3 pb-2.25 pt-2.75 rounded-none text-pr-700 hover:bg-pr-100 hover:text-pr-700 cursor-pointer text-base",
                                        sortedBy === option.value && "bg-pr-300 text-pr-700 font-bold"
                                    )}
                                >
                                    {option.label}
                                </DropdownMenuItem>
                            ))}
                        </motion.div>
                    </DropdownMenuContent>
                )}
            </AnimatePresence>
        </DropdownMenu>
    );
}
