// File: src/app/api/products/[slug]/route.ts

import { NextResponse } from 'next/server';
import { getFullProductBySlug } from '@/lib/queries/products'; // Your existing server-side fetcher

export async function GET(
    request: Request,
    context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

    if (!slug) {
        return NextResponse.json({ message: 'Slug is required' }, { status: 400 });
    }

    try {
        const product = await getFullProductBySlug(slug);
        if (!product) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }
        // Return the product data
        return NextResponse.json(product);

    } catch (error) {
        console.error(`Error fetching product for slug ${slug}:`, error);
        // Avoid leaking internal error details to the client if possible
        return NextResponse.json({ message: 'Failed to fetch product data' }, { status: 500 });
    }
}