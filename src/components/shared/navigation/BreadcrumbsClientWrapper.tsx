'use client';

import { Breadcrumbs } from './Breadcrumbs';
import { useStickyStore } from '@/stores/useStickyStore';
import { useSearchStore } from '@/stores/useSearchStore'

import { motion } from 'framer-motion'

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

        <motion.div
            className={`px-6 z-20 sticky transition-colors duration-900 shadow-sm ${!isSearchOpen && isScrolled ? 'bg-pr-200 text-pr-800 top-20' : 'opacity-0 pointer-events-none'}`}
            layout="preserve-aspect"
            transition={{ duration: 0.2 }}
        >
            <Breadcrumbs crumbs={crumbs} />
        </motion.div>

    );
}
