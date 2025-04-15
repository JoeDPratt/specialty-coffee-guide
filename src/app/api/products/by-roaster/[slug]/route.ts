import { NextResponse } from "next/server";
import { getProductsByRoasterSlug } from "@/lib/queries/products/getProductsByRoasterSlug";

export async function GET(
    request: Request,
    context: { params: Promise<{ slug: string }> },
) {
    const { slug } = await context.params;

    if (!slug) {
        return NextResponse.json({ message: "Slug is required" }, { status: 400 });
    }

    try {
        const products = await getProductsByRoasterSlug(slug);
        if (!products) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 },
            );
        }
        // Return the product data
        return NextResponse.json(products);
    } catch (error) {
        console.error(`Error fetching products for roaster ${slug}:`, error);
        // Avoid leaking internal error details to the client if possible
        return NextResponse.json(
            { message: "Failed to fetch product data" },
            { status: 500 },
        );
    }
}
