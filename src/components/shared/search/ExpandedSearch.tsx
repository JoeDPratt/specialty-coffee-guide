'use client'
import ExpandedDesktopSearch from './ExpandedDesktopSearch';
import ExpandedMobileSearch from './ExpandedMobileSearch';

import { useBreakpointStore } from '@/stores/useBreakpointStore';

export default function ExpandedSearch() {
    const isMobile = useBreakpointStore((s) => s.isMd);

    return isMobile ? <ExpandedMobileSearch /> : <ExpandedDesktopSearch />;
}
