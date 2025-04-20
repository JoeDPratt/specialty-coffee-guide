// lib/queries/products/getSearchResults.ts
import { cache } from 'react';
import { fetchProductCards } from './common';

type SearchParams = {
    q?: string;
    is_organic?: boolean;
    is_decaf?: boolean;
    is_mycotoxin_free?: boolean;
    is_single_origin?: boolean;
};

export const getSearchResults = cache(async (params: SearchParams) =>
    fetchProductCards((q) => {
        let qq = q.limit(24);
        if (params.q) qq = qq.textSearch("search_terms", params.q, { type: "websearch" });
        if (params.is_organic) qq = qq.eq("is_organic", true);
        if (params.is_decaf) qq = qq.or("is_decaf.eq.true,is_lowcaf.eq.true");
        if (params.is_mycotoxin_free) qq = qq.eq("is_mycotoxin_tested", true);
        if (params.is_single_origin) qq = qq.eq("is_single_origin", true);
        return qq;
    })
);