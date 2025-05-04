// src/hooks/useSearchResultsCounter.ts
import { usePaginationStore } from "@/stores/usePaginationStore";
import { useSearchStore } from "@/stores/useSearchStore";

export function useSearchResultsCounter(): string {

    const totalResults = useSearchStore((s) => s.totalResults);
    const { page, pageSize } = usePaginationStore((s) => ({ page: s.page, pageSize: s.pageSize }));
    const pageStart = (page - 1) * pageSize + 1;
    const pageEnd = Math.min(totalResults, page * pageSize);

    const resultsString = `${pageStart} - ${pageEnd} of ${totalResults} coffees`;
    return resultsString
}