// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSearchResults } from '@/lib/queries/products/getSearchResults';
import type { SearchQueryParams } from "@/types/search";
import type { SortOption } from "@/stores/useSearchStore";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const sp = url.searchParams;

    // extract query
    const params: SearchQueryParams = {
        q: sp.get("q") ?? undefined,
        is_organic: sp.get("is_organic") === "true",
        is_decaf: sp.get("is_decaf") === "true",
        is_mycotoxin_free: sp.get("is_mycotoxin_free") === "true",
        is_single_origin: sp.get("is_single_origin") === "true",
        sort_by: sp.get("sort_by") as SortOption | undefined,
        page: sp.has("page") ? Number(sp.get("page")) : undefined,
        page_size: sp.has("page_size") ? Number(sp.get("page_size")) : undefined,
    };

    // now pass them into your Supabase‐backed query
    const products = await getSearchResults(params);

    return NextResponse.json(products);
}
