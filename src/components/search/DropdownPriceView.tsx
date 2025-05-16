"use client";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown";
import { cn } from "@/utils/classes/merge";
import { SearchState, useSearchStore } from "@/stores/useSearchStore";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { ScaleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tooltipMotion } from "@/utils/animation";
import { Button } from "@/components/ui/button";
import { useBreakpointStore } from "@/stores/useBreakpointStore";
import { useRegionStore } from "@/stores/useRegionStore";
import { REGIONS } from "@/consts/regionConfig";
import useDisplayWeight from "@/hooks/useDisplayWeight";


export function DropdownPriceView({ className }: { className?: string }) {

    const region = useRegionStore((s) => s.region);
    const { smallBagSize, largeBagSize } = REGIONS[region];
    const {
        selectedWeight,
        setSelectedWeight
    } = useSearchStore((s: SearchState) =>
    ({
        selectedWeight: s.selectedWeight,
        setSelectedWeight: s.setSelectedWeight
    }));

    const sortOptions: { label: string; value: number }[] = [
        { label: `${useDisplayWeight(smallBagSize)}`, value: smallBagSize },
        { label: `${useDisplayWeight(largeBagSize)}`, value: largeBagSize },
    ];

    const isSm = useBreakpointStore((s) => s.isSm);
    const [isOpen, setIsOpen] = useState(false);
    const [showChevronUp, setShowChevronUp] = useState(false);
    const activeLabel = sortOptions.find((opt) => opt.value === selectedWeight)?.label ?? "Pack size";

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isOpen) {
            timeout = setTimeout(() => setShowChevronUp(true), 50);
        } else {
            timeout = setTimeout(() => setShowChevronUp(false), 50);
        }
        return () => clearTimeout(timeout);
    }, [isOpen]);

    function handleSort(value: number) {
        setSelectedWeight(value)
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <div>
                    <Button
                        className="md:hidden flex px-3 lg:pl-2 lg:pr-3 gap-2.5"
                        styleType={"outline"}>
                        <ScaleIcon />
                        <span className="">{activeLabel}</span>
                    </Button>
                    <Button
                        styleType={"outline"}
                        className="hidden md:inline-flex min-w-[130px] justify-between px-3"
                    >
                        <span className="flex items-center gap-2" >
                            <ScaleIcon className="size-5" />
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
                            "rounded-md bg-white shadow-md p-0 xs:min-w-[130px] border-none",
                            "max-xs:w-screen")}
                        asChild
                    >
                        <motion.div {...tooltipMotion}>
                            {sortOptions.map((option) => (
                                <DropdownMenuItem
                                    key={option.value}
                                    onClick={() => handleSort(option.value)}
                                    className={cn(
                                        "flex items-center pl-3 pr-8 pb-4.25 pt-4.75 rounded-none text-pr-700 hover:bg-pr-100 hover:text-pr-700 cursor-pointer text-xl md:text-lg",
                                        "hover:animate-pulse active:scale-98 transition-all",
                                        selectedWeight === option.value && "bg-pr-300 text-pr-700 font-bold",

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
