'use client'

import Link from "next/link"
import { ChevronRightIcon } from "@heroicons/react/24/solid"
import { useBreadcrumbStore } from '@/stores/useBreadcrumbStore'
import { cn } from "@/utils/classes/merge"

interface BreadcrumbsProps {
    className?: string
}

export function Breadcrumbs({ className = "" }: BreadcrumbsProps) {
    const crumbs = useBreadcrumbStore((s) => s.breadcrumbs)

    if (!crumbs.length) return null

    return (
        <div
            className={cn(
                "px-4 md:px-6 z-155 sticky w-full bg-pr-100/95 text-pr-900 shadow-sm top-15 transition-colors duration-300",
                className
            )}
        >
            <nav
                aria-label="Breadcrumb"
                className={`pt-3.25 pb-2.25`}
            >
                <ol className="flex overflow-x-auto whitespace-nowrap scrollbar-hide gap-1 no-scrollbar">
                    {crumbs.map((item, index) => {
                        const isLast = index === crumbs.length - 1;
                        return (
                            <li key={index} className="flex items-center gap-1">
                                {!isLast ? (
                                    <>
                                        <Link
                                            href={item.href}
                                            className="inline-flex items-center hover:underline font-sofia-sans text-base font-normal"
                                        >
                                            {item.label}

                                        </Link>
                                        <ChevronRightIcon className="w-4 h-4" />
                                    </>
                                ) : (
                                    <span className="text-pr-500 font-sofia-sans text-base font-normal">
                                        {item.label}
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </div>
    );
}
