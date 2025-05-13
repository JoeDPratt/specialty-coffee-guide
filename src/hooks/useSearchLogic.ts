// hooks/useSearchLogic.ts
"use client";

import { startTransition, useCallback, useEffect, useRef, useState } from "react";
import { SearchState, useSearchStore } from "@/stores/useSearchStore";
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
        varietalFilters,
        processFilters,
        countryFilters,
        query,
        setQuery,
        cupScoreRange,
        resetPagination
    } = {
        ...useSearchStore((s: SearchState) => ({
            toggleSearch: s.toggleSearch,
            closeSearch: s.closeSearch,
            filters: s.filters,
            varietalFilters: s.varietalFilters,
            processFilters: s.processFilters,
            countryFilters: s.countryFilters,
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
            varietals: varietalFilters.length > 0 ? varietalFilters : undefined,
            processes: processFilters.length > 0 ? processFilters : undefined,
            countries: countryFilters.length > 0 ? countryFilters : undefined,
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
    }, [filters, query, cupScoreRange, varietalFilters, processFilters, countryFilters]);

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
