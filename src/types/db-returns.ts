import type {
    Product,
    ProductVariant,
    ProductImage,
    Roaster,
    RoasterImage,
    FlavourMatch,
    CoffeeRoast,
    CoffeeGrind,
    Provenance,
    OriginCountry,
    OriginRegion,
    CoffeeVarietal,
    CoffeeProcess,
    CoffeeProducer,
    DefaultRoast,
    DefaultGrind,
    DefaultProcess,
    DefaultProducer,
    DefaultVarietal,
    DefaultRegion,
    DefaultCountry,
} from './aliases';

export type ProductImageForCard = Pick<
    ProductImage,
    'image_url' | 'alt_text' | 'is_primary'
>;

export type RoasterForCard = Pick<
    Roaster,
    'name' | 'slug'
>;

export type RoasterImageForCard = Pick<
    RoasterImage,
    'image_url' | 'alt_text' | 'is_primary' | 'logo_layout'
>;

export type RawProduct = Product & {
    product_variants: ProductVariant[];
    product_images: ProductImage[];
    coffee_roasters: Roaster & {
        roaster_images: RoasterImage[];
    };
    coffee_flavours_identified: FlavourMatch[];
    coffee_roasts: {
        default_roasts: DefaultRoast;
    }[];
    coffee_grinds: {
        default_grinds: DefaultGrind;
    }[];
    coffee_provenance: (Provenance & {
        coffee_origin_countries: {
            default_origin_countries: DefaultCountry;
        }[];
        coffee_origin_regions: {
            default_origin_regions: DefaultRegion;
        }[];
        coffee_producers: {
            default_coffee_producers: DefaultProducer;
        }[];
        coffee_varietals: {
            default_varietals: DefaultVarietal;
        }[];
        coffee_processes: {
            default_coffee_processes: DefaultProcess;
        }[];
    })[];
};

export type RawProductCard = Pick<
    Product,
    | 'product_name'
    | 'slug'
    | 'lowest_price_per_kg'
    | 'is_organic'
    | 'is_decaf'
    | 'is_lowcaf'
    | 'is_mycotoxin_tested'
    | 'sca_cup_score'
    | 'search_flavours'
> & {
    product_images: ProductImageForCard[];
    coffee_roaster: RoasterForCard & {
        roaster_images: RoasterImageForCard[];
    };
};
