import type { Product, ProductCard } from "@/types/product";

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
