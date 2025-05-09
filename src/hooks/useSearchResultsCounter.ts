// src/hooks/useSearchResultsCounter.ts
import { useSearchStore } from "@/stores/useSearchStore";
import { useMemo } from "react";

export function useSearchResultsCounter(): string {

    const totalResults = useSearchStore((s) => s.totalResults);
    return useMemo(() => {
        return `${totalResults} coffee${totalResults === 1 ? "" : "s"}`;
    }, [totalResults]);
}