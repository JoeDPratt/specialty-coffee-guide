// /lib/db/products.ts

import { cache } from "react"; // Import cache from React
import { createClient } from "@/lib/supabase/server";
import { transformProductCard } from "@/utils/transformers/product";
import { RawProductCard } from "@/types/db-returns";
import { ProductCard } from "@/types/product";

export const getProductsByRoasterSlug = cache(
    async (roasterSlug: string, limit = 4): Promise<ProductCard[]> => {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("coffee_products")
            .select(
                `product_name, slug, lowest_price_per_kg, is_organic, is_decaf, is_lowcaf, is_mycotoxin_tested, sca_cup_score, search_flavours, 
                product_images ( image_url, alt_text, is_primary ),
                coffee_roaster:coffee_roasters!inner (
                    name, slug,
                    roaster_images ( image_url, alt_text, logo_layout, is_primary )
                )
            `)
            .eq("is_published", true)
            .eq("is_deleted", false)
            .eq("coffee_roasters.slug", roasterSlug)
            .limit(limit);

        if (error) {
            console.error("Error in getProductsByRoasterSlug:", error);
            return [];
        }

        const cleanData = (data ?? []).map((item): RawProductCard => ({
            ...item,
            // manually flatten `coffee_roaster` if it somehow comes back as array
            coffee_roaster: Array.isArray(item.coffee_roaster)
                ? item.coffee_roaster[0]
                : item.coffee_roaster,
        }));
        const transformedProduct = cleanData.map(transformProductCard);

        return transformedProduct;
    },
);