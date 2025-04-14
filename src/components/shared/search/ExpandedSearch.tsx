'use client'
import ExpandedDesktopSearch from './ExpandedDesktopSearch';
import ExpandedMobileSearch from './ExpandedMobileSearch';

import { useIsMobile } from '@/hooks/useIsMobile';

export default function ExpandedSearch() {
    const isMobile = useIsMobile();

    return isMobile ? <ExpandedMobileSearch /> : <ExpandedDesktopSearch />;
}
