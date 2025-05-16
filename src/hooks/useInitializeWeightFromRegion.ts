// hooks/useInitializeWeightFromRegion.ts
import { useEffect } from 'react';
import { useRegionStore } from '@/stores/useRegionStore';
import { useSearchStore } from '@/stores/useSearchStore';
import { REGIONS } from '@/consts/regionConfig';

export default function useInitializeWeightFromRegion() {
    const region = useRegionStore((s) => s.region);
    const setSelectedWeight = useSearchStore((s) => s.setSelectedWeight);

    useEffect(() => {
        const { smallBagSize } = REGIONS[region];
        setSelectedWeight(smallBagSize);
    }, [region, setSelectedWeight]);
}