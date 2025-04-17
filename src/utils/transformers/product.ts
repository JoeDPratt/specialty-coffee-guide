import { ProductVariant } from "@/types/aliases";
import { ProductImageForCard, RawProduct, RawProductCard, RoasterImageForCard } from "@/types/db-returns";
import type { Product, ProductCard, RoastLevel, CoffeeAttributes } from "@/types/product";

const validRoastLevels: RoastLevel[] = [
    "dark",
    "medium dark",
    "medium",
    "medium light",
    "light",
];

// interface Attributes {
//     is_organic: boolean;
//     is_fairtrade: boolean;
//     is_mycotoxin_free: boolean;
//     is_decaf?: boolean;
//     is_lowcaf?: boolean;
//     is_single_origin?: boolean;
// }

export function transformProduct(raw: RawProduct): Product {
    const provenanceRaw = raw.coffee_provenance?.[0];

    const provenance = provenanceRaw
        ? {
            origin_countries: provenanceRaw.coffee_origin_countries?.map(
                (c) => c.default_origin_countries.display_name
            ) ?? [],
            origin_regions: provenanceRaw.coffee_origin_regions?.map(
                (r) => r.default_origin_regions.display_name
            ) ?? [],
            producers: provenanceRaw.coffee_producers?.map(
                (p) => p.default_coffee_producers.display_name
            ) ?? [],
            altitude: {
                min: provenanceRaw.altitude_min ?? null,
                max: provenanceRaw.altitude_max ?? null,
            },
            varietals: provenanceRaw.coffee_varietals?.map(
                (v) => v.default_varietals?.display_name ?? ""
            ) ?? [],
            processes: provenanceRaw.coffee_processes?.map(
                (p) => p.default_coffee_processes.display_name
            ) ?? [],
        }
        : {
            origin_countries: [],
            origin_regions: [],
            producers: [],
            altitude: { min: null, max: null },
            varietals: [],
            processes: [],
        };

    const roasts = raw.coffee_roasts
        ?.map((r) => r.default_roasts?.display_name?.toLowerCase().trim())
        .filter((r): r is RoastLevel => validRoastLevels.includes(r as RoastLevel)) ?? [];

    const primaryRoasterImage = raw.coffee_roasters.roaster_images.find(img => img.is_primary);

    const attributes: CoffeeAttributes = {
        is_organic: raw.is_organic,
        is_single_origin: raw.is_single_origin,
        is_fairtrade: raw.is_fairtrade,
        is_mycotoxin_free: raw.is_mycotoxin_tested,
    };

    if (raw.is_lowcaf) {
        attributes.is_lowcaf = raw.is_lowcaf ?? false;
    } else {
        attributes.is_decaf = raw.is_decaf ?? false;
    }



    return {
        roaster: {
            name: raw.coffee_roasters.name,
            slug: raw.coffee_roasters.slug,
            logo_img_url: primaryRoasterImage?.image_url ?? "",
            alt_text: primaryRoasterImage?.alt_text ?? "",
            logo_layout: primaryRoasterImage?.logo_layout ?? "wide",

        },
        product_name: raw.product_name,
        product_url: raw.product_url ?? "",
        slug: raw.slug,
        flavours: raw.coffee_flavours_identified?.map(
            (f) => f.canonical_flavour ?? ""
        ).filter(Boolean) ?? [],
        roasts,
        grinds: raw.coffee_grinds?.map(
            (g) => g.default_grinds.display_name ?? "")
            .filter(Boolean) ?? [],
        product_variants: raw.product_variants.map((v: ProductVariant) => ({
            weight: v.weight ?? null,
            price_per_kg: v.price_per_kg ?? null,
            price: v.price ?? null,
            currency: v.currency ?? "",
            discount_percent: v.discount_percent ?? null,
            is_instock: raw.is_instock ?? false,
        })),

        images: raw.product_images.map((img: any) => ({
            image_url: img.image_url,
            alt_text: img.alt_text,
        })),

        description: raw.description ?? "",
        insight: raw.insight,
        attribute: attributes,
        sca_cup_score: raw.sca_cup_score,

        provenance,
        meta_title: raw.meta_title ?? "",
        meta_description: raw.meta_description ?? "",
        schema: raw.schema ? JSON.stringify(raw.schema) : "",
        lowest_price_per_kg: raw.lowest_price_per_kg || null,
    };
}

export function transformProductCard(raw: RawProductCard): ProductCard {
    const roaster = raw.coffee_roaster;

    const primaryLogo = roaster.roaster_images?.find(
        (img: RoasterImageForCard) => img.is_primary,
    );

    const attributes: CoffeeAttributes = {
        is_organic: raw.is_organic,
        is_single_origin: raw.is_single_origin,
        is_mycotoxin_free: raw.is_mycotoxin_tested,
    };

    if (raw.is_lowcaf) {
        attributes.is_lowcaf = raw.is_lowcaf ?? false;
    } else {
        attributes.is_decaf = raw.is_decaf ?? false;
    }

    const cardRoasts: RoastLevel[] = (raw.search_roasts ?? [])
        .map(r => r.toLowerCase().trim())
        .filter((r): r is RoastLevel => validRoastLevels.includes(r as RoastLevel));

    return {
        slug: raw.slug,
        product_name: raw.product_name,
        flavours: Array.isArray(raw.search_flavours) ? raw.search_flavours : [],
        images: (raw.product_images || []).map((img: ProductImageForCard) => ({
            image_url: img.image_url,
            alt_text: img.alt_text ?? "Product image",
        })),
        lowest_price_per_kg: raw.lowest_price_per_kg ?? null,
        attributes,
        roasts: cardRoasts,
        sca_cup_score: raw.sca_cup_score,
        roaster: {
            name: roaster.name,
            slug: roaster.slug,
            logo_img_url: primaryLogo?.image_url ?? "",
            alt_text: primaryLogo?.alt_text ?? "Roaster logo",
            logo_layout: primaryLogo?.logo_layout ?? "wide", // or type-safe default
        },
    };
}