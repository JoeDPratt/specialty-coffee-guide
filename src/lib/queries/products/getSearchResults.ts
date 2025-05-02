// lib/queries/products/getSearchResults.ts
import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import { PRODUCT_CARD_SELECT, cleanAndTransform } from './getProductCard';
import type { SearchQueryParams, SearchResultsResponse } from '@/types/search';
import type { ProductVariantForCard, RawProductCard } from '@/types/db-returns';
import { ProductCard } from '@/types/product';

export const getSearchResults =
    cache(async (params: SearchQueryParams): Promise<SearchResultsResponse> => {
        const supabase = await createClient();

        const pageSize = params.page_size ?? 24;
        const page = params.page ?? 1;
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;

        // 1) Start by selecting exactly the columns you want.
        //    That returns a PostgrestTransformBuilder which has .eq/.textSearch/.count().
        let builder = supabase
            .from('coffee_products')
            .select(PRODUCT_CARD_SELECT, { count: 'exact' });

        // 2) Always-on filters:
        builder = builder
            .eq('is_published', true)
            .eq('is_deleted', false);

        // 3) Your optional filters, with plain `if` blocks
        if (params.q) builder = builder.textSearch('search_terms', params.q, { type: 'websearch' });
        if (params.is_organic) builder = builder.eq('is_organic', true);
        if (params.is_decaf) builder = builder.or('is_decaf.eq.true,is_lowcaf.eq.true');
        if (params.is_mycotoxin_free) builder = builder.eq('is_mycotoxin_free', true);
        if (params.is_single_origin) builder = builder.eq('is_single_origin', true);

        // 4) Sorting
        builder = builder.order('is_instock', { ascending: false, nullsFirst: false });
        if (params.sort_by === 'price_low') builder = builder.order('lowest_price_per_kg', { ascending: true, nullsFirst: false });
        if (params.sort_by === 'price_high') builder = builder.order('lowest_price_per_kg', { ascending: false, nullsFirst: false });
        if (params.sort_by === 'cup_score_high') builder = builder.order('sca_cup_score', { ascending: false, nullsFirst: false });

        // 5) Pagination
        builder = builder.range(from, to);

        // 6) Finally, ask Supabase for your rows *and* the exact count
        const { data, count, error } = await builder;
        if (error) {
            console.error('Product card fetch error:', error);
            return { results: [] as ProductCard[], totalPages: 0, nextPage: undefined };
        }

        const rows = data ?? []
        // 7) Transform & paginate
        const rawRows = (rows as unknown) as (RawProductCard & {
            product_variants?: ProductVariantForCard[]
        })[]
        const products = cleanAndTransform(rawRows);
        const totalPages = Math.ceil((count ?? 0) / pageSize);
        const nextPage = page < totalPages ? page + 1 : undefined;

        return { results: products, totalPages, nextPage };
    });