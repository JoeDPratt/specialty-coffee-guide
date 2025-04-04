// /lib/db/products.ts

import { createClient } from '@/lib/supabase/server'
import { Product } from '@/types/product'
import { transformProduct } from '@/utils/transformers/product'

export async function getFullProductBySlug(slug: string): Promise<Product | null> {
    console.log("Get Product Page Loading...");
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('coffee_products')
        .select(`
            product_name,
            product_url,
            description,
            meta_title,
            meta_description,
            schema,
            slug,
            sca_cup_score,
            is_decaf,
            is_lowcaf,
            is_fairtrade,
            is_instock,
            is_mycotoxin_tested,
            is_organic,
            is_single_origin,
            insight,
            product_variants (
                price,
                weight,
                price_per_kg,
                currency,
                discount_percent
            ),
            product_images (
                image_url,
                alt_text,
                is_primary
            ),
            coffee_provenance (
                altitude_min,
                altitude_max,
                coffee_origin_countries (
                    default_origin_countries (
                    display_name
                    )
                ),
                coffee_origin_regions (
                    default_origin_regions (
                    display_name
                    )
                ),
                coffee_processes (
                    default_coffee_processes (
                    display_name
                    )
                ),
                coffee_producers (
                    default_coffee_producers (
                    display_name
                    )
                ),
                coffee_varietals (
                    default_varietals (
                    display_name
                    )
                )
            ),
            coffee_roasts (
                default_roasts (
                    display_name
                )
            ),
            coffee_grinds (
                default_grinds (
                    display_name
                )
            ),
            coffee_flavours_identified (
                canonical_flavour
            ),
            coffee_roasters (
                name,
                slug,
                roaster_images (
                  image_url,
                  alt_text,
                  is_primary
                )
              )
        `)
        .eq('slug', slug)
        .eq('is_published', true)
        .eq('is_deleted', false)
        .single()
    if (error) console.log("Slug Error", error)
    if (!data || error) return null
    // console.log("PRE TRANSFORMED PRODUCT DATA", data)

    return transformProduct(data)
}

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
