import type { SearchQueryParams } from '@/types/search';

export function serializeQueryParams(params: SearchQueryParams) {
    const qs = new URLSearchParams();

    for (const key in params) {
        const value = params[key as keyof SearchQueryParams];

        // skip undefined and boolean-false
        if (value !== undefined && value !== false) {
            qs.set(key, String(value));
        }
    }

    return qs.toString();
}

export function parseQueryParams(
    params: Record<string, string | string[] | undefined>): SearchQueryParams {
    return {
        q: Array.isArray(params.q) ? params.q[0] : params.q ?? undefined,
        is_organic: params.is_organic === 'true',
        is_decaf: params.is_decaf === 'true',
        is_mycotoxin_free: params.is_mycotoxin_free === 'true',
        is_single_origin: params.is_single_origin === 'true',
        sort_by: Array.isArray(params.sort) ? params.sort[0] as any : params.sort as any,
        page: params.page ? Number(params.page) : 1, // default to 1
        page_size: params.pageSize ? Number(params.pageSize) : 24, // default to 24
    };
}
