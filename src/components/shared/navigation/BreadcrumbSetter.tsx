'use client'

import { useEffect } from 'react'
import { useBreadcrumbStore, type BreadcrumbItem } from '@/stores/useBreadcrumbStore'

export function BreadcrumbsSetter({ crumbs }: { crumbs: BreadcrumbItem[] }) {
    const setBreadcrumbs = useBreadcrumbStore((s) => s.setBreadcrumbs)

    useEffect(() => {
        setBreadcrumbs(crumbs)
    }, [crumbs, setBreadcrumbs])

    return null
}