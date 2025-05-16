"use client";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown";
import { cn } from "@/utils/classes/merge";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tooltipMotion } from "@/utils/animation";
import { Button } from "@/components/ui/button";
import { useRegionStore } from "@/stores/useRegionStore";
import { REGIONS, RegionCode } from "@/consts/regionConfig";
import Flag from "react-world-flags";

export default function DropdownRegion() {
    const { region, setRegion } = useRegionStore();
    const regionConfig = REGIONS[region];
    const [isOpen, setIsOpen] = useState(false);
    const [showChevronUp, setShowChevronUp] = useState(false);

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
                <Button
                    variant={"ghostDark"}
                    size={"none"}
                    className="justify-between px-5"
                >
                    <span className="flex items-center gap-0">
                        <Flag code={regionConfig.flag} style={{ width: 20, height: 15 }} />

                    </span>
                    {/* <ChevronDownIcon
                        className={cn(
                            "size-4 transition-transform duration-300",
                            showChevronUp && "rotate-180"
                        )}
                    /> */}
                </Button>
            </DropdownMenuTrigger>

            <AnimatePresence>
                {isOpen && (
                    <DropdownMenuContent
                        align="end"
                        sideOffset={4}
                        className={cn("rounded-md bg-white shadow-md p-0 min-w-[200px] border-none")}
                        asChild
                    >
                        <motion.div {...tooltipMotion}>
                            {Object.entries(REGIONS).map(([code, data]) => (
                                <DropdownMenuItem
                                    key={code}
                                    onClick={() => setRegion(code as RegionCode)}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-3 text-lg cursor-pointer",
                                        region === code && "bg-pr-300 text-pr-700 font-bold"
                                    )}
                                >
                                    <Flag code={data.flag} style={{ width: 20, height: 15 }} />
                                    {data.label}
                                </DropdownMenuItem>
                            ))}
                        </motion.div>
                    </DropdownMenuContent>
                )}
            </AnimatePresence>
        </DropdownMenu>
    );
}
