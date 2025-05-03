import { usePaginationStore } from "@/stores/usePaginationStore";
import { useSearchStore } from "@/stores/useSearchStore";

export function useSearchResultsCounter(): string {

    const totalResults = useSearchStore((s) => s.totalResults); // 8
    const pageSize = usePaginationStore((s) => s.pageSize); // 4
    const page = usePaginationStore((s) => s.page); // 1 or 2
    const pageStart = (page - 1) * pageSize + 1;
    const pageEnd = Math.min(totalResults, page * pageSize);

    const resultsString = `${pageStart} - ${pageEnd} of ${totalResults} coffees`;
    return resultsString
}