// /lib/db/products.ts

import { cache } from 'react'; // Import cache from React
import { createClient } from '@/lib/supabase/server';
import { Product } from '@/types/product';
import { transformProduct } from '@/utils/transformers/product';

export const getFullProductBySlug = cache(async (slug: string): Promise<Product | null> => {
    console.log("Get Product Page Loading (cached)... Slug:", slug); // Add slug for clarity
    const supabase = await createClient(); // createClient itself might also benefit from caching if appropriate

    const { data, error } = await supabase
        .from('coffee_products')
        .select(`
            product_name, product_url, description, meta_title, meta_description, schema, slug,
            sca_cup_score, is_decaf, is_lowcaf, is_fairtrade, is_instock, is_mycotoxin_tested,
            is_organic, is_single_origin, insight,
            product_variants ( price, weight, price_per_kg, currency, discount_percent ),
            product_images ( image_url, alt_text, is_primary ),
            coffee_provenance (
                altitude_min, altitude_max,
                coffee_origin_countries ( default_origin_countries ( display_name ) ),
                coffee_origin_regions ( default_origin_regions ( display_name ) ),
                coffee_processes ( default_coffee_processes ( display_name ) ),
                coffee_producers ( default_coffee_producers ( display_name ) ),
                coffee_varietals ( default_varietals ( display_name ) )
            ),
            coffee_roasts ( default_roasts ( display_name ) ),
            coffee_grinds ( default_grinds ( display_name ) ),
            coffee_flavours_identified ( canonical_flavour ),
            coffee_roasters ( name, slug, roaster_images ( image_url, alt_text, is_primary ) )
        `)
        .eq('slug', slug)
        .eq('is_published', true)
        .eq('is_deleted', false)
        .single();

    if (error) {
        console.error("Slug Error in getFullProductBySlug:", error); // Log the actual error
        // Depending on the error, you might want to throw it or return null
        // Supabase often returns an error *and* null data for .single() not found
        if (error.code === 'PGRST116') { // Code for "single row not found"
            return null;
        }
        // For other errors, maybe re-throw or handle differently
        // throw error;
        return null; // Or return null for simplicity
    }
    if (!data) return null;

    return transformProduct(data);
});

export async function getProductImages(): Promise<any | null> {
    const supabase = await createClient()
    const { data } = await supabase
        .from('product_images')
        .select('id, image_url, alt_text, is_primary');

    console.log('All product images:', data);

    console.log("IMAGES", data);
    return data
}

// export async function getCardProducts(): Promise<ProductCard[]> {
//   const supabase = await createClient()

//   const { data, error } = await supabase
//     .from('coffee_products')
//     .select(`slug, product_name, product_images(image_url, alt_text), product_variants(price, currency)`)
//     .eq('is_published', true)

//   if (!data || error) return []

//   return data.map(transformProductCard)
// }
