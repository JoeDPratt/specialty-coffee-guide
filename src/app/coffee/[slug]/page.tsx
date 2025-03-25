import { getCachedProductBySlug } from '@/lib/product-cache'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ProductPage from '@/components/product/ProductPage'

export const dynamic = 'force-dynamic';
export const dynamicParams = true

// Dynamic metadata
export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await props.params;
    const product = await getCachedProductBySlug(slug);
  if (!product) return {}

  const title = `${product.product_name} | Buy Specialty Coffee from ${product.brand}`
  const description = product.description || `Shop ${product.product_name}, a specialty coffee with ${product.flavours.join(', ')} from ${product.brand}.`
  const image = product.images?.[0]?.image_url || ''

  return {
    title,
    description,
    keywords: [
      'buy specialty coffee',
      'single origin coffee',
      'organic coffee',
      'fairtrade coffee',
      'light roast coffee',
      ...product.flavours,
      product.brand,
    ],
    openGraph: {
      title,
      description,
      images: [{ url: image }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    }
  }
}

// Page component
export default async function Page(props: { params: Promise<{ slug: string }> }) {
    const { slug } = await props.params;
    const product = await getCachedProductBySlug(slug);

  if (!product) {
    notFound()
  }

  return <ProductPage product={product} />
}
