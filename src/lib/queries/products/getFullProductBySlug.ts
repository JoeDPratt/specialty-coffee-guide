import { cache } from "react"; // Import cache from React
import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/types/product";
import { transformProduct } from "@/utils/transformers/product";
import { RawProduct } from "@/types/db-returns";

export const getFullProductBySlug = cache(
    async (slug: string): Promise<Product | null> => {
        console.log("Get Product Page Loading (cached)... Slug:", slug); // Add slug for clarity
        const supabase = await createClient(); // createClient itself might also benefit from caching if appropriate

        const { data, error } = await supabase
            .from("coffee_products")
            .select(
                `
            product_name, product_url, description, meta_title, meta_description, schema, slug,
            sca_cup_score, is_decaf, is_lowcaf, is_fairtrade, is_instock, is_mycotoxin_free,
            is_organic, is_single_origin, insight, lowest_price_per_kg,
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
            coffee_roasters ( name, slug, roaster_images ( image_url, alt_text, is_primary, logo_layout ) )
        `,
            )
            .eq("slug", slug)
            .eq("is_published", true)
            .eq("is_deleted", false)
            .single<RawProduct>();

        if (error) {
            console.error("Slug Error in getFullProductBySlug:", error); // Log the actual error
            // Depending on the error, you might want to throw it or return null
            if (error.code === "PGRST116") {
                // Code for "single row not found"
                return null;
            }
            // For other errors, maybe re-throw or handle differently
            return null;
        }
        if (!data) return null;

        return transformProduct(data);
    },
);