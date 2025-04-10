import { LogoLayout } from "./product";
import type { Tables } from "@/types/supabase";

export interface RawImage {
    image_url: string;
    alt_text: string | null;
    is_primary?: boolean | null;
    logo_layout?: LogoLayout;
    id?: string;
    product_id?: string | null;
    type?: string | null;
    uploaded_at?: string | null;
    uploaded_by?: string | null;
}

export interface RawProvenance {
    coffee_origin_countries?: { default_origin_countries: { display_name: string } }[];
    coffee_origin_regions?: { default_origin_regions: { display_name: string } }[];
    coffee_producers?: { default_coffee_producers: { display_name: string } }[];
    coffee_varietals?: { default_varietals: { display_name: string } }[];
    coffee_processes?: { default_coffee_processes: { display_name: string } }[];
    altitude_min?: number | null;
    altitude_max?: number | null;
}

export interface RawRoaster {
    name: string;
    slug: string;
    roaster_images: RawImage[];
}

export interface RawProductVariant {
    weight: number;
    price_per_kg: number | null;
    price: number;
    currency: string;
    discount_percent: string | null;
    is_instock?: boolean | null;
    id?: number;
    product_id?: string | null;
}

export interface RawProduct {
    slug: string;
    product_name: string;
    product_url: string | null;
    description?: string | null;
    insight?: string | null;
    meta_title?: string | null;
    meta_description?: string | null;
    schema?: any | null;
    lowest_price_per_kg?: number | null;
    is_organic: boolean | null;
    is_single_origin?: boolean | null;
    is_fairtrade: boolean | null;
    is_mycotoxin_tested: boolean | null;
    is_lowcaf?: boolean | null;
    is_decaf?: boolean | null;
    is_instock: boolean;
    sca_cup_score?: number | null;
    coffee_roasters: RawRoaster;
    coffee_flavours_identified: { canonical_flavour: string | null }[];
    coffee_roasts: { default_roasts?: { display_name: string } }[];
    coffee_grinds: { default_grinds: { display_name: string } }[];
    product_variants: RawProductVariant[];
    product_images: RawImage[];
    coffee_provenance?: RawProvenance[];
}


export interface RawCardProduct {
    slug: string;
    product_name: string;
    search_flavours?: string[];
    lowest_price_per_kg?: number;
    product_images?: RawImage[];
    coffee_roasters: RawRoaster;
}

export type SupabaseRawProduct = {
    product_name: string;
    product_url: string | null;
    description: string | null;
    meta_title: string | null;
    meta_description: string | null;
    schema: any;
    slug: string;
    sca_cup_score: number | null;
    is_decaf: boolean | null;
    is_lowcaf: boolean | null;
    is_fairtrade: boolean | null;
    is_instock: boolean;
    is_mycotoxin_tested: boolean | null;
    is_organic: boolean | null;
    is_single_origin: boolean | null;
    insight: string | null;
    lowest_price_per_kg: number | null;

    product_variants: {
        price: number;
        weight: number;
        price_per_kg: number | null;
        currency: string;
        discount_percent: string | null;
    }[];

    product_images: {
        image_url: string;
        alt_text: string | null;
        is_primary: boolean | null;
    }[];

    coffee_roasters: {
        name: string;
        slug: string;
        roaster_images: {
            image_url: string;
            alt_text: string;
            is_primary: boolean;
            logo_layout: "wide" | "square" | "tall";
        }[];
    }[];

    coffee_flavours_identified: {
        canonical_flavour: string | null;
    }[];

    coffee_roasts: {
        default_roasts: {
            display_name: string;
        };
    }[];

    coffee_grinds: {
        default_grinds: {
            display_name: string;
        };
    }[];

    coffee_provenance: {
        altitude_min: number | null;
        altitude_max: number | null;
        coffee_origin_countries: {
            default_origin_countries: {
                display_name: string;
            };
        }[];
        coffee_origin_regions: {
            default_origin_regions: {
                display_name: string;
            };
        }[];
        coffee_processes: {
            default_coffee_processes: {
                display_name: string;
            };
        }[];
        coffee_producers: {
            default_coffee_producers: {
                display_name: string;
            };
        }[];
        coffee_varietals: {
            default_varietals: {
                display_name: string;
            };
        }[];
    }[];
};
