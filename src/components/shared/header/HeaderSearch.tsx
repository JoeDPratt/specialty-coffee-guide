import { Button } from "@/components/ui/button";
import { cn } from "@/utils/classes/merge";
import { Bars3Icon } from "@heroicons/react/16/solid";
import { motion } from "framer-motion";
import Link from "next/link";
import SCGLogoSmall from "@public/logos/scg-logo-mark.svg"
import SearchInput from "@/components/search/SearchInput";

export function SearchHeader() {

    return (
        <header
            className=""
            role="banner"
            aria-label="SCG site header"

        >
            <div className={cn("relative bg-pr-900")}>
                <motion.div
                    className={cn(
                        "flex justify-between items-center gap-3 sm:gap-4 md:gap-6 px-3 sm:px-4 md:px-6 py-2 transition-colors duration-300",
                    )}
                >
                    {/* Logo */}
                    <div className={cn("flex items-center gap-4 w-full md:w-2/5")}>
                        <Link href="/">
                            <SCGLogoSmall className="h-12 w-auto" />
                        </Link>
                        <SearchInput />
                    </div>


                    {/* Right Menu Buttons */}
                    <div
                        className={cn(
                            "md:flex justify-end hidden",
                            "sm:max-w-min"
                        )}>
                        {/* Login */}
                        <Button variant={"secondary"} styleType={"outline"} >Log in</Button>
                    </div>
                    <div className={cn(
                        "md:hidden justify-end flex",
                        "max-w-min"
                    )}
                    >
                        {/* Hamburger */}
                        <Button variant={"ghostDark"} size={"icon"}><Bars3Icon /></Button>
                    </div>
                </motion.div>

            </div>
        </header>
    )
}