// stores/useBreakpointStore.ts
import { create } from 'zustand'

const BREAKPOINTS = {
    base: 320,
    xs: 420,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1360,
}

type BreakpointStore = {
    width: number
    isBase: boolean
    isXs: boolean
    isSm: boolean
    isMd: boolean
    isLg: boolean
    isXl: boolean
    setWidth: (width: number) => void
}

export const useBreakpointStore = create<BreakpointStore>((set) => ({
    width: 0,
    isBase: false,
    isXs: false,
    isSm: false,
    isMd: false,
    isLg: false,
    isXl: false,
    setWidth: (width) => set({
        width,
        isBase: width < BREAKPOINTS.base,
        isXs: width < BREAKPOINTS.xs,
        isSm: width < BREAKPOINTS.sm,
        isMd: width < BREAKPOINTS.md,
        isLg: width < BREAKPOINTS.lg,
        isXl: width < BREAKPOINTS.xl,
    })
}))