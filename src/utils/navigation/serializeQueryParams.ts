// src/utils/navigation/serializeQueryParams.ts
import type { SearchQueryParams } from '@/types/search';
import { filterConfig, type FilterKey } from "@/consts/filterConfig";
import { cupScoreRange } from '@/consts/rangeConfig';
import { DEFAULT_PAGE_SIZE } from "@/consts/paginationConfig";

export function serializeQueryParams(params: SearchQueryParams) {
    const qs = new URLSearchParams();

    for (const key in params) {
        const value = params[key as keyof SearchQueryParams];

        // Skip default booleans (false)
        if (typeof value === "boolean") {
            if (value) qs.set(key, "true");
            continue;
        }

        // Varietals: serialize as comma-separated string
        if (key === "varietalFilters" && Array.isArray(value)) {
            qs.set("varietals", value.join(","));
            continue;
        }

        // // Skip cup score if default
        if (key === "cup_score_min" && Number(value) === cupScoreRange.min - 1) continue;
        if (key === "cup_score_max" && Number(value) === cupScoreRange.max + 1) continue;

        if (value !== undefined) {
            qs.set(key, String(value));
        }
    }

    return qs.toString();
}

export function parseQueryParams(
    params: Record<string, string | string[] | undefined>
): SearchQueryParams {

    const result: SearchQueryParams = {
        q: Array.isArray(params.q) ? params.q[0] : params.q ?? undefined,
        sort_by: Array.isArray(params.sort_by) ? params.sort_by[0] as any : params.sort_by as any,
        page: params.page ? Number(params.page) : 1,
        page_size: params.page_size ? Number(params.page_size) : DEFAULT_PAGE_SIZE,
        cup_score_min: params.cup_score_min ? Number(params.cup_score_min) : undefined,
        cup_score_max: params.cup_score_max ? Number(params.cup_score_max) : undefined,
        varietals: [],
    };

    for (const key of Object.keys(filterConfig) as FilterKey[]) {
        if (params[key] === "true") {
            result[key] = true;
        }
    }

    // Varietals: parse from comma-separated string
    if (params.varietals) {
        const raw = Array.isArray(params.varietals) ? params.varietals[0] : params.varietals;
        result.varietals = raw.split(',').map((v) => v.trim()).filter(Boolean);
    }

    return result;
}
