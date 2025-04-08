import type { Product } from '@/types/product'

interface Attributes {
    is_organic: boolean;
    is_fairtrade: boolean;
    is_mycotoxin_free: boolean;
    is_decaf?: boolean;
    is_lowcaf?: boolean;
    is_single_origin?: boolean;
}

export function transformProduct(raw: any): Product {
    const provenance = raw.coffee_provenance?.[0] || {};
    console.log("TRANSFORMING VARIETALS", provenance);

    let attributes: Attributes = {
        is_organic: raw.is_organic,
        is_single_origin: raw.is_single_origin,
        is_fairtrade: raw.is_fairtrade,
        is_mycotoxin_free: raw.is_mycotoxin_tested
    }

    if (raw.is_lowcaf) {
        attributes.is_lowcaf = raw.is_lowcaf
    } else {
        attributes.is_decaf = raw.is_decaf
        
    }

    return {
        roaster: {
            name: raw.coffee_roasters.name,
            slug: raw.coffee_roasters.slug,
            logo_img_url: raw.coffee_roasters.roaster_images.find((img: any) => img.is_primary)?.image_url || '',
            alt_text: raw.coffee_roasters.roaster_images.find((img: any) => img.is_primary)?.alt_text || '',
            logo_layout: raw.coffee_roasters.roaster_images.find((img: any) => img.is_primary)?.logo_layout || "wide"
        },
        product_name: raw.product_name,
        product_url: raw.product_url,
        slug: raw.slug,
        flavours: raw.coffee_flavours_identified.map((f: any) => f.canonical_flavour),
        roasts: raw.coffee_roasts.map((r: any) => r.default_roasts?.display_name ?? ''),
        grinds: raw.coffee_grinds.map((g: any) => g.default_grinds.display_name),
        product_variants: raw.product_variants.map((v: any) => ({
            weight: v.weight,
            price_per_kg: v.price_per_kg,
            price: v.price ?? null,
            currency: v.currency ?? null,
            discount_percent: v.discount_percent || null,
            is_soldout: !raw.is_instock,
        })),

        images: raw.product_images.map((img: any) => ({
            image_url: img.image_url,
            alt_text: img.alt_text,
        })),

        description: raw.description,
        insight: raw.insight,
        attribute: attributes,
        sca_cup_score: raw.sca_cup_score,

        provenance: {
            origin_countries: (provenance.coffee_origin_countries || []).map((c: any) => c.default_origin_countries.display_name),
            origin_regions: (provenance.coffee_origin_regions || []).map((r: any) => r.default_origin_regions.display_name),
            producers: (provenance.coffee_producers || []).map((p: any) => p.default_coffee_producers.display_name),
            altitude: {
                min: provenance.altitude_min ?? null,
                max: provenance.altitude_max ?? null,
            },
            varietals: (provenance.coffee_varietals || []).map((v: any) => v.default_varietals?.display_name ?? ''),
            processes: (provenance.coffee_processes || []).map((p: any) => p.default_coffee_processes.display_name),
        },
        meta_title: raw.meta_title,
        meta_description: raw.meta_description,
        schema: raw.schema,
        lowest_price_per_kg: raw.lowest_price_per_kg
    };
}
