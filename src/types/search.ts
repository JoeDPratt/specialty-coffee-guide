import type { ProductCard } from "@/types/product";

export interface SearchQueryParams {
    q?: string;
    is_organic?: boolean;
    is_decaf?: boolean;
    is_mycotoxin_free?: boolean;
    is_single_origin?: boolean;
    sort_by?: "price_low" | "price_high" | "cup_score_high";
    page?: number;
    page_size?: number;
}

export type RawQueryParams = {
    q?: string | string[];
    is_organic?: string;
    is_decaf?: string;
    is_mycotoxin_free?: string;
    is_single_origin?: string;
};

export interface SearchResultsResponse {
    results: ProductCard[];
    totalCount?: number;
    totalPages?: number;
    nextPage?: number;
    previousPage?: number;
}