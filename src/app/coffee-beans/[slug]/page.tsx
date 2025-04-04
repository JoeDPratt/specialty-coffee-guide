
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ProductPage from '@/components/product/ProductPage'
import { getFullProductBySlug, getProductImages } from '@/lib/queries/products'
import { Product } from '@/types/product';

export const dynamic = 'force-dynamic';
export const dynamicParams = true

// Page component
export default async function Page({ params, }: { params: Promise<{ slug: string }>}) {
    console.log("Product Page Loading...");
    const supabase = await createClient()
    const { slug } = await params
  
    const product = await getFullProductBySlug(slug);
    // const image = await getProductImages();
    
    if (!product) {
        notFound()
    }
    console.log("Product:", product);

    return <ProductPage product={product as Product} />
}
