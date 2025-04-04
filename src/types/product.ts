import { HtmlContext } from "next/dist/server/route-modules/pages/vendored/contexts/entrypoints";

export interface ProductVariant {
    weight: number;
    price_per_kg: number;
    price: number | null;
    currency: string | null;
    discount_percent: string | null;
    is_soldout: boolean;
}

export type RoastLevel =
  | 'dark'
  | 'medium dark'
  | 'medium'
  | 'medium light'
  | 'light';

export const ROAST_LEVELS: RoastLevel[] = [
  'dark',
  'medium dark',
  'medium',
  'medium light',
  'light'
];


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
    is_organic: boolean | null;
    is_fairtrade: boolean | null;
    is_decaf?: boolean;
    is_lowcaf?: boolean;
    is_mycotoxin_free: boolean | null;
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
    description: string
    insight: string | null;
    attribute: CoffeeAttributes;
    is_single_origin: boolean | null;
    sca_cup_score: number | null; 
    provenance: Provenance;
    brewing_info?: Brewing; // Optional as it is not used in UI yet
    meta_title: string;
    meta_description: string;
    schema: string;
}

