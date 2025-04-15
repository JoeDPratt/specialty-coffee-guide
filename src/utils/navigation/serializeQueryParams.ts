import type { SearchQueryParams } from '@/types/search';

export function serializeQueryParams(params: Record<string, string | boolean | undefined>) {
    const qs = new URLSearchParams();

    for (const key in params) {
        const value = params[key];
        if (value !== undefined && value !== false) {
            qs.set(key, String(value));
        }
    }

    return qs.toString(); // e.g. q=Cherry&is_organic=true
}

export function parseQueryParams(
    params: Record<string, string | string[] | undefined>
): SearchQueryParams {
    return {
        q: Array.isArray(params.q) ? params.q[0] : params.q ?? undefined,
        is_organic: params.is_organic === 'true',
        is_decaf: params.is_decaf === 'true',
        is_mycotoxin_free: params.is_mycotoxin_free === 'true',
        is_single_origin: params.is_single_origin === 'true',
    };
}