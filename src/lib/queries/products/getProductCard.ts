import { createClient } from "@/lib/supabase/server";
import { ProductVariant } from "@/types/aliases";
import { ProductVariantForCard, RawProductCard } from "@/types/db-returns";
import { Database } from "@/types/supabase";
import { transformProductCard } from "@/utils/transformers/product";
import type { SupabaseClient } from "@supabase/supabase-js";

// Product Card select
export const PRODUCT_CARD_SELECT = `
  product_name, slug, lowest_price_per_kg, is_instock,
  is_organic, is_decaf, is_lowcaf, is_mycotoxin_free, is_fairtrade, sca_cup_score,
  search_flavours, is_single_origin, search_roasts,
  product_images ( image_url, alt_text, is_primary ),
  coffee_roaster:coffee_roasters!inner (
    name, slug,
    roaster_images ( image_url, alt_text, logo_layout, is_primary )
  ),
  product_variants (
    weight,
    price,
    currency,
    price_per_kg,
    is_instock
  )
`;

// apply the “always‐on” filters & select
export function baseProductCardQuery(client: SupabaseClient<Database>) {
    return client
        .from("coffee_products")
        .select(PRODUCT_CARD_SELECT)
        .eq("is_published", true)
        .eq("is_deleted", false);
}

// flatten the returned array and apply transformer
export function cleanAndTransform(
    rows: (RawProductCard & { product_variants?: ProductVariantForCard[] })[] | null
): ReturnType<typeof transformProductCard>[] {
    const cleaned: RawProductCard[] = (rows ?? []).map((item) => ({
        ...item,
        coffee_roaster: Array.isArray(item.coffee_roaster)
            ? item.coffee_roaster[0]
            : item.coffee_roaster,
    }));
    return cleaned.map(transformProductCard);
}

// helper to get a client + run query
export async function fetchProductCards(modifier: (q: ReturnType<typeof baseProductCardQuery>) => ReturnType<typeof baseProductCardQuery>) {
    const supabase = await createClient();
    const { data, error } = await modifier(baseProductCardQuery(supabase));

    if (error) {
        console.error("Product card fetch error:", error);
        return [];
    }
    return cleanAndTransform(data);
}