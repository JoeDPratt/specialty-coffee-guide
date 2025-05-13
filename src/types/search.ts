import type { ProductCard } from "@/types/product";
import type { FilterKey } from "@/consts/filterConfig";

export type SearchQueryParams = {
    q?: string;
    sort_by?: "price_low" | "price_high" | "cup_score_high";
    page?: number;
    page_size?: number;
    cup_score_min?: number;
    cup_score_max?: number;
    varietals?: string[];
} & {
        [K in FilterKey]?: boolean;
    };

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

export interface DefaultFilterItem {
    label: string; // display_name
    value: string; // normalized_name
}

export interface DefaultFilterOptions {
    varietals: DefaultFilterItem[];
    processes: DefaultFilterItem[];
    countries: DefaultFilterItem[];
}