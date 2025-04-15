// lib/queries/products/getSearchResults.ts
import { createClient } from '@/lib/supabase/server';
import { RawProductCard } from '@/types/db-returns';
import { transformProductCard } from '@/utils/transformers/product';
import { cache } from 'react';

type SearchParams = {
    q?: string;
    is_organic?: boolean;
    is_decaf?: boolean;
    is_mycotoxin_free?: boolean;
    is_single_origin?: boolean;
};

export const getSearchResults = cache(
    async (params: SearchParams) => {
        const supabase = await createClient();
        let query = supabase
            .from('coffee_products')
            .select(`
        product_name, slug, lowest_price_per_kg,
        is_organic, is_decaf, is_lowcaf, is_mycotoxin_tested, sca_cup_score,
        search_flavours,
        product_images ( image_url, alt_text, is_primary ),
        coffee_roaster:coffee_roasters!inner (
          name, slug,
          roaster_images ( image_url, alt_text, logo_layout, is_primary )
        )
      `)
            .eq('is_published', true)
            .eq('is_deleted', false)
            .limit(24);

        if (params.q) {
            query = query.textSearch('search_terms', params.q, {
                type: 'websearch', // more natural search behavior, like Google
            });
        }
        if (params.is_organic) query = query.eq('is_organic', true);
        if (params.is_decaf) query = query.eq('is_decaf', true);
        if (params.is_mycotoxin_free) query = query.eq('is_mycotoxin_tested', true);
        if (params.is_single_origin) query = query.eq('is_single_origin', true);

        const { data, error } = await query;

        if (error) {
            console.error('Search query error:', error);
            return [];
        }

        const cleanData = (data ?? []).map((item): RawProductCard => ({
            ...item,
            coffee_roaster: Array.isArray(item.coffee_roaster)
                ? item.coffee_roaster[0]
                : item.coffee_roaster,
        }));

        return cleanData.map(transformProductCard);
    }
);
