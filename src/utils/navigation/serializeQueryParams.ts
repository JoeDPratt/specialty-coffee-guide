import type { SearchQueryParams } from '@/types/search';
import { filterConfig, type FilterKey } from "@/consts/filterConfig";

export function serializeQueryParams(params: SearchQueryParams) {
    const qs = new URLSearchParams();

    for (const key in params) {
        const value = params[key as keyof SearchQueryParams];
        if (typeof value === "boolean") {
            if (value) qs.set(key, "true");
        } else if (value !== undefined) {
            qs.set(key, String(value));
        }
    }

    return qs.toString();
}

export function parseQueryParams(
    params: Record<string, string | string[] | undefined>): SearchQueryParams {

    const result: SearchQueryParams = {
        q: Array.isArray(params.q) ? params.q[0] : params.q ?? undefined,
        sort_by: Array.isArray(params.sort_by) ? params.sort_by[0] as any : params.sort_by as any,
        page: params.page ? Number(params.page) : 1,
        page_size: params.page_size ? Number(params.page_size) : 24,
    };

    for (const key of Object.keys(filterConfig) as FilterKey[]) {
        if (params[key] === "true") {
            result[key] = true;
        }
    }

    return result;
}
