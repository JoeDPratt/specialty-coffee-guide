// src/hooks/useSearchResultsCounter.ts
import { useSearchStore } from "@/stores/useSearchStore";

export function useSearchResultsCounter(): string {

    const totalResults = useSearchStore((s) => s.totalResults);
    const resultsString = `${totalResults} coffee${totalResults === 1 ? "" : "s"}`;
    return resultsString
}