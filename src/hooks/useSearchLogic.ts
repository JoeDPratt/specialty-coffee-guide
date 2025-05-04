// hooks/useSearchLogic.ts
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchStore } from "@/stores/useSearchStore";
import { usePaginationStore } from "@/stores/usePaginationStore";
import { usePathname, useRouter } from "next/navigation";
import { serializeQueryParams } from "@/utils/navigation/serializeQueryParams";
import { useDebouncedEffect } from "./useDebounceEffect";
import { useSearchParams } from "@/hooks/useSearchParams";

export function useSearchLogic() {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const inputRef = useRef<HTMLInputElement>(null);

    const {
        toggleSearch,
        closeSearch,
        query: storeQuery,
        setQuery,
        setPage,
        resetPagination
    } = {
        ...useSearchStore((s) => ({
            toggleSearch: s.toggleSearch,
            closeSearch: s.closeSearch,
            query: s.query,
            setQuery: s.setQuery,
        })),
        ...usePaginationStore((s) => ({
            setPage: s.setPage,
            resetPagination: s.resetPagination
        })),
    };

    const [localQuery, setLocalQuery] = useState(storeQuery);
    // Keep localQuery in sync
    useEffect(() => {
        setLocalQuery(storeQuery);
    }, [storeQuery]);

    // Debounce when writing to the store
    useDebouncedEffect(() => {
        setQuery(localQuery.trim());
        resetPagination();
    }, [localQuery], 300);

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

    useDebouncedEffect(() => {
        if (!pathname.startsWith("/search")) return;

        const qs = serializeQueryParams(searchParams);
        const newUrl = `/search?${qs}`;
        if (window.location.pathname + window.location.search !== newUrl) {
            router.replace(newUrl);
        }
    }, [searchParams], 300);

    const handleSearch = useCallback(() => {
        const trimmedQuery = localQuery.trim();
        setQuery(trimmedQuery);
        closeSearch();
        resetPagination();

        const newParams = {
            ...searchParams,
            q: trimmedQuery || undefined,
            page: 1,
        };

        const qs = serializeQueryParams(newParams);
        const newUrl = `/search?${qs}`;

        if (window.location.pathname + window.location.search !== newUrl) {
            router.replace(`/search?${newUrl}`);
        }

    }, [localQuery, searchParams, setQuery, setPage, closeSearch, router]);

    return {
        inputRef,
        query: localQuery,
        setQuery: setLocalQuery,
        handleSearch,
        toggleSearch,
    };
}
