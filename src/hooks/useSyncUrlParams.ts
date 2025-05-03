"use client";

import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { serializeQueryParams } from "@/utils/navigation/serializeQueryParams";
import { useSearchParams } from "@/hooks/useSearchParams";

export function useSyncUrlParams() {
    const pathname = usePathname();
    const queryObj = useSearchParams();
    const qs = useMemo(() => serializeQueryParams(queryObj), [queryObj]);

    useEffect(() => {
        const currentQs = window.location.search.replace(/^\?/, "");
        if (qs !== currentQs) {
            const newUrl = `${pathname}?${qs}`;
            window.history.replaceState(null, "", newUrl); // ← No server reload
        }
    }, [qs, pathname]);
}
