import type { LogoLayout } from "./product";
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      coffee_brew_methods: {
        Row: {
          brew_method_id: number | null;
          id: number;
          product_id: string | null;
          raw_brew_method: string | null;
        };
        Insert: {
          brew_method_id?: number | null;
          id?: number;
          product_id?: string | null;
          raw_brew_method?: string | null;
        };
        Update: {
          brew_method_id?: number | null;
          id?: number;
          product_id?: string | null;
          raw_brew_method?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "coffee_brew_methods_brew_method_id_fkey";
            columns: ["brew_method_id"];
            isOneToOne: false;
            referencedRelation: "default_brew_methods";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "coffee_brew_methods_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "coffee_products";
            referencedColumns: ["id"];
          },
        ];
      };
      coffee_flavours_identified: {
        Row: {
          canonical_flavour: string | null;
          id: number;
          matched_attribute_id: number | null;
          matched_secondary_id: number | null;
          normalized_flavour: string | null;
          product_id: string | null;
          raw_flavour: string | null;
        };
        Insert: {
          canonical_flavour?: string | null;
          id?: number;
          matched_attribute_id?: number | null;
          matched_secondary_id?: number | null;
          normalized_flavour?: string | null;
          product_id?: string | null;
          raw_flavour?: string | null;
        };
        Update: {
          canonical_flavour?: string | null;
          id?: number;
          matched_attribute_id?: number | null;
          matched_secondary_id?: number | null;
          normalized_flavour?: string | null;
          product_id?: string | null;
          raw_flavour?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "coffee_flavours_identified_matched_attribute_id_fkey";
            columns: ["matched_attribute_id"];
            isOneToOne: false;
            referencedRelation: "default_flavour_attributes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "coffee_flavours_identified_matched_secondary_id_fkey";
            columns: ["matched_secondary_id"];
            isOneToOne: false;
            referencedRelation: "default_secondary_flavours";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "coffee_flavours_identified_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "coffee_products";
            referencedColumns: ["id"];
          },
        ];
      };
      coffee_grinds: {
        Row: {
          grind_id: number | null;
          id: number;
          product_id: string | null;
          raw_grind: string | null;
        };
        Insert: {
          grind_id?: number | null;
          id?: number;
          product_id?: string | null;
          raw_grind?: string | null;
        };
        Update: {
          grind_id?: number | null;
          id?: number;
          product_id?: string | null;
          raw_grind?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "coffee_grinds_grind_id_fkey";
            columns: ["grind_id"];
            isOneToOne: false;
            referencedRelation: "default_grinds";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "coffee_grinds_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "coffee_products";
            referencedColumns: ["id"];
          },
        ];
      };
      coffee_origin_countries: {
        Row: {
          country_id: number | null;
          id: number;
          provenance_id: number | null;
          raw_country: string | null;
        };
        Insert: {
          country_id?: number | null;
          id?: number;
          provenance_id?: number | null;
          raw_country?: string | null;
        };
        Update: {
          country_id?: number | null;
          id?: number;
          provenance_id?: number | null;
          raw_country?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "coffee_origin_countries_country_id_fkey";
            columns: ["country_id"];
            isOneToOne: false;
            referencedRelation: "default_origin_countries";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "coffee_origin_countries_provenance_id_fkey";
            columns: ["provenance_id"];
            isOneToOne: false;
            referencedRelation: "coffee_provenance";
            referencedColumns: ["id"];
          },
        ];
      };
      coffee_origin_regions: {
        Row: {
          id: number;
          provenance_id: number | null;
          raw_origin: string | null;
          region_id: number | null;
        };
        Insert: {
          id?: number;
          provenance_id?: number | null;
          raw_origin?: string | null;
          region_id?: number | null;
        };
        Update: {
          id?: number;
          provenance_id?: number | null;
          raw_origin?: string | null;
          region_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "coffee_origin_regions_provenance_id_fkey";
            columns: ["provenance_id"];
            isOneToOne: false;
            referencedRelation: "coffee_provenance";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "coffee_origin_regions_region_id_fkey";
            columns: ["region_id"];
            isOneToOne: false;
            referencedRelation: "default_origin_regions";
            referencedColumns: ["id"];
          },
        ];
      };
      coffee_processes: {
        Row: {
          id: number;
          process_id: number | null;
          provenance_id: number | null;
          raw_process: string | null;
        };
        Insert: {
          id?: number;
          process_id?: number | null;
          provenance_id?: number | null;
          raw_process?: string | null;
        };
        Update: {
          id?: number;
          process_id?: number | null;
          provenance_id?: number | null;
          raw_process?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "coffee_processes_process_id_fkey";
            columns: ["process_id"];
            isOneToOne: false;
            referencedRelation: "default_coffee_processes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "coffee_processes_provenance_id_fkey";
            columns: ["provenance_id"];
            isOneToOne: false;
            referencedRelation: "coffee_provenance";
            referencedColumns: ["id"];
          },
        ];
      };
      coffee_producers: {
        Row: {
          id: number;
          producer_id: number | null;
          provenance_id: number | null;
          raw_producer: string | null;
        };
        Insert: {
          id?: number;
          producer_id?: number | null;
          provenance_id?: number | null;
          raw_producer?: string | null;
        };
        Update: {
          id?: number;
          producer_id?: number | null;
          provenance_id?: number | null;
          raw_producer?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "coffee_producers_producer_id_fkey";
            columns: ["producer_id"];
            isOneToOne: false;
            referencedRelation: "default_coffee_producers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "coffee_producers_provenance_id_fkey";
            columns: ["provenance_id"];
            isOneToOne: false;
            referencedRelation: "coffee_provenance";
            referencedColumns: ["id"];
          },
        ];
      };
      coffee_products: {
        Row: {
          created_at: string;
          description: string | null;
          dose_grams: number | null;
          extraction_time_seconds: number | null;
          id: string;
          insight: string | null;
          is_decaf: boolean | null;
          is_deleted: boolean;
          is_fairtrade: boolean | null;
          is_instock: boolean;
          is_lowcaf: boolean | null;
          is_mycotoxin_tested: boolean | null;
          is_organic: boolean | null;
          is_published: boolean;
          is_single_origin: boolean | null;
          last_crawled_at: string | null;
          last_instock_at: string | null;
          lowest_price_per_kg: number | null;
          meta_description: string | null;
          meta_title: string | null;
          normalized_name: string | null;
          product_name: string;
          product_url: string | null;
          ratio: number | null;
          roaster_id: string | null;
          roaster_name: string | null;
          sca_cup_score: number | null;
          schema: Json | null;
          search_brew_methods: string | null;
          search_countries: string[] | null;
          search_flavours: string[] | null;
          search_grinds: string[] | null;
          search_processes: string[] | null;
          search_producers: string[] | null;
          search_regions: string[] | null;
          search_roasts: string[] | null;
          search_terms: string[] | null;
          search_varietals: string[] | null;
          slug: string;
          temperature_c: number | null;
          updated_at: string;
          yield_ml: number | null;
        };
        Insert: {
          created_at: string;
          description?: string | null;
          dose_grams?: number | null;
          extraction_time_seconds?: number | null;
          id?: string;
          insight?: string | null;
          is_decaf?: boolean | null;
          is_deleted: boolean;
          is_fairtrade?: boolean | null;
          is_instock: boolean;
          is_lowcaf?: boolean | null;
          is_mycotoxin_tested?: boolean | null;
          is_organic?: boolean | null;
          is_published: boolean;
          is_single_origin?: boolean | null;
          last_crawled_at?: string | null;
          last_instock_at?: string | null;
          lowest_price_per_kg?: number | null;
          meta_description?: string | null;
          meta_title?: string | null;
          normalized_name?: string | null;
          product_name: string;
          product_url?: string | null;
          ratio?: number | null;
          roaster_id?: string | null;
          roaster_name?: string | null;
          sca_cup_score?: number | null;
          schema?: Json | null;
          search_brew_methods?: string | null;
          search_countries?: string[] | null;
          search_flavours?: string[] | null;
          search_grinds?: string[] | null;
          search_processes?: string[] | null;
          search_producers?: string[] | null;
          search_regions?: string[] | null;
          search_roasts?: string[] | null;
          search_terms?: string[] | null;
          search_varietals?: string[] | null;
          slug: string;
          temperature_c?: number | null;
          updated_at: string;
          yield_ml?: number | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          dose_grams?: number | null;
          extraction_time_seconds?: number | null;
          id?: string;
          insight?: string | null;
          is_decaf?: boolean | null;
          is_deleted?: boolean;
          is_fairtrade?: boolean | null;
          is_instock?: boolean;
          is_lowcaf?: boolean | null;
          is_mycotoxin_tested?: boolean | null;
          is_organic?: boolean | null;
          is_published?: boolean;
          is_single_origin?: boolean | null;
          last_crawled_at?: string | null;
          last_instock_at?: string | null;
          lowest_price_per_kg?: number | null;
          meta_description?: string | null;
          meta_title?: string | null;
          normalized_name?: string | null;
          product_name?: string;
          product_url?: string | null;
          ratio?: number | null;
          roaster_id?: string | null;
          roaster_name?: string | null;
          sca_cup_score?: number | null;
          schema?: Json | null;
          search_brew_methods?: string | null;
          search_countries?: string[] | null;
          search_flavours?: string[] | null;
          search_grinds?: string[] | null;
          search_processes?: string[] | null;
          search_producers?: string[] | null;
          search_regions?: string[] | null;
          search_roasts?: string[] | null;
          search_terms?: string[] | null;
          search_varietals?: string[] | null;
          slug?: string;
          temperature_c?: number | null;
          updated_at?: string;
          yield_ml?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "coffee_products_roaster_id_fkey";
            columns: ["roaster_id"];
            isOneToOne: false;
            referencedRelation: "coffee_roasters";
            referencedColumns: ["id"];
          },
        ];
      };
      coffee_provenance: {
        Row: {
          altitude_max: number | null;
          altitude_min: number | null;
          id: number;
          product_id: string | null;
        };
        Insert: {
          altitude_max?: number | null;
          altitude_min?: number | null;
          id?: number;
          product_id?: string | null;
        };
        Update: {
          altitude_max?: number | null;
          altitude_min?: number | null;
          id?: number;
          product_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "coffee_provenance_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "coffee_products";
            referencedColumns: ["id"];
          },
        ];
      };
      coffee_roasters: {
        Row: {
          about_text: string | null;
          address: string | null;
          country: string | null;
          country_code: string | null;
          currency_code: string | null;
          domain: string | null;
          first_order_discount_percentage: number | null;
          first_order_promo_policy_text: string | null;
          free_delivery_policy_text: string | null;
          free_delivery_threshold: number | null;
          has_cafe: boolean | null;
          has_physical_store: boolean | null;
          id: string;
          is_operating: boolean | null;
          is_published: boolean;
          meta_description: string | null;
          meta_title: string | null;
          name: string;
          normalized_name: string | null;
          schema: Json | null;
          slug: string;
          url: string | null;
        };
        Insert: {
          about_text?: string | null;
          address?: string | null;
          country?: string | null;
          country_code?: string | null;
          currency_code?: string | null;
          domain?: string | null;
          first_order_discount_percentage?: number | null;
          first_order_promo_policy_text?: string | null;
          free_delivery_policy_text?: string | null;
          free_delivery_threshold?: number | null;
          has_cafe?: boolean | null;
          has_physical_store?: boolean | null;
          id?: string;
          is_operating?: boolean | null;
          is_published: boolean;
          meta_description?: string | null;
          meta_title?: string | null;
          name: string;
          normalized_name?: string | null;
          schema?: Json | null;
          slug: string;
          url?: string | null;
        };
        Update: {
          about_text?: string | null;
          address?: string | null;
          country?: string | null;
          country_code?: string | null;
          currency_code?: string | null;
          domain?: string | null;
          first_order_discount_percentage?: number | null;
          first_order_promo_policy_text?: string | null;
          free_delivery_policy_text?: string | null;
          free_delivery_threshold?: number | null;
          has_cafe?: boolean | null;
          has_physical_store?: boolean | null;
          id?: string;
          is_operating?: boolean | null;
          is_published?: boolean;
          meta_description?: string | null;
          meta_title?: string | null;
          name?: string;
          normalized_name?: string | null;
          schema?: Json | null;
          slug?: string;
          url?: string | null;
        };
        Relationships: [];
      };
      coffee_roasts: {
        Row: {
          id: number;
          product_id: string | null;
          raw_roasts: string | null;
          roast_id: number | null;
        };
        Insert: {
          id?: number;
          product_id?: string | null;
          raw_roasts?: string | null;
          roast_id?: number | null;
        };
        Update: {
          id?: number;
          product_id?: string | null;
          raw_roasts?: string | null;
          roast_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "coffee_roasts_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "coffee_products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "coffee_roasts_roast_id_fkey";
            columns: ["roast_id"];
            isOneToOne: false;
            referencedRelation: "default_roasts";
            referencedColumns: ["id"];
          },
        ];
      };
      coffee_varietals: {
        Row: {
          id: number;
          provenance_id: number | null;
          raw_varietal: string | null;
          varietal_id: number | null;
        };
        Insert: {
          id?: number;
          provenance_id?: number | null;
          raw_varietal?: string | null;
          varietal_id?: number | null;
        };
        Update: {
          id?: number;
          provenance_id?: number | null;
          raw_varietal?: string | null;
          varietal_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "coffee_varietals_provenance_id_fkey";
            columns: ["provenance_id"];
            isOneToOne: false;
            referencedRelation: "coffee_provenance";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "coffee_varietals_varietal_id_fkey";
            columns: ["varietal_id"];
            isOneToOne: false;
            referencedRelation: "default_varietals";
            referencedColumns: ["id"];
          },
        ];
      };
      default_brew_methods: {
        Row: {
          display_name: string | null;
          id: number;
          normalized_name: string | null;
        };
        Insert: {
          display_name?: string | null;
          id?: number;
          normalized_name?: string | null;
        };
        Update: {
          display_name?: string | null;
          id?: number;
          normalized_name?: string | null;
        };
        Relationships: [];
      };
      default_coffee_processes: {
        Row: {
          display_name: string;
          id: number;
          normalized_name: string;
        };
        Insert: {
          display_name: string;
          id?: number;
          normalized_name: string;
        };
        Update: {
          display_name?: string;
          id?: number;
          normalized_name?: string;
        };
        Relationships: [];
      };
      default_coffee_producers: {
        Row: {
          display_name: string;
          id: number;
          normalized_name: string;
        };
        Insert: {
          display_name: string;
          id?: number;
          normalized_name: string;
        };
        Update: {
          display_name?: string;
          id?: number;
          normalized_name?: string;
        };
        Relationships: [];
      };
      default_flavour_attributes: {
        Row: {
          attribute_name: string;
          color: string | null;
          id: number;
          secondary_id: number | null;
        };
        Insert: {
          attribute_name: string;
          color?: string | null;
          id?: number;
          secondary_id?: number | null;
        };
        Update: {
          attribute_name?: string;
          color?: string | null;
          id?: number;
          secondary_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "default_flavour_attributes_secondary_id_fkey";
            columns: ["secondary_id"];
            isOneToOne: false;
            referencedRelation: "default_secondary_flavours";
            referencedColumns: ["id"];
          },
        ];
      };
      default_grinds: {
        Row: {
          display_name: string;
          id: number;
          normalized_name: string;
        };
        Insert: {
          display_name: string;
          id?: number;
          normalized_name: string;
        };
        Update: {
          display_name?: string;
          id?: number;
          normalized_name?: string;
        };
        Relationships: [];
      };
      default_origin_countries: {
        Row: {
          display_name: string;
          id: number;
          normalized_name: string;
          normalized_name_native: string;
        };
        Insert: {
          display_name: string;
          id?: number;
          normalized_name: string;
          normalized_name_native: string;
        };
        Update: {
          display_name?: string;
          id?: number;
          normalized_name?: string;
          normalized_name_native?: string;
        };
        Relationships: [];
      };
      default_origin_regions: {
        Row: {
          display_name: string;
          id: number;
          normalized_name: string;
        };
        Insert: {
          display_name: string;
          id?: number;
          normalized_name: string;
        };
        Update: {
          display_name?: string;
          id?: number;
          normalized_name?: string;
        };
        Relationships: [];
      };
      default_primary_flavours: {
        Row: {
          color: string | null;
          id: number;
          primary_name: string;
        };
        Insert: {
          color?: string | null;
          id?: number;
          primary_name: string;
        };
        Update: {
          color?: string | null;
          id?: number;
          primary_name?: string;
        };
        Relationships: [];
      };
      default_roasts: {
        Row: {
          display_name: string;
          id: number;
          normalized_name: string;
        };
        Insert: {
          display_name: string;
          id?: number;
          normalized_name: string;
        };
        Update: {
          display_name?: string;
          id?: number;
          normalized_name?: string;
        };
        Relationships: [];
      };
      default_secondary_flavours: {
        Row: {
          color: string | null;
          id: number;
          primary_id: number | null;
          secondary_name: string;
        };
        Insert: {
          color?: string | null;
          id?: number;
          primary_id?: number | null;
          secondary_name: string;
        };
        Update: {
          color?: string | null;
          id?: number;
          primary_id?: number | null;
          secondary_name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "default_secondary_flavours_primary_id_fkey";
            columns: ["primary_id"];
            isOneToOne: false;
            referencedRelation: "default_primary_flavours";
            referencedColumns: ["id"];
          },
        ];
      };
      default_varietals: {
        Row: {
          display_name: string;
          id: number;
          normalized_name: string;
        };
        Insert: {
          display_name: string;
          id?: number;
          normalized_name: string;
        };
        Update: {
          display_name?: string;
          id?: number;
          normalized_name?: string;
        };
        Relationships: [];
      };
      product_images: {
        Row: {
          alt_text: string | null;
          id: string;
          image_url: string;
          is_primary: boolean | null;
          product_id: string | null;
          type: string | null;
          uploaded_at: string | null;
          uploaded_by: string | null;
        };
        Insert: {
          alt_text?: string | null;
          id?: string;
          image_url: string;
          is_primary?: boolean | null;
          product_id?: string | null;
          type?: string | null;
          uploaded_at?: string | null;
          uploaded_by?: string | null;
        };
        Update: {
          alt_text?: string | null;
          id?: string;
          image_url?: string;
          is_primary?: boolean | null;
          product_id?: string | null;
          type?: string | null;
          uploaded_at?: string | null;
          uploaded_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "coffee_products";
            referencedColumns: ["id"];
          },
        ];
      };
      product_variants: {
        Row: {
          currency: string;
          discount_percent: string | null;
          id: number;
          is_instock: boolean | null;
          price: number;
          price_per_kg: number | null;
          product_id: string | null;
          weight: number;
        };
        Insert: {
          currency: string;
          discount_percent?: string | null;
          id?: number;
          is_instock?: boolean | null;
          price: number;
          price_per_kg?: number | null;
          product_id?: string | null;
          weight: number;
        };
        Update: {
          currency?: string;
          discount_percent?: string | null;
          id?: number;
          is_instock?: boolean | null;
          price?: number;
          price_per_kg?: number | null;
          product_id?: string | null;
          weight?: number;
        };
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "coffee_products";
            referencedColumns: ["id"];
          },
        ];
      };
      roaster_addresses: {
        Row: {
          city: string;
          country: string;
          created_at: string | null;
          id: string;
          latitude: number | null;
          line1: string;
          line2: string | null;
          longitude: number | null;
          postal_code: string;
          roaster_id: string;
          state_or_province: string | null;
          type: Database["public"]["Enums"]["address_type"];
          updated_at: string | null;
        };
        Insert: {
          city: string;
          country: string;
          created_at?: string | null;
          id?: string;
          latitude?: number | null;
          line1: string;
          line2?: string | null;
          longitude?: number | null;
          postal_code: string;
          roaster_id: string;
          state_or_province?: string | null;
          type: Database["public"]["Enums"]["address_type"];
          updated_at?: string | null;
        };
        Update: {
          city?: string;
          country?: string;
          created_at?: string | null;
          id?: string;
          latitude?: number | null;
          line1?: string;
          line2?: string | null;
          longitude?: number | null;
          postal_code?: string;
          roaster_id?: string;
          state_or_province?: string | null;
          type?: Database["public"]["Enums"]["address_type"];
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "roaster_addresses_roaster_id_fkey";
            columns: ["roaster_id"];
            isOneToOne: false;
            referencedRelation: "coffee_roasters";
            referencedColumns: ["id"];
          },
        ];
      };
      roaster_images: {
        Row: {
          alt_text: string | null;
          id: string;
          image_url: string;
          is_primary: boolean | null;
          roaster_id: string | null;
          type: string | null;
          logo_layout: LogoLayout;
          uploaded_at: string | null;
          uploaded_by: string | null;
        };
        Insert: {
          alt_text?: string | null;
          id?: string;
          image_url: string;
          is_primary?: boolean | null;
          roaster_id?: string | null;
          type?: string | null;
          uploaded_at?: string | null;
          uploaded_by?: string | null;
        };
        Update: {
          alt_text?: string | null;
          id?: string;
          image_url?: string;
          is_primary?: boolean | null;
          roaster_id?: string | null;
          type?: string | null;
          uploaded_at?: string | null;
          uploaded_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "roaster_images_roaster_id_fkey";
            columns: ["roaster_id"];
            isOneToOne: false;
            referencedRelation: "coffee_roasters";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      unaccent: {
        Args: {
          "": string;
        };
        Returns: string;
      };
      unaccent_init: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
    };
    Enums: {
      address_type: "cafe" | "physical_store" | "headquarters" | "warehouse";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
