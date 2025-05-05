// hooks/useSearchLogic.ts
"use client";

import { startTransition, useCallback, useEffect, useRef, useState } from "react";
import { useSearchStore } from "@/stores/useSearchStore";
import { usePaginationStore } from "@/stores/usePaginationStore";
import { usePathname, useRouter } from "next/navigation";
import { serializeQueryParams } from "@/utils/navigation/serializeQueryParams";
import { cupScoreRange as defaultRange } from "@/consts/rangeConfig";
import { useSearchParams } from "@/hooks/useSearchParams";


export function useSearchLogic() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const inputRef = useRef<HTMLInputElement>(null);
    const { min: defaultMin, max: defaultMax } = defaultRange;

    const {
        toggleSearch,
        closeSearch,
        filters,
        query,
        setQuery,
        cupScoreRange,
        resetPagination
    } = {
        ...useSearchStore((s) => ({
            toggleSearch: s.toggleSearch,
            closeSearch: s.closeSearch,
            filters: s.filters,
            query: s.query,
            setQuery: s.setQuery,
            cupScoreRange: s.cupScoreRange,
        })),
        ...usePaginationStore((s) => ({
            resetPagination: s.resetPagination
        })),
    };

    // Set input focus
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Close search on esc
    useEffect(() => {
        const onEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeSearch();
        };
        document.addEventListener("keydown", onEsc);
        return () => document.removeEventListener("keydown", onEsc);
    }, [closeSearch]);

    // Update URL when filters or query change
    useEffect(() => {
        if (!pathname.startsWith("/search")) return;

        const [min, max] = cupScoreRange;

        const params = {
            ...filters,
            q: query || undefined,
            page: 1,
            ...(min !== (defaultMin - 1) || max !== (defaultMax + 1) ? {
                cup_score_min: min,
                cup_score_max: max,

            } : {}),
        };

        const qs = serializeQueryParams(params);
        const target = `/search?${qs}`;

        if (window.location.pathname + window.location.search !== target) {
            startTransition(() => {
                router.replace(target);
            });
        }
    }, [filters, query, cupScoreRange]);

    const handleSearch = () => {
        setQuery(query);
        closeSearch();
        resetPagination();

        const newParams = {
            ...searchParams,
            q: query || undefined,
            page: 1,
        };

        const qs = serializeQueryParams(newParams);
        const newUrl = `/search?${qs}`;

        if (window.location.pathname + window.location.search !== newUrl) {
            router.push(newUrl);
        }

    };

    return {
        inputRef,
        query,
        setQuery,
        handleSearch,
        toggleSearch,
    };
}
