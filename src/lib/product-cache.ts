// lib/product-cache.ts
import { Product } from '@/types/product'
import { getProductBySlug } from '@/lib/product'

// Simple in-memory cache scoped to a single request
const productCache = new Map<string, Product | null>()

export async function getCachedProductBySlug(slug: string): Promise<Product | null> {
    if (productCache.has(slug)) {
        return productCache.get(slug)!
    }

    const product = await getProductBySlug(slug)
    productCache.set(slug, product)
    return product
}