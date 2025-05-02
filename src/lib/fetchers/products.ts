// lib/fetchers/products.ts
import type { Product, ProductCard } from "@/types/product";
import type { SearchQueryParams } from "@/types/search";

// Gets products by roaster slug
export const fetchProductsByRoaster = async (slug: string): Promise<ProductCard[]> => {
    const res = await fetch(`/api/products/by-roaster/${slug}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.statusText}`);
    }
    return await res.json();
};

// Gets full product data by product slug
export const fetchProductBySlug = async (slug: string): Promise<Product> => {
    const response = await fetch(`/api/products/${slug}`);
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    return data as Product; // Assume the API returns data matching the Product type
};


export async function fetchSearchResults(
    params: SearchQueryParams
): Promise<{ results: any[]; nextPage?: number; previousPage?: number }> {

    const qs = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
        if (val != null) qs.set(key, String(val));
    });

    const res = await fetch(`/api/search?${qs.toString()}`);
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
}
