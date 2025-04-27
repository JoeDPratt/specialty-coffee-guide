"use client";

import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { serializeQueryParams } from "@/utils/navigation/serializeQueryParams";

export function useSyncUrlParams(params: Record<string, unknown>) {
    const pathname = usePathname();

    const qs = useMemo(() => serializeQueryParams(params), [params]);

    useEffect(() => {
        const currentQs = window.location.search.replace(/^\?/, "");
        if (qs !== currentQs) {
            const newUrl = `${pathname}?${qs}`;
            window.history.replaceState(null, "", newUrl); // ← No server reload
        }
    }, [qs, pathname]);
}
