// src/hooks/useSearchResultsCounter.ts
import { SearchState, useSearchStore } from "@/stores/useSearchStore";
import { useMemo } from "react";

export function useSearchResultsCounter(): string {

    const totalResults = useSearchStore((s: SearchState) => s.totalResults);
    return useMemo(() => {
        return `${totalResults} coffee${totalResults === 1 ? "" : "s"}`;
    }, [totalResults]);
}