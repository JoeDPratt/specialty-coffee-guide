import { HtmlContext } from "next/dist/server/route-modules/pages/vendored/contexts/entrypoints";

export interface ProductVariant {
    weight: number;
    weight_unit: string;
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


export interface CompleteProductOptions {
    product_variants: ProductVariant[];
    roasts: string[];
    grind_type: string[];
}

export interface DeliveryOption {
    lower_order_weight_threshold: number,
    upper_order_weight_threshold: number;
    price: number;
    currency: string;
}

export interface DeliveryInfo {
    delivery_options: DeliveryOption[];
    free_delivery_currency: string;
    free_delivery_threshold: number;
    free_delivery_policy_text: string;
}

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
    is_decaf: boolean;
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

export interface Product {
    brand: string;
    product_name: string;
    product_url: string;
    slug: string;
    flavours: string[];
    roasts: RoastLevel[];
    grinds: string[];
    product_variants: ProductVariant[];
    images: ProductImages[];
    description: string
    insight: string;
    attribute: CoffeeAttributes;
    is_single_origin: boolean | null;
    sca_cup_score: number;
    provenance: Provenance;
    brewing_info: Brewing;
    delivery_info?: DeliveryInfo;
}

