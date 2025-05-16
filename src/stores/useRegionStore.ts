// stores/useRegionStore.ts
import { create } from 'zustand';
import { RegionCode, REGIONS } from '@/consts/regionConfig';

interface RegionState {
    region: RegionCode;
    setRegion: (region: RegionCode) => void;
}

export const useRegionStore = create<RegionState>((set) => ({
    region: 'US',
    setRegion: (region) => set({ region }),
}));
