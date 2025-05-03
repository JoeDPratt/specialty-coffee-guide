// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSearchResults } from '@/lib/queries/products/getSearchResults';
import type { SearchQueryParams } from "@/types/search";
import { filterConfig, type FilterKey } from "@/consts/filterConfig";

export async function GET(req: NextRequest) {
    const sp = new URL(req.url).searchParams;

    // base fields
    const params: SearchQueryParams = {
        q: sp.get("q") ?? undefined,
        sort_by: sp.get("sort_by") as any,
        page: sp.has("page") ? Number(sp.get("page")) : undefined,
        page_size: sp.has("page_size") ? Number(sp.get("page_size")) : undefined,
    };

    // 🔑 dynamically map every filter key (current & future)
    for (const key of Object.keys(filterConfig) as FilterKey[]) {
        if (sp.get(key) === "true") params[key] = true;
    }

    const data = await getSearchResults(params);
    return NextResponse.json(data);
}
