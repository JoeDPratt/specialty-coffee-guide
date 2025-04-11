// stores/useStickyStore.ts
import { create } from 'zustand'

type StickyState = {
    isScrolled: boolean
    setIsScrolled: (value: boolean) => void
}

export const useStickyStore = create<StickyState>((set) => ({
    isScrolled: false,
    setIsScrolled: (value) => set({ isScrolled: value }),
}))