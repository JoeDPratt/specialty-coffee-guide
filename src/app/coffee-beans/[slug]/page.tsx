
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation'
import ProductPage from '@/components/product/ProductPage'
import { getFullProductBySlug } from '@/lib/queries/products'
import { Product } from '@/types/product';

export const dynamic = 'force-dynamic';
export const dynamicParams = true

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const product = await getFullProductBySlug(slug);
    return {
        title: product?.meta_title || 'Product',
        description: product?.meta_description || '',
    };
}

// Page component
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    console.log("Product Page Loading...");

    const { slug } = await params
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['product', slug],
        queryFn: () => getFullProductBySlug(slug),
    });


    // const product = await getFullProductBySlug(slug);
    // const image = await getProductImages();

    // if (!product) {
    //     notFound()
    // }
    // console.log("Product:", product);

    //return <ProductPage product={product as Product} />
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProductPage slug={slug} />
        </HydrationBoundary>
      );
}
