// lib/queries/products/getSearchResults.ts
import { cache } from 'react';
import { fetchProductCards } from './getProductCard';
import type { SearchQueryParams } from '@/types/search';

export const getSearchResults = cache(async (params: SearchQueryParams) =>

    fetchProductCards((q) => {
        let qq = q;
        if (params.q) qq = qq.textSearch("search_terms", params.q, { type: "websearch" });
        if (params.is_organic) qq = qq.eq("is_organic", true);
        if (params.is_decaf) qq = qq.or("is_decaf.eq.true,is_lowcaf.eq.true");
        if (params.is_mycotoxin_free) qq = qq.eq("is_mycotoxin_tested", true);
        if (params.is_single_origin) qq = qq.eq("is_single_origin", true);

        qq = qq.order("is_instock", { ascending: false, nullsFirst: false });
        // Add Sorting
        if (params.sort_by === "price_low") {
            qq = qq.order("lowest_price_per_kg", { ascending: true, nullsFirst: false });
        } else if (params.sort_by === "price_high") {
            qq = qq.order("lowest_price_per_kg", { ascending: false, nullsFirst: false });
        } else if (params.sort_by === "cup_score_high") {
            qq = qq.order("sca_cup_score", { ascending: false, nullsFirst: false });
        }

        // Add Pagination
        const pageSize = params.page_size ?? 24;
        const page = params.page ?? 1;
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;
        qq = qq.range(from, to);

        return qq;
    })

);
