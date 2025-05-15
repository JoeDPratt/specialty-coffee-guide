import { create } from 'zustand'

export type BreadcrumbItem = {
    label: string
    href: string
}

export interface BreadcrumbState {
    breadcrumbs: BreadcrumbItem[]
    setBreadcrumbs: (crumbs: BreadcrumbItem[]) => void
    clearBreadcrumbs: () => void
}

export const useBreadcrumbStore = create<BreadcrumbState>((set) => ({
    breadcrumbs: [],
    setBreadcrumbs: (crumbs) => set({ breadcrumbs: crumbs }),
    clearBreadcrumbs: () => set({ breadcrumbs: [] }),
}))
