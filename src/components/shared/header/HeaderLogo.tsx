import Link from "next/link"
import SCGLogoBig from "@/components/icons/scg-logo-stacked.svg";
import SCGLogoSmall from "@/components/icons/scg-logo-mark.svg"
import { cn } from "@/utils/classes/merge"

type HeaderLogoProps = {
    isCompact: boolean
    isSearchOpen: boolean
    className?: string
}

export function HeaderLogo({ isCompact, isSearchOpen, className }: HeaderLogoProps) {
    const showSmallLogo = isSearchOpen || isCompact

    return (
        <div className={cn("", className)}>
            <Link href="/">
                {showSmallLogo ? (
                    <SCGLogoSmall className="h-11 md:h-12 w-auto" />
                ) : (
                    <SCGLogoBig className="h-20 w-auto" />
                )}
            </Link>
        </div>
    )
}
