// hooks/useSyncUrlParams.ts
"use client";

import { useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { serializeQueryParams } from "@/utils/navigation/serializeQueryParams";

export function useSyncUrlParams(params: Record<string, unknown>) {
    const router = useRouter();
    const pathname = usePathname();

    // memoize the serialized string so it only changes when params change
    const qs = useMemo(() => serializeQueryParams(params), [params]);

    useEffect(() => {
        const currentQs = window.location.search.replace(/^\?/, "");
        console.log("Syncing URL:", { newQs: qs, oldQs: currentQs });
        if (qs !== currentQs) {
            router.replace(`${pathname}?${qs}`);
        }
    }, [qs, router, pathname]);
}
