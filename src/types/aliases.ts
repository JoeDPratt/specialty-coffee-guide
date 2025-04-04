import { Enums, Database } from './supabase'
// ─────────────────────────────────────────
// Core Coffee Data
// ─────────────────────────────────────────
export type Product = Database['public']['Tables']['coffee_products']['Row']
export type ProductVariant = Database['public']['Tables']['product_variants']['Row']
export type ProductImage = Database['public']['Tables']['product_images']['Row']

// ─────────────────────────────────────────
// Roaster Info
// ─────────────────────────────────────────
export type Roaster = Database['public']['Tables']['coffee_roasters']['Row']
export type RoasterAddress = Database['public']['Tables']['roaster_addresses']['Row']
export type RoasterImage = Database['public']['Tables']['roaster_images']['Row']

// ─────────────────────────────────────────
// Provenance and Origins
// ─────────────────────────────────────────
export type Provenance = Database['public']['Tables']['coffee_provenance']['Row']
export type OriginCountry = Database['public']['Tables']['coffee_origin_countries']['Row']
export type OriginRegion = Database['public']['Tables']['coffee_origin_regions']['Row']
export type CoffeeVarietal = Database['public']['Tables']['coffee_varietals']['Row']
export type CoffeeProcess = Database['public']['Tables']['coffee_processes']['Row']
export type CoffeeProducer = Database['public']['Tables']['coffee_producers']['Row']
export type CoffeeRoast = Database['public']['Tables']['coffee_roasts']['Row']
export type CoffeeGrind = Database['public']['Tables']['coffee_grinds']['Row']

// ─────────────────────────────────────────
// Flavour Mapping
// ─────────────────────────────────────────
export type FlavourMatch = Database['public']['Tables']['coffee_flavours_identified']['Row']
export type DefaultFlavourAttribute = Database['public']['Tables']['default_flavour_attributes']['Row']
export type DefaultPrimaryFlavour = Database['public']['Tables']['default_primary_flavours']['Row']
export type DefaultSecondaryFlavour = Database['public']['Tables']['default_secondary_flavours']['Row']

// ─────────────────────────────────────────
// Static Reference Tables
// ─────────────────────────────────────────
export type DefaultRoast = Database['public']['Tables']['default_roasts']['Row']
export type DefaultGrind = Database['public']['Tables']['default_grinds']['Row']
export type DefaultProcess = Database['public']['Tables']['default_coffee_processes']['Row']
export type DefaultProducer = Database['public']['Tables']['default_coffee_producers']['Row']
export type DefaultVarietal = Database['public']['Tables']['default_varietals']['Row']
export type DefaultRegion = Database['public']['Tables']['default_origin_regions']['Row']
export type DefaultCountry = Database['public']['Tables']['default_origin_countries']['Row']

// ─────────────────────────────────────────
// Enums
// ─────────────────────────────────────────
export type AddressType = Enums<'address_type'>
