import Link from "next/link"
import SCGLogoBig from "@public/logos/scg-logo-stacked.svg"
import SCGLogoSmall from "@public/logos/scg-logo-mark.svg"
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
                    <SCGLogoSmall className="h-12 md:h-14 w-auto" />
                ) : (
                    <SCGLogoBig className="h-20 md:h-24 w-auto" />
                )}
            </Link>
        </div>
    )
}
