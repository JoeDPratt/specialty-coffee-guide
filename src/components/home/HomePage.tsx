'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchProductsByRoaster } from '@/lib/fetchers/products';
import { JSX } from 'react';
import ProductCard from '@/components/shared/product/ProductCard';

export default function HomePage({ roasterSlug }: { roasterSlug: string }): JSX.Element {
    const { data: products, isLoading } = useQuery({
        queryKey: ['by-roaster', roasterSlug],
        queryFn: () => fetchProductsByRoaster(roasterSlug),
    });

    if (isLoading) return <p>Loading...</p>;

    console.log('Products:', products);
    products?.forEach((p) => {
        if (!p.roaster || !p.roaster.alt_text) {
            console.warn('Missing roaster or alt_text in product:', p.slug, p.roaster);
        }
    });

    const roasterName = products?.[0]?.roaster?.name ?? "Featured Roaster";

    return (
        <main className="layout-container mt-20">

            <h2>Specialty Coffee by {roasterName}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {products?.map((product) => (
                    <ProductCard
                        product={product}
                        key={product.slug} />
                ))}
            </div>
        </main>
    );
}
