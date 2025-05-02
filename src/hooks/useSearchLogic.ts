// hooks/useSearchLogic.ts
"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchStore } from "@/stores/useSearchStore";
import { usePaginationStore } from "@/stores/usePaginationStore";
import { usePathname, useRouter } from "next/navigation";
import { serializeQueryParams } from "@/utils/navigation/serializeQueryParams";
import { useDebouncedEffect } from "./useDebounceEffect";

export function useSearchLogic() {
    const router = useRouter();
    const pathname = usePathname();
    const inputRef = useRef<HTMLInputElement>(null);

    // existing store bits
    const toggleSearch = useSearchStore((s) => s.toggleSearch);
    const closeSearch = useSearchStore((s) => s.closeSearch);
    const filters = useSearchStore((s) => s.filters);
    const query = useSearchStore((s) => s.query);
    const setQuery = useSearchStore((s) => s.setQuery);
    const sortedBy = useSearchStore((s) => s.sortedBy);
    const page = usePaginationStore((s) => s.page);
    const pageSize = usePaginationStore((s) => s.pageSize);
    const setPage = usePaginationStore((s) => s.setPage);

    const [localQuery, setLocalQuery] = useState(query);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        const onEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeSearch();
        };
        document.addEventListener("keydown", onEsc);
        return () => document.removeEventListener("keydown", onEsc);
    }, [closeSearch]);

    useDebouncedEffect(() => {
        if (!pathname.startsWith("/search")) return;
        // rebuild full query
        const queryObj = {
            q: query || undefined,
            ...filters,
            sort_by: sortedBy,
            page,
            page_size: pageSize,
        };
        const qs = serializeQueryParams(queryObj);
        router.push(`/search?${qs}`);
    }, [filters, sortedBy, page, pageSize, query], 300);

    const handleSearch = () => {
        // commit the typed query into the store
        setQuery(localQuery.trim());
        closeSearch();

        // whenever we do a brand-new search, go back to page 1
        setPage(1);

        // build the full query object with filters, sort & pagination
        const queryObject = {
            q: localQuery.trim() || undefined,
            ...filters,
            sort_by: sortedBy,
            page,
            page_size: pageSize,
        };

        const queryString = serializeQueryParams(queryObject);
        router.push(`/search?${queryString}`);
    };

    return {
        inputRef,
        localQuery,
        setLocalQuery,
        handleSearch,
        toggleSearch,
    };
}
