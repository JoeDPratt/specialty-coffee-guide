'use client';

import { Breadcrumbs } from './Breadcrumbs';
import { useStickyStore } from '@/stores/useStickyStore';
import { useSearchStore } from '@/stores/useSearchStore'
import { motion } from 'framer-motion'
import { cn } from '@/utils/classes/merge';
import { fadeUpItem } from '@/utils/animation';

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface Props {
    crumbs: BreadcrumbItem[];
    className?: string;
}

export function BreadcrumbsClientWrapper({ crumbs, className }: Props) {
    const isScrolled = useStickyStore((s) => s.isScrolled);
    const isSearchOpen = useSearchStore((s) => s.isSearchOpen);

    return (
        <>
            {!isSearchOpen && isScrolled && (
                <div
                    className={cn(
                        "px-4 md:px-6 z-155 fixed w-full bg-pr-100/95 text-pr-900 shadow-sm top-15 transition-colors duration-300"
                    )}
                >
                    <Breadcrumbs crumbs={crumbs} />
                </div>
            )}
        </>
    );
}
