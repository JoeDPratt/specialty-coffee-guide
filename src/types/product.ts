

export interface ProductVariant {
    weight: number | null;
    price_per_kg: number | null;
    price: number | null;
    currency: string;
    discount_percent?: number | null;
    is_instock?: boolean;
}

export type RoastLevel =
    | "dark"
    | "medium dark"
    | "medium"
    | "medium light"
    | "light";

export const ROAST_LEVELS: RoastLevel[] = [
    "dark",
    "medium dark",
    "medium",
    "medium light",
    "light",
];

export type LogoLayout = "wide" | "square" | "tall";

export interface ProductImages {
    image_url: string;
    alt_text?: string;
}

export interface Brewing {
    suggested_brewing_method: string | null;
    dose: string | null;
    yield: string | null;
    extraction_time: string | null;
    ratio: string | null;
    temperature: string | null;
}

export interface CoffeeAttributes {
    is_organic?: boolean | null;
    is_fairtrade?: boolean | null;
    is_decaf?: boolean;
    is_lowcaf?: boolean;
    is_mycotoxin_free?: boolean | null;
    is_single_origin?: boolean | null;
}

export interface Altitude {
    min: number | null;
    max: number | null;
}

export interface Provenance {
    origin_countries: string[];
    origin_regions: string[];
    producers: string[];
    altitude: Altitude;
    varietals: string[];
    processes: string[];
}

export interface ProductRoaster {
    name: string;
    slug: string;
    logo_img_url: string;
    alt_text: string;
    logo_layout: LogoLayout;
}

export interface Product {
    roaster: ProductRoaster;
    product_name: string;
    product_url: string;
    slug: string;
    flavours: string[];
    roasts: RoastLevel[];
    grinds: string[];
    product_variants: ProductVariant[];
    images: ProductImages[];
    description: string;
    insight: string | null;
    attribute: CoffeeAttributes;
    sca_cup_score: number | null;
    provenance: Provenance;
    brewing_info?: Brewing; // Optional as it is not used in UI yet
    meta_title: string;
    meta_description: string;
    schema: string;
    lowest_price_per_kg: number | null;
}

export interface ProductCard {
    slug: string;
    product_name: string;
    flavours: string[];
    images: {
        image_url: string;
        alt_text: string;
    }[];
    lowest_price_per_kg: number | null;
    attributes: CoffeeAttributes;
    roasts: RoastLevel[];
    sca_cup_score: number | null;
    roaster: {
        name: string;
        slug: string;
        logo_img_url: string;
        alt_text: string;
        logo_layout: LogoLayout;
    };
    product_variants?: ProductVariant[];
    likes_count?: number | null;
}
