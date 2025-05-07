import { useSearchStore } from "@/stores/useSearchStore";
import { FilterKey } from "@/consts/filterConfig";

export function useIsVarietalSelected(key: string) {
    const varietals = useSearchStore((s) => s.varietalFilters);
    return varietals.includes(key);
}