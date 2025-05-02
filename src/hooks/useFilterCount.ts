import { useSearchStore } from "@/stores/useSearchStore";

export function useFilterCount() {
    return useSearchStore((s) =>
        Object.values(s.filters).filter(Boolean).length
    );
}
